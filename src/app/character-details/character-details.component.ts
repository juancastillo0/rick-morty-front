import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { CharacterService } from "../character.service";
import { EpisodesService } from "../episodes.service";
import { CharacterCreator, CharacterRelations, DeleteCharacterGQL, UpdateCharacterGQL } from "../services/rickAndMortyGraphql.service";

@Component({
  selector: "app-character-details",
  templateUrl: "./character-details.component.html",
  styleUrls: ["./character-details.component.scss"]
})
export class CharacterDetailsComponent implements OnInit {
  constructor(
    private characterService: CharacterService,
    private episodeService: EpisodesService,
    private deleteCharacterService: DeleteCharacterGQL,
    private updateCharacterService: UpdateCharacterGQL,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  id: number;
  editing = false;
  deleting = false;

  character$ = this.route.paramMap.pipe(
    switchMap(params => {
      this.id = parseInt(params.get("id"), 10);
      return this.characterService.getCharacter(this.id);
    })
  );

  ngOnInit() {}

  onDelete = () => {
    this.deleting = !this.deleting;
  };

  onEdit = () => {
    this.editing = !this.editing;
  };

  edit = async (creator: CharacterCreator, relations?: CharacterRelations) => {
    this.editing = true;
    const characterUpdater = { ...creator, id: this.id };
    try {
      await this.updateCharacterService
        .mutate({
          characterUpdater,
          relations
        })
        .toPromise();
      this.character$ = this.character$.pipe(
        map(prev => {
          return {
            ...this.characterService.hidrateCharacter(characterUpdater),
            episodes:
              relations !== undefined
                ? relations.episodeIds.map(
                    epId => this.episodeService.episodesMap[epId]
                  )
                : prev.episodes
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
      await this.deleteCharacterService.mutate({ id: this.id }).toPromise();
      this.router.navigateByUrl("characters");
    } catch (e) {
      console.log(e);
    }
    this.deleting = false;
  };
}
