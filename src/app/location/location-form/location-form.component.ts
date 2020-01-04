import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LocationsService } from "src/app/locations.service";
import { Location, LocationCreator } from "../../services/rickAndMortyGraphql.service";

@Component({
  selector: "app-location-form",
  templateUrl: "./location-form.component.html",
  styleUrls: ["./location-form.component.scss"]
})
export class LocationFormComponent implements OnInit {
  @Input()
  location: Location;
 
  @Input()
  submitFn: (creator: LocationCreator) => Promise<any>;

  @Input()
  cancelFn?: () => any;

  locationForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public locationService: LocationsService
  ) {}

  ngOnInit() {
    this.locationForm = this.fb.group({
      name: [this.location.name, [Validators.required]],
      dimension: [this.location.dimension, [Validators.required]],
      type: [this.location.type, [Validators.required]]
      // charactersWithLocationIds: [
      //   this.location.charactersWithLocation.map(c => c.id)
      // ],
      // charactersWithOriginIds: [
      //   this.location.charactersWithOrigin.map(c => c.id)
      // ]
    });
  }

  submit = async () => {
    this.loading = true;
    await this.submitFn(this.locationForm.value as LocationCreator);
    this.loading = false;
  };
}
