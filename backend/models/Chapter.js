const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
    {
        pdf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PDF",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        order: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Chapter", chapterSchema);