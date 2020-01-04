import { Component, Input, OnInit } from "@angular/core";
import { Character } from "../services/rickAndMortyGraphql.service";

@Component({
  selector: "app-character-info",
  templateUrl: "./character-info.component.html",
  styleUrls: ["./character-info.component.scss"]
})
export class CharacterInfoComponent implements OnInit {
  @Input()
  character: Character;

  @Input()
  showOrigin = true;

  @Input()
  showLocation = true;

  constructor() {}

  ngOnInit() {}
}
