var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var router_2 = require("nativescript-angular/router");
var SideDrawerEvents = require("../sidedrawer/events/events.component");
var SideDrawerTransitions = require("../sidedrawer/transitions/transitions.component");
var MainComponent = (function () {
    function MainComponent() {
    }
    MainComponent = __decorate([
        core_1.Component({
            selector: "main",
            directives: [router_2.NS_ROUTER_DIRECTIVES],
            providers: [router_2.NS_ROUTER_PROVIDERS],
            template: "<page-router-outlet></page-router-outlet>"
        }),
        router_1.RouteConfig([
            { path: "/sidedrawer-events", component: SideDrawerEvents.AppComponent, name: "SideDrawerEvents", useAsDefault: true },
            { path: "/sidedrawer-transitions", component: SideDrawerTransitions.AppComponent, name: "SideDrawerTransitions" },
        ]), 
        __metadata('design:paramtypes', [])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map