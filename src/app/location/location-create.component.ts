import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocationsService, SimpleLocation } from "../locations.service";
import { CreateLocationGQL, LocationCreator } from "../services/rickAndMortyGraphql.service";

@Component({
  selector: "app-location-create",
  template: `
    <div class="container">
      <h3>Crear Lugar</h3>
      <app-location-form
        [location]="location"
        [submitFn]="create"
        [cancelFn]="cancel"
      >
      </app-location-form>
    </div>
  `,
  styles: []
})
export class LocationCreateComponent {
  location: Omit<SimpleLocation, "id"> = { dimension: "", name: "", type: "" };

  constructor(
    private locationCreateQuery: CreateLocationGQL,
    private locationService: LocationsService,
    private router: Router
  ) {}

  cancel = () => {
    this.router.navigateByUrl("/locations");
  };

  create = async (creator: LocationCreator) => {
    try {
      const ans = await this.locationCreateQuery
        .mutate({ creator })
        .toPromise();
      const location = ans.data.locationMutation.createLocation;
      this.locationService.locationsMap[location.id] = {
        ...location,
        charactersWithLocation: undefined,
        charactersWithOrigin: undefined
      };
      this.router.navigateByUrl("/locations/" + location.id);
    } catch (e) {
      console.log(e);
    }
  };
}
