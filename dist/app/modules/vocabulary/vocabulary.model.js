"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vocabulary = void 0;
const mongoose_1 = require("mongoose");
const VocabularySchema = new mongoose_1.Schema({
    word: { type: String, required: true, unique: true },
    english_word: { type: String, required: true },
    pronunciation: { type: String, required: true },
    use: { type: String, required: true },
    lesson_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
    },
    admin_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Vocabulary = (0, mongoose_1.model)("Vocabulary", VocabularySchema);
