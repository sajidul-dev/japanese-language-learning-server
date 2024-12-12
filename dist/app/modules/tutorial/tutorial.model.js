"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutorial = void 0;
const mongoose_1 = require("mongoose");
const TutorialSchema = new mongoose_1.Schema({
    tutorial_link: { type: String, required: true, unique: true },
    lesson_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Lesson", required: true },
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
exports.Tutorial = (0, mongoose_1.model)("Tutorial", TutorialSchema);
