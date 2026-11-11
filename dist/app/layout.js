"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
require("./globals.css");
function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>);
}
//# sourceMappingURL=layout.js.map