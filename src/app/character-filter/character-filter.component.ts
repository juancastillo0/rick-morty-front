import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors } from "@angular/forms";
import { LocationsService } from "../locations.service";
import { CharacterFilter } from "../services/rickAndMortyGraphql.service";

const initialState: CharacterFilter = {
  searchText: "",
  gender: [],
  locationId: [],
  originId: [],
  species: [],
  status: []
};

const toCharacterFilter = (formValue: { [key: string]: any }) => {
  for (const [key, value] of Object.entries(formValue)) {
    if (typeof value === "object") {
      formValue[key] = Object.entries(value).reduce((p, [k, v]) => {
        if (v === true) {
          p.push(k);
        }
        return p;
      }, []);
    }
  }
  return formValue;
};

@Component({
  selector: "app-character-filter",
  templateUrl: "./character-filter.component.html",
  styleUrls: ["./character-filter.component.scss"]
})
export class CharacterFilterComponent implements OnInit {
  filterForm: FormGroup;
  loading = false;
  prevState: CharacterFilter = initialState;

  @Input()
  submitFn: (characterFilter: CharacterFilter) => Promise<any>;

  constructor(
    public locationService: LocationsService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group(
      {
        searchText: "",
        gender: this.fb.group({
          Male: false,
          Female: false,
          Genderless: false,
          unknown: false
        }),
        locationId: [[]],
        originId: [[]],
        species: [[]],
        status: this.fb.group({ Dead: false, Alive: false, unknown: false })
      },
      {
        validators: this.changedFields
      }
    );
  }

  ngOnInit() {}

  changedFields = (control: FormGroup): ValidationErrors | null => {
    const values = toCharacterFilter(control.value) as CharacterFilter;

    for (const [k, v] of Object.entries(values)) {
      console.log(k, v);
      const prevV = this.prevState[k];
      if (Array.isArray(prevV)) {
        if (
          prevV.length !== v.length ||
          prevV.find((v2, i) => v2 !== v[i]) !== undefined
        ) {
          return null;
        }
      } else if (prevV !== v) {
        return null;
      }
    }
    return { hasChanged: "No ha cambiado los campos." };
  };

  reset() {
    this.filterForm.reset(initialState);
  }

  async submit() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const filter = toCharacterFilter(this.filterForm.value) as CharacterFilter;
    await this.submitFn(filter);
    this.prevState = filter;
    this.loading = false;
  }
}
