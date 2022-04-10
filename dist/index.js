"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// load dependencies
require("dotenv/config");
const keycloak_json_1 = __importDefault(require("./config/keycloak.json"));
const fastify_1 = __importDefault(require("fastify"));
const keycloak_sami_js_1 = __importDefault(require("keycloak-sami-js"));
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const fastify = (0, fastify_1.default)({ logger: true });
        // init keycloak
        const keycloak = keycloak_sami_js_1.default.config({ timeout: 5000, baseURL: keycloak_json_1.default['auth-server-url'] });
        // Run authorization flow in all endpoints
        fastify.addHook('preHandler', (req, reply, done) => {
            var _a;
            if (!keycloak.verify((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], keycloak_json_1.default['public-key'])) {
                reply.status(401).send({ error: 'HTTP 401 Unauthorized' });
            }
            done();
        });
        return fastify;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    // init fastify
    const fastify = yield initServer();
    // routes
    fastify.get('/development/hello', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply.status(200).send({ hello: 'Hiring Development on Typescript' });
    }));
    // listening...
    fastify.listen(5000, (err) => {
        if (err)
            throw err;
    });
}))();
//# sourceMappingURL=index.js.map