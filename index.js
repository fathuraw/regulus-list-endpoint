"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regexpExpressRegexp = /^\/\^\\\/(?:(:?[\w\\.-]*(?:\\\/:?[\w\\.-]*)*)|(\(\?:\(\[\^\\\/]\+\?\)\)))\\\/.*/;
var regexpExpressParam = /\(\?:\(\[\^\\\/]\+\?\)\)/g;
var getRouteMethods = function (route) {
    var methods = [];
    for (var method in route.methods) {
        if (method === '_all')
            continue;
        methods.push(method.toUpperCase());
    }
    return methods;
};
var hasParams = function (pathRegexp) {
    return regexpExpressParam.test(pathRegexp);
};
var parseExpressRoute = function (route, basePath) {
    return {
        path: basePath + (basePath && route.path === '/' ? '' : route.path),
        methods: getRouteMethods(route)
    };
};
var parseExpressPath = function (expressPathRegexp, params) {
    var parsedPath = regexpExpressRegexp.exec(expressPathRegexp);
    var parsedRegexp = expressPathRegexp;
    var paramIdx = 0;
    while (hasParams(parsedRegexp)) {
        parsedRegexp = parsedRegexp.toString().replace(/\(\?:\(\[\^\\\/]\+\?\)\)/, ':' + params[paramIdx].name);
        paramIdx++;
    }
    if (parsedRegexp !== expressPathRegexp) {
        parsedPath = regexpExpressRegexp.exec(parsedRegexp);
    }
    parsedPath = parsedPath[1].replace(/\\\//g, '/');
    return parsedPath;
};
var parseEndpoints = function (app, basePath, endpoints) {
    var stack = app.stack || (app._router && app._router.stack);
    endpoints = endpoints || [];
    basePath = basePath || '';
    stack.forEach(function (stackItem) {
        if (stackItem.route) {
            endpoints.push(parseExpressRoute(stackItem.route, basePath));
        }
        else if (stackItem.name === 'router' || stackItem.name === 'bound dispatch') {
            if (regexpExpressRegexp.test(stackItem.regexp)) {
                var parsedPath = parseExpressPath(stackItem.regexp, stackItem.keys);
                parseEndpoints(stackItem.handle, basePath + '/' + parsedPath, endpoints);
            }
            else {
                parseEndpoints(stackItem.handle, basePath, endpoints);
            }
        }
    });
    return endpoints;
};
var getEndpoints = function (regulus) {
    return parseEndpoints(regulus.server);
};
exports.default = getEndpoints;
//# sourceMappingURL=index.js.map