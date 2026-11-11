"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationMenuTriggerStyle = void 0;
exports.NavigationMenu = NavigationMenu;
exports.NavigationMenuContent = NavigationMenuContent;
exports.NavigationMenuIndicator = NavigationMenuIndicator;
exports.NavigationMenuItem = NavigationMenuItem;
exports.NavigationMenuLink = NavigationMenuLink;
exports.NavigationMenuList = NavigationMenuList;
exports.NavigationMenuTrigger = NavigationMenuTrigger;
exports.NavigationMenuPositioner = NavigationMenuPositioner;
const navigation_menu_1 = require("@base-ui/react/navigation-menu");
const class_variance_authority_1 = require("class-variance-authority");
const cn_1 = require("cn");
const lucide_react_1 = require("lucide-react");
function NavigationMenu({ align = "start", className, children, ...props }) {
    return (<navigation_menu_1.NavigationMenu.Root data-slot="navigation-menu" className={(0, cn_1.cn)("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className)} {...props}>
      {children}
      <NavigationMenuPositioner align={align}/>
    </navigation_menu_1.NavigationMenu.Root>);
}
function NavigationMenuList({ className, ...props }) {
    return (<navigation_menu_1.NavigationMenu.List data-slot="navigation-menu-list" className={(0, cn_1.cn)("group flex flex-1 list-none items-center justify-center gap-0", className)} {...props}/>);
}
function NavigationMenuItem({ className, ...props }) {
    return (<navigation_menu_1.NavigationMenu.Item data-slot="navigation-menu-item" className={(0, cn_1.cn)("relative", className)} {...props}/>);
}
const navigationMenuTriggerStyle = (0, class_variance_authority_1.cva)("group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted");
exports.navigationMenuTriggerStyle = navigationMenuTriggerStyle;
function NavigationMenuTrigger({ className, children, ...props }) {
    return (<navigation_menu_1.NavigationMenu.Trigger data-slot="navigation-menu-trigger" className={(0, cn_1.cn)(navigationMenuTriggerStyle(), "group", className)} {...props}>
      {children}{" "}
      <lucide_react_1.ChevronDownIcon className="relative top-px ml-1 size-3 transition duration-300 group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180" aria-hidden="true"/>
    </navigation_menu_1.NavigationMenu.Trigger>);
}
function NavigationMenuContent({ className, ...props }) {
    return (<navigation_menu_1.NavigationMenu.Content data-slot="navigation-menu-content" className={(0, cn_1.cn)("data-ending-style:data-activation-direction=left:translate-x-[50%] data-ending-style:data-activation-direction=right:translate-x-[-50%] data-starting-style:data-activation-direction=left:translate-x-[-50%] data-starting-style:data-activation-direction=right:translate-x-[50%] h-full w-auto p-1 transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[viewport=false]/navigation-menu:rounded-lg group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:ring-foreground/10 group-data-[viewport=false]/navigation-menu:duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95", className)} {...props}/>);
}
function NavigationMenuPositioner({ className, side = "bottom", sideOffset = 8, align = "start", alignOffset = 0, ...props }) {
    return (<navigation_menu_1.NavigationMenu.Portal>
      <navigation_menu_1.NavigationMenu.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} className={(0, cn_1.cn)("isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0", className)} {...props}>
        <navigation_menu_1.NavigationMenu.Popup className="data-[ending-style]:easing-[ease] xs:w-(--popup-width) relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10 transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-90 data-starting-style:opacity-0">
          <navigation_menu_1.NavigationMenu.Viewport className="relative size-full overflow-hidden"/>
        </navigation_menu_1.NavigationMenu.Popup>
      </navigation_menu_1.NavigationMenu.Positioner>
    </navigation_menu_1.NavigationMenu.Portal>);
}
function NavigationMenuLink({ className, ...props }) {
    return (<navigation_menu_1.NavigationMenu.Link data-slot="navigation-menu-link" className={(0, cn_1.cn)("flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted [&_svg:not([class*='size-'])]:size-4", className)} {...props}/>);
}
function NavigationMenuIndicator({ className, ...props }) {
    return (<navigation_menu_1.NavigationMenu.Icon data-slot="navigation-menu-indicator" className={(0, cn_1.cn)("top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in", className)} {...props}>
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md"/>
    </navigation_menu_1.NavigationMenu.Icon>);
}
//# sourceMappingURL=navigation-menu.js.map