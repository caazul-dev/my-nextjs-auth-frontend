"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.CONFIG = {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://nestjs-backend-uu26.onrender.com",
    STORAGE_KEYS: {
        ACCESS_TOKEN: "accessToken",
        REFRESH_TOKEN: "refreshToken",
    },
    ROUTES: {
        HOME: "/",
        LOGIN: "/login",
        REGISTER: "/register",
        DASHBOARD: "/dashboard",
    },
};
//# sourceMappingURL=config.js.map