import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, OnInit, ViewChild } from "@angular/core";
import { LocationsService } from "src/app/locations.service";

@Component({
  selector: "app-location-list",
  templateUrl: "./location-list.component.html",
  styleUrls: ["./location-list.component.scss"]
})
export class LocationListComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;

  constructor(public locationService: LocationsService) {}

  ngOnInit() {}

  trackByIdx(i) {
    return i;
  }
}
