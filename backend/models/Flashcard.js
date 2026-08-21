const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        pdf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PDF",
            required: true
        },

        question: {
            type: String,
            required: true
        },

        answer: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Flashcard", flashcardSchema);