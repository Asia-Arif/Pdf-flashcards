const PDF = require("../models/PDF");
const cloudinary = require("../config/cloudinary");
const { extractPdfText } = require("../services/pdfService");

const uploadToCloudinary = (buffer, originalName) => {
    return new Promise((resolve, reject) => {
        const publicId = `${Date.now()}-${originalName.replace(/\.[^/.]+$/, "")}`;

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "raw",
                folder: "pdf-flashcards",
                public_id: publicId
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        stream.end(buffer);
    });
};

const uploadPdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF file"
            });
        }

        const buffer = req.file.buffer;
        const originalName = req.file.originalname;

        const [text, cloudinaryResult] = await Promise.all([
            extractPdfText(buffer),
            uploadToCloudinary(buffer, originalName)
        ]);

        const pdf = await PDF.create({
            filename: originalName,
            originalName,
            url: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id,
            size: req.file.size,
            extractedText: text
        });

        res.status(200).json({
            message: "PDF uploaded and text extracted successfully",
            file: {
                id: pdf._id,
                filename: pdf.filename,
                originalName: pdf.originalName,
                url: pdf.url,
                size: pdf.size
            },
            text
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message || "Error processing PDF"
        });
    }
};

module.exports = {
    uploadPdf
};
