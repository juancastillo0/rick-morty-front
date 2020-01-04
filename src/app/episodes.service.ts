import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Episode, EpisodesGQL } from "./services/rickAndMortyGraphql.service";

@Injectable({
  providedIn: "root"
})
export class EpisodesService {
  episodesMap: {
    [key: number]: Pick<Episode, "id" | "name" | "airDate" | "code">;
  } = {};

  constructor(private episodesQuery: EpisodesGQL) {
    this.episodes$.subscribe(episodes => {
      this.episodesMap = episodes.reduce((p, e) => {
        p[e.id] = e;
        return p;
      }, {});
    });
  }

  episodes$ = this.episodesQuery
    .fetch()
    .pipe(map(res => res.data.episodes.results));
}
