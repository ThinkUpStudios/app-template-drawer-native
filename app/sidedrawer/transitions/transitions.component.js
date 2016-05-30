var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var page_1 = require("ui/page");
var sideDrawerModule = require('nativescript-telerik-ui-pro/sidedrawer');
var side_drawer_directives_1 = require("nativescript-telerik-ui-pro/sidedrawer/angular/side-drawer-directives");
var router_1 = require("angular2/router");
var AppComponent = (function () {
    function AppComponent(page, _router, _routeParams) {
        this.page = page;
        this._router = _router;
        this._routeParams = _routeParams;
        this.sideDrawerTransition = new sideDrawerModule.PushTransition();
    }
    // << sidedrawer-angular-transition-definition
    AppComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
    };
    AppComponent.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    AppComponent.prototype.onFadeTransitionTap = function (args) {
        this.setDrawerTransition(new sideDrawerModule.FadeTransition());
    };
    AppComponent.prototype.onPushTransitionTap = function (args) {
        this.setDrawerTransition(new sideDrawerModule.PushTransition());
    };
    AppComponent.prototype.onRevealTransitionTap = function (args) {
        this.setDrawerTransition(new sideDrawerModule.RevealTransition());
    };
    AppComponent.prototype.onReverseSlideOutTransitionTap = function (args) {
        this.setDrawerTransition(new sideDrawerModule.ReverseSlideOutTransition());
    };
    AppComponent.prototype.onScaleDownPusherTransitionTap = function (args) {
        this.setDrawerTransition(new sideDrawerModule.ScaleDownPusherTransition());
    };
    AppComponent.prototype.onScaleUpTransitionTap = function (args) {
        this.setDrawerTransition(new sideDrawerModule.ScaleUpTransition());
    };
    AppComponent.prototype.onSlideAlongTransitionTap = function (args) {
        this.setDrawerTransition(new sideDrawerModule.SlideAlongTransition());
    };
    AppComponent.prototype.onSlideInOnTopTransitionTap = function (args) {
        this.setDrawerTransition(new sideDrawerModule.SlideInOnTopTransition());
    };
    AppComponent.prototype.openSideDrawer = function () {
        this.drawer.showDrawer();
    };
    AppComponent.prototype.setDrawerTransition = function (transition) {
        this.sideDrawerTransition = transition;
    };
    AppComponent.prototype.clickSocial = function () {
        console.log('estoy en social');
        this._router.navigate(["SideDrawerEvents"]);
    };
    AppComponent.prototype.clickPromotions = function () {
        console.log('estoy en promociones');
    };
    AppComponent.prototype.clickImportant = function () {
        console.log('estoy en importantes');
    };
    AppComponent.prototype.clickStarred = function () {
        console.log('estoy en la starred');
    };
    AppComponent.prototype.clickMail = function () {
        console.log('estoy en la mail');
    };
    AppComponent.prototype.clickDrafts = function () {
        console.log('estoy en la drafts');
    };
    __decorate([
        core_1.ViewChild(side_drawer_directives_1.RadSideDrawerComponent), 
        __metadata('design:type', (typeof (_a = typeof side_drawer_directives_1.RadSideDrawerComponent !== 'undefined' && side_drawer_directives_1.RadSideDrawerComponent) === 'function' && _a) || Object)
    ], AppComponent.prototype, "drawerComponent", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: "sidedrawer-transitions",
            directives: [side_drawer_directives_1.RadSideDrawerComponent, side_drawer_directives_1.MainTemplateDirective, side_drawer_directives_1.DrawerTemplateDirective],
            templateUrl: 'sidedrawer/transitions/transitions.component.html'
        }),
        __param(0, core_1.Inject(page_1.Page)), 
        __metadata('design:paramtypes', [page_1.Page, router_1.Router, router_1.RouteParams])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=transitions.component.js.map