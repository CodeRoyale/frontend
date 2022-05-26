"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthOptions = void 0;
const axios_1 = __importDefault(require("axios"));
const validateAuthOptions = async (options) => {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const usernameSpecialChars = /[!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?]+/;
    const hasNumber = /\d/;
    const responseFromGoogle = await axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${options.accessToken}` },
    });
    const googleUser = responseFromGoogle.data;
    if (!googleUser) {
        return [
            {
                field: "token",
                message: "Bad Google code",
            },
        ];
    }
    if (options.email !== googleUser.email) {
        return [
            {
                field: "email",
                message: "Email does not match OAuth email",
            },
        ];
    }
    if (usernameSpecialChars.test(options.username)) {
        return [
            {
                field: "username",
                message: "Invalid username",
            },
        ];
    }
    if (specialChars.test(options.name) || hasNumber.test(options.name)) {
        return [
            {
                field: "name",
                message: "Invalid name",
            },
        ];
    }
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "Length of username must be greater than 2",
            },
        ];
    }
    if (options.name.length <= 2) {
        return [
            {
                field: "name",
                message: "Length of name must be greater than 2",
            },
        ];
    }
    return null;
};
exports.validateAuthOptions = validateAuthOptions;
//# sourceMappingURL=validateAuthOptions.js.map