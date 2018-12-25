"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regulus_1 = require("regulus");
var index_1 = require("./index");
var App = new regulus_1.default({
    port: parseInt(process.env.PORT),
    use: [],
    router: [],
    errorHandler: []
});
App.start(function () {
    index_1.default(App.server).forEach(function (r) { return console.log(r.methods + " " + r.path); });
    console.log("Bahasa.ai Core Logic start at " + process.env.PORT);
});
//# sourceMappingURL=example.js.map