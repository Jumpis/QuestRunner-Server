"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const bluebird_1 = tslib_1.__importDefault(require("bluebird"));
const express_1 = tslib_1.__importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
require("express-async-errors");
const routes_1 = tslib_1.__importDefault(require("./routes"));
const Logger_1 = tslib_1.__importDefault(require("@shared/Logger"));
require("dotenv").config();
const app = express_1.default();
const mongoose = require("mongoose");
mongoose.Promise = bluebird_1.default;
mongoose
    .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.log(err);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
if (process.env.NODE_ENV === "development") {
    app.use(morgan_1.default("dev"));
}
if (process.env.NODE_ENV === "production") {
    app.use(helmet_1.default());
}
app.use("/", routes_1.default);
app.use((err, req, res, next) => {
    Logger_1.default.error(err.message, err);
    return res.status(http_status_codes_1.BAD_REQUEST).json({
        error: err.message,
    });
});
exports.default = app;
