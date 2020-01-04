import { Component, Input } from "@angular/core";
import { SimpleLocation } from "src/app/locations.service";

@Component({
  selector: "app-location-info",
  template: `
    <div class="row">
      <section>
        <span>Dimensión</span>
        <div>{{ location.dimension }}</div>
      </section>
      <section>
        <span>Tipo</span>
        <div>{{ location.type }}</div>
      </section>
    </div>
  `,
  styleUrls: ["./location-info.component.scss"]
})
export class LocationInfoComponent {
  @Input()
  location: SimpleLocation;

  constructor() {}
}
