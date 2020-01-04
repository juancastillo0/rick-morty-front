import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CharacterCreator, CharacterRelations, CreateCharacterGQL } from "../services/rickAndMortyGraphql.service";

@Component({
  selector: "app-character-create",
  template: `
    <ng-container>
      <div class="container">
        <h3>Crear Personaje</h3>
        <app-character-edit
          [character]="character"
          [submitFn]="create"
          [cancelFn]="routeToList"
        >
        </app-character-edit>
      </div>
    </ng-container>
  `,
  styles: [``]
})
export class CharacterCreateComponent {
  constructor(private cs: CreateCharacterGQL, private router: Router) {}
  character = {
    name: "",
    status: "",
    species: "",
    gender: "",
    type: "",
    episodes: []
  };

  create = async (creator: CharacterCreator, relations: CharacterRelations) => {
    try {
      const newCharacter = await this.cs
        .mutate({ creator, relations })
        .toPromise();
      this.router.navigateByUrl(
        "/characters/" + newCharacter.data.characterMutation.createCharacter.id
      );
    } catch (e) {
      console.log(e);
    }
  };

  routeToList = () => {
    this.router.navigateByUrl("/characters");
  };
}
