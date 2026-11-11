"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = Table;
exports.TableHeader = TableHeader;
exports.TableBody = TableBody;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableRow = TableRow;
exports.TableCell = TableCell;
exports.TableCaption = TableCaption;
const React = require("react");
const cn_1 = require("cn");
function Table({ className, ...props }) {
    return (<div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table data-slot="table" className={(0, cn_1.cn)("w-full caption-bottom text-sm", className)} {...props}/>
    </div>);
}
function TableHeader({ className, ...props }) {
    return (<thead data-slot="table-header" className={(0, cn_1.cn)("[&_tr]:border-b", className)} {...props}/>);
}
function TableBody({ className, ...props }) {
    return (<tbody data-slot="table-body" className={(0, cn_1.cn)("[&_tr:last-child]:border-0", className)} {...props}/>);
}
function TableFooter({ className, ...props }) {
    return (<tfoot data-slot="table-footer" className={(0, cn_1.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props}/>);
}
function TableRow({ className, ...props }) {
    return (<tr data-slot="table-row" className={(0, cn_1.cn)("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props}/>);
}
function TableHead({ className, ...props }) {
    return (<th data-slot="table-head" className={(0, cn_1.cn)("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", className)} {...props}/>);
}
function TableCell({ className, ...props }) {
    return (<td data-slot="table-cell" className={(0, cn_1.cn)("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className)} {...props}/>);
}
function TableCaption({ className, ...props }) {
    return (<caption data-slot="table-caption" className={(0, cn_1.cn)("mt-4 text-sm text-muted-foreground", className)} {...props}/>);
}
//# sourceMappingURL=table.js.map