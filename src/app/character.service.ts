import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LocationsService } from "./locations.service";
import { Character, CharacterGQL, CharactersGQL } from "./services/rickAndMortyGraphql.service";

type Unpromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type LocalCharacter = Unpromise<
  ReturnType<CharacterService["getCharacterAsync"]>
>;
export type SimpleCharacter = Pick<
  Character,
  | "id"
  | "name"
  | "status"
  | "species"
  | "gender"
  | "type"
  | "originId"
  | "locationId"
>;
@Injectable({
  providedIn: "root"
})
export class CharacterService {
  page = 1;
  doneFetching = false;
  isFetching = false;
  characterMap: {
    [key: number]: LocalCharacter;
  } = {};
  characters$: Observable<LocalCharacter[]> = new Observable(p => p.next([]));

  constructor(
    private characterListService: CharactersGQL,
    private characterService: CharacterGQL,
    private locationService: LocationsService
  ) {}

  async getCharacterAsync(id: number) {
    const character = await this.characterService
      .fetch({ id })
      .pipe(map(a => a.data.character))
      .toPromise();
    this.characterMap[character.id] = character;
    return character;
  }

  getCharacter(id: number) {
    const obs = new Observable<LocalCharacter>(o => {
      if (id in this.characterMap) {
        o.next(this.characterMap[id]);
      }
      this.characterService
        .fetch({ id })
        .pipe(map(a => a.data.character))
        .subscribe(c => {
          this.characterMap[c.id] = c;
          o.next(c);
          o.complete();
        });
    });

    return obs;
  }

  fetchMore() {
    if (this.doneFetching || this.isFetching) {
      return;
    }
    this.isFetching = true;
    const newObs = this.characterListService.fetch({ page: this.page }).pipe(
      map(({ data }) => {
        if (data.characters.info.nextPage === undefined) {
          this.doneFetching = true;
        }
        return [
          ...Object.values(this.characterMap),
          ...data.characters.results.map(this.hidrateCharacter)
        ];
      })
    );

    // if (numberFetched === 0) {
    //   this.doneFetching = true;
    //   this.isFetching = false;
    //   return;
    // }
    this.characters$ = newObs;
    //  = concat(
    //   this.characters$,
    //   new Observable<LocalCharacter[]>(p => p.next(newData))
    // );
    this.page += 1;
    this.isFetching = false;
    return newObs;
  }

  fetchPage(page: number) {
    console.log(page);
    return this.characterListService.fetch({ page }).pipe(
      map(({ data }) => {
        return data.characters.results.map(this.hidrateCharacter);
      })
    );
  }

  hidrateCharacter = (c: SimpleCharacter) => {
    const character = {
      episodes: undefined,
      ...(this.characterMap[c.id] || {}),
      ...c,
      origin:
        c.originId !== undefined &&
        this.locationService.locationsMap[c.originId],
      location:
        c.locationId !== undefined &&
        this.locationService.locationsMap[c.locationId]
    } as LocalCharacter;
    this.characterMap[c.id] = character;
    return character;
  };
}
