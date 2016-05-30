import {Component, ElementRef, ViewChild, Inject} from "angular2/core";
import {View} from "ui/core/view";
import {RadSideDrawer} from "nativescript-telerik-ui-pro/sidedrawer";
import {Page} from "ui/page";
import {ActionItem} from "ui/action-bar";
import sideDrawerModule = require('nativescript-telerik-ui-pro/sidedrawer');
import {RadSideDrawerComponent, SideDrawerType, MainTemplateDirective, DrawerTemplateDirective} from "nativescript-telerik-ui-pro/sidedrawer/angular/side-drawer-directives";
import { Router, RouteParams } from "angular2/router";


// >> sidedrawer-angular-callbacks-definition
@Component({
    selector: "my-app",
    directives: [RadSideDrawerComponent, MainTemplateDirective, DrawerTemplateDirective],
    templateUrl: 'sidedrawer/events/events.component.html'
})
export class AppComponent {
    constructor(@Inject(Page) private page: Page, private _router: Router, private _routeParams: RouteParams) {
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;
    public currentDrawerNotification:string;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
    }
    
    public openDrawer(){
        this.drawer.showDrawer();
    }
    
     public onDrawerOpening() {
        console.log("Drawer opening");
    }

    public onDrawerOpened() {
         console.log("Drawer opened");
    }

    public onDrawerClosing() {
         console.log("Drawer closing");
    }

    public onDrawerClosed() {
         console.log("Drawer closed");
    }
    /**
     * name
     */
    public clickSocial() {
        console.log('estoy en social');
        this._router.navigate(["SideDrawerTransitions"]);
        
    }
    public clickPromotions() {
        console.log('estoy en promociones')
        this._router.navigate(["ListViewPullToRefresh"]);
    }
    public clickImportant() {
        console.log('estoy en importantes')
    }
    public clickStarred() {
        console.log('estoy en la starred')
    }
    public clickMail() {
        console.log('estoy en la mail')
    }
    public clickDrafts() {
        console.log('estoy en la drafts')
    }
    
}
// << sidedrawer-angular-callbacks-definition
