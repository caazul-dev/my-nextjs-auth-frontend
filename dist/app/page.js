"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const navigation_1 = require("next/navigation");
const config_1 = require("@/lib/config");
function Home() {
    (0, navigation_1.redirect)(config_1.CONFIG.ROUTES.LOGIN);
}
//# sourceMappingURL=page.js.map