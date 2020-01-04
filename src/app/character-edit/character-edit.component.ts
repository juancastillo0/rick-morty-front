import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EpisodesService } from "../episodes.service";
import { LocationsService } from "../locations.service";
import { Character, CharacterCreator, CharacterRelations } from "../services/rickAndMortyGraphql.service";

@Component({
  selector: "app-character-edit",
  templateUrl: "./character-edit.component.html",
  styleUrls: ["./character-edit.component.scss"]
})
export class CharacterEditComponent implements OnInit {
  @Input()
  character: Character;

  @Input()
  submitFn: (
    updater: CharacterCreator,
    characterRelations: CharacterRelations
  ) => Promise<any>;

  @Input()
  cancelFn?: () => any;

  characterForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public locationService: LocationsService,
    public episodeService: EpisodesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.characterForm = this.fb.group({
      name: [this.character.name, [Validators.required]],
      status: [this.character.status, [Validators.required]],
      species: [this.character.species, [Validators.required]],
      gender: [this.character.gender, [Validators.required]],
      type: [this.character.type],
      locationId: [
        this.character.location ? this.character.location.id : undefined
      ],
      originId: [this.character.origin ? this.character.origin.id : undefined],
      episodeIds: [this.character.episodes.map(e => e.id)]
    });
  }

  submit = async () => {
    this.loading = true;
    const characterRelations = {
      episodeIds: this.characterForm.value.episodeIds
    } as CharacterRelations;
    const value = this.characterForm.value;
    delete value.episodeIds;
    await this.submitFn(value as CharacterCreator, characterRelations);
    console.log("sent");
    this.loading = false;
  };
}
