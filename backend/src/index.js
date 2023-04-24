"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_js_1 = require("./routes/index.js");
var listEndpoints = require("express-list-endpoints");
var app = express();
app.use(express.json());
app.use(function (req, res, next) { console.log("[".concat(new Date().toISOString(), "] ").concat(req.method, " ").concat(req.originalUrl)); next(); });
app.use("/api/v1", index_js_1.router);
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server started on port ".concat(port));
    console.log(listEndpoints(app));
});
