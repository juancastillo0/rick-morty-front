import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { LocalLocation, LocationsService } from "src/app/locations.service";
import { DeleteLocationGQL, LocationCreator, UpdateLocationGQL } from "../../services/rickAndMortyGraphql.service";

@Component({
  selector: "app-location-detail",
  templateUrl: "./location-detail.component.html",
  styleUrls: ["./location-detail.component.scss"]
})
export class LocationDetailComponent {
  constructor(
    private locationService: LocationsService,
    private deleteLocationService: DeleteLocationGQL,
    private updateLocationService: UpdateLocationGQL,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.location$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.id = parseInt(params.get("id"), 10);
        return this.locationService.getLocation(this.id);
      })
    );
  }

  id: number;
  editing = false;
  deleting = false;

  location$: Observable<LocalLocation>;

  onDelete = () => {
    this.deleting = !this.deleting;
  };

  onEdit = () => {
    this.editing = !this.editing;
  };

  edit = async (creator: LocationCreator) => {
    this.editing = true;
    const updater = { ...creator, id: this.id };
    try {
      await this.updateLocationService
        .mutate({
          updater
        })
        .toPromise();
      this.location$ = this.location$.pipe(
        map(prev => {
          return {
            ...prev,
            ...updater
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
    this.editing = false;
  };

  delete = async () => {
    this.deleting = true;
    try {
      await this.deleteLocationService.mutate({ id: this.id }).toPromise();
      this.router.navigateByUrl("locations");
    } catch (e) {
      console.log(e);
    }
    this.deleting = false;
  };
}
