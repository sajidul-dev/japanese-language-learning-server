"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialService = void 0;
const tutorial_model_1 = require("./tutorial.model");
const createTutorial = async (tutorial) => {
    const newTutorial = await tutorial_model_1.Tutorial.create(tutorial);
    return newTutorial;
};
const getTutorials = async () => {
    const tutorials = await tutorial_model_1.Tutorial.find().sort({ createdAt: -1 });
    return tutorials;
};
const getSingleTutorial = async (id) => {
    const tutorial = await tutorial_model_1.Tutorial.findById(id);
    return tutorial;
};
const deleteTutorial = async (id) => {
    const tutorial = await tutorial_model_1.Tutorial.findByIdAndDelete(id);
    return tutorial;
};
exports.TutorialService = {
    createTutorial,
    getTutorials,
    getSingleTutorial,
    deleteTutorial,
};
