"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
app.use("/api/v1", api_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Armadillo Slay!",
        environment: process.env.NODE_ENV || "development",
        version: process.env.npm_package_version
            ? `v${process.env.npm_package_version}`
            : "unknown",
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
