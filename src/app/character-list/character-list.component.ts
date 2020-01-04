import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { mergeMap, scan, tap, throttleTime } from "rxjs/operators";
import { CharacterService, LocalCharacter } from "../character.service";

@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.scss"]
})
export class CharacterListComponent {
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;

  theEnd = false;
  loading = true;
  page = 1;
  filtering = false;

  offset = new BehaviorSubject(1);
  characters$: Observable<LocalCharacter[]>;

  constructor(public characterService: CharacterService) {
    this.characters$ = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.characterService.fetchPage(n)),
      tap(arr => {
        if (arr.length) {
          this.page += 1;
          this.loading = false;
        } else {
          this.theEnd = true;
        }
      }),
      scan((acc, batch) => {
        return acc.concat(batch);
      }, [])
    );
  }

  trackByIdx(i) {
    return i;
  }

  nextBatch = () => {
    if (this.theEnd || this.loading) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
      this.loading = true;
      this.offset.next(this.page);
    }
  };

  toggleFilter() {
    this.filtering = !this.filtering;
  }
}
