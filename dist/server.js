"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
async function main() {
    try {
        console.log("Connecting....");
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log("Connected to MongoDB");
        app_1.default.listen(config_1.default.port, () => {
            console.log(`App is listening to port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
main();
