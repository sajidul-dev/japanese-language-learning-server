"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyRoutes = void 0;
const user_1 = require("./../../../enum/user");
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const vocabulary_validation_1 = require("./vocabulary.validation");
const vocabulary_controller_1 = require("./vocabulary.controller");
const router = express_1.default.Router();
router.patch("/:id", (0, validateRequest_1.default)(vocabulary_validation_1.VocabularyValidation.updateVocabularyZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), vocabulary_controller_1.VocabularyController.updateVocabulary);
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), vocabulary_controller_1.VocabularyController.getSingleVocabulary);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), vocabulary_controller_1.VocabularyController.deleteVocabulary);
router.post("/create-vocabulary", (0, validateRequest_1.default)(vocabulary_validation_1.VocabularyValidation.createVocabularyZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), vocabulary_controller_1.VocabularyController.createVocabulary);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), vocabulary_controller_1.VocabularyController.getAllVocabulary);
exports.VocabularyRoutes = router;
