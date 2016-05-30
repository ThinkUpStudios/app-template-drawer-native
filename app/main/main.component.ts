import { Component } from "angular2/core";
import { ObservableArray } from "data/observable-array";
import { RouteConfig } from "angular2/router";
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS } from "nativescript-angular/router";
import * as SideDrawerEvents from "../sidedrawer/events/events.component";
import * as SideDrawerTransitions from "../sidedrawer/transitions/transitions.component";

@Component({
  selector: "main",
  directives: [NS_ROUTER_DIRECTIVES],
  providers: [NS_ROUTER_PROVIDERS],
  template: "<page-router-outlet></page-router-outlet>"
})
@RouteConfig([

  { path: "/sidedrawer-events", component: SideDrawerEvents.AppComponent, name: "SideDrawerEvents", useAsDefault: true  },
  { path: "/sidedrawer-transitions", component: SideDrawerTransitions.AppComponent, name: "SideDrawerTransitions" },
])
export class MainComponent {

}