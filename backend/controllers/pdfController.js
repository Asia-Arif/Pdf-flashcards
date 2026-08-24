const Chapter = require("../models/Chapter");
const PDF = require("../models/PDF");
const Flashcard = require("../models/Flashcard");

const {
    generateFlashcardsFromPdf
} = require("../services/geminiService");

const cloudinary = require("../config/cloudinary");


// Upload PDF to Cloudinary
const uploadToCloudinary = (buffer, originalName) => {

    return new Promise((resolve, reject) => {

        const safeName = originalName
            .replace(/\.[^/.]+$/, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-");

        const publicId = `${Date.now()}-${safeName}`;


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



// Upload PDF + Gemini processing
const uploadPdf = async (req, res) => {

    try {

        // Check PDF
        if (!req.file) {

            return res.status(400).json({
                message: "Please upload a PDF file"
            });

        }


        const buffer = req.file.buffer;
        const originalName = req.file.originalname;


        // ------------------------------------------------
        // 1. Upload ORIGINAL PDF to Cloudinary
        // ------------------------------------------------

        const cloudinaryResult =
            await uploadToCloudinary(
                buffer,
                originalName
            );


        // ------------------------------------------------
        // 2. Save PDF information in MongoDB
        // ------------------------------------------------

        const pdf = await PDF.create({
            user: req.user.userId,
            filename: originalName,
            originalName: originalName,
            url: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id,
            size: req.file.size
        });


        // ------------------------------------------------
        // 3. Send ORIGINAL PDF directly to Gemini
        // ------------------------------------------------

        const aiResult =
            await generateFlashcardsFromPdf(
                buffer,
                "application/pdf"
            );


        // ------------------------------------------------
        // 4. Save Gemini generated chapters + flashcards
        // ------------------------------------------------

        const savedChapters = [];
        const savedFlashcards = [];


        for (const chapterData of aiResult.chapters) {

            // Create Chapter
            const chapter = await Chapter.create({

                pdf: pdf._id,

                title: chapterData.title,

                order: chapterData.order

            });


            savedChapters.push(chapter);


            // Create Flashcards for this chapter
            for (
                const cardData
                of chapterData.flashcards
            ) {

                const flashcard =
                    await Flashcard.create({

                        pdf: pdf._id,

                        chapter: chapter._id,

                        question: cardData.question,

                        answer: cardData.answer

                    });


                savedFlashcards.push(
                    flashcard
                );
            }
        }


        // ------------------------------------------------
        // 5. Send everything to frontend
        // ------------------------------------------------

        return res.status(200).json({

            message:
                "PDF processed and flashcards generated successfully",

            file: {

                id: pdf._id,

                filename: pdf.filename,

                originalName: pdf.originalName,

                url: pdf.url,

                size: pdf.size

            },

            chapters: savedChapters,

            flashcards: savedFlashcards

        });


    } catch (error) {

        console.error(
            "PDF processing error:",
            error
        );


        return res.status(500).json({

            message:
                error.message ||
                "Error processing PDF"

        });
    }
};



// Get all PDFs + their chapters
const getPdfs = async (req, res) => {

    try {

        const pdfs = await PDF.find({
            user: req.user.userId
        })
            .sort({ createdAt: -1 })
            .lean();


        const pdfsWithChapters =
            await Promise.all(

                pdfs.map(async (pdf) => {

                    const chapters =
                        await Chapter.find({
                            pdf: pdf._id
                        })
                            .sort({ order: 1 })
                            .lean();


                    return {
                        ...pdf,
                        chapters
                    };

                })
            );


        return res.status(200).json({

            pdfs: pdfsWithChapters

        });


    } catch (error) {

        console.error(
            "Get PDFs error:",
            error
        );


        return res.status(500).json({

            message:
                error.message ||
                "Failed to fetch PDFs"

        });
    }
};



// Get flashcards of ONE specific chapter
const getChapterFlashcards = async (req, res) => {

    try {

        const { chapterId } = req.params;


        // Find chapter
        const chapter =
            await Chapter.findById(
                chapterId
            );


        if (!chapter) {

            return res.status(404).json({

                message: "Chapter not found"

            });
        }


        // Find ONLY flashcards belonging to this chapter
        const flashcards =
            await Flashcard.find({

                chapter: chapterId

            })
                .sort({ createdAt: 1 })
                .lean();


        return res.status(200).json({

            chapter: {

                id: chapter._id,

                title: chapter.title,

                order: chapter.order,

                pdf: chapter.pdf

            },

            flashcards

        });


    } catch (error) {

        console.error(
            "Get chapter flashcards error:",
            error
        );


        return res.status(500).json({

            message:
                error.message ||
                "Failed to fetch chapter flashcards"

        });
    }
};



module.exports = {

    uploadPdf,

    getPdfs,

    getChapterFlashcards

};