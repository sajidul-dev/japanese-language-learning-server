import { ITutorial } from "./tutorial.interface";
import { Tutorial } from "./tutorial.model";

const createTutorial = async (
  tutorial: ITutorial,
): Promise<ITutorial | null> => {
  const newTutorial = await Tutorial.create(tutorial);
  return newTutorial;
};

const getTutorials = async (): Promise<ITutorial[] | null> => {
  const tutorials = await Tutorial.find().sort({ createdAt: -1 });
  return tutorials;
};

const getSingleTutorial = async (id: string): Promise<ITutorial | null> => {
  const tutorial = await Tutorial.findById(id);
  return tutorial;
};

const deleteTutorial = async (id: string): Promise<ITutorial | null> => {
  const tutorial = await Tutorial.findByIdAndDelete(id);
  return tutorial;
};

export const TutorialService = {
  createTutorial,
  getTutorials,
  getSingleTutorial,
  deleteTutorial,
};
