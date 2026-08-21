const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        filename: {
            type: String,
            required: true
        },

        originalName: {
            type: String,
            required: true
        },

        url: {
            type: String,
            required: true
        },

        publicId: {
            type: String
        },

        size: {
            type: Number
        },

        extractedText: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("PDF", pdfSchema);
