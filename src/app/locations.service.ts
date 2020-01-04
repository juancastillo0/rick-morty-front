import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CharacterService, SimpleCharacter } from "./character.service";
import { GetLocationGQL, Location, LocationsGQL } from "./services/rickAndMortyGraphql.service";

export type SimpleLocation = Pick<
  Location,
  "id" | "name" | "type" | "dimension"
>;

type Unpromise<V extends Promise<any>> = V extends Promise<infer U> ? U : never;
export type LocalLocation = Unpromise<
  ReturnType<LocationsService["getLocationAsync"]>
>;

@Injectable({
  providedIn: "root"
})
export class LocationsService {
  locationsMap: {
    [key: number]: LocalLocation;
  } = {};

  locations$ = this.locationsQuery
    .fetch()
    .pipe(map(res => res.data.locations.results));

  constructor(
    private locationsQuery: LocationsGQL,
    private locationQuery: GetLocationGQL,
    private injector: Injector
  ) {
    this.locations$.subscribe(locations => {
      this.locationsMap = locations.reduce((p, e) => {
        p[e.id] = e;
        return p;
      }, {});
    });
  }

  getLocationAsync = (id: number) => {
    return this.locationQuery
      .fetch({ id })
      .pipe(map(l => l.data.location))
      .toPromise();
  };

  getLocation = (id: number) => {
    const characterService = this.injector.get(CharacterService);
    return new Observable<LocalLocation>(o => {
      if (id in this.locationsMap) {
        o.next(this.locationsMap[id]);
      }
      this.locationQuery
        .fetch({ id })
        .pipe(map(l => l.data.location))
        .subscribe(location => {
          location.charactersWithLocation = location.charactersWithLocation.map(
            characterService.hidrateCharacter
          );
          location.charactersWithOrigin = location.charactersWithOrigin.map(
            characterService.hidrateCharacter
          );
          this.locationsMap[id] = location;
          o.next(location);
          o.complete();
        });
    });
  };

  hidrateCharacterLocations = (c: SimpleCharacter) => {
    return {
      ...c,
      origin: c.originId !== undefined && this.locationsMap[c.originId],
      location: c.locationId !== undefined && this.locationsMap[c.locationId]
    };
  };
}
