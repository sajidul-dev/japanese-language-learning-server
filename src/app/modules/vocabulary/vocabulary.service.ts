import { IVocabulary } from "./vocabulary.interface";
import { Vocabulary } from "./vocabulary.model";

const createVocabulary = async (
  vocabulary: IVocabulary,
): Promise<IVocabulary | null> => {
  const newVocabulary = (
    await (await Vocabulary.create(vocabulary)).populate("lesson_id")
  ).populate("admin_id");
  return newVocabulary;
};

const getAllVocabulary = async (): Promise<IVocabulary[] | null> => {
  const allVocabulary = await Vocabulary.find({})
    .sort({ createdAt: -1 })
    .populate("lesson_id")
    .populate("admin_id");
  return allVocabulary;
};

const getSingleVocabulary = async (id: string): Promise<IVocabulary | null> => {
  const singleVocabulary = await Vocabulary.findById(id)
    .populate("lesson_id")
    .populate("admin_id");
  return singleVocabulary;
};

const updateVocabulary = async (
  id: string,
  payload: Partial<IVocabulary>,
): Promise<IVocabulary | null> => {
  const result = await Vocabulary.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
    .populate("lesson_id")
    .populate("admin_id");
  return result;
};

const deleteVocabulary = async (id: string): Promise<IVocabulary | null> => {
  const result = await Vocabulary.findByIdAndDelete(id);
  return result;
};

export const VocabularyServices = {
  createVocabulary,
  getAllVocabulary,
  getSingleVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
