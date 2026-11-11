"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = Label;
const React = require("react");
const cn_1 = require("cn");
function Label({ className, ...props }) {
    return (<label data-slot="label" className={(0, cn_1.cn)("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className)} {...props}/>);
}
//# sourceMappingURL=label.js.map