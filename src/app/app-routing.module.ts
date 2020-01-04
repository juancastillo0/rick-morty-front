import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharacterCreateComponent } from "./character-create/character-create.component";
import { CharacterDetailsComponent } from "./character-details/character-details.component";
import { CharacterListComponent } from "./character-list/character-list.component";
import { LocationCreateComponent } from './location/location-create.component';
import { LocationDetailComponent } from './location/location-detail/location-detail.component';
import { LocationListComponent } from './location/location-list/location-list.component';

const routes: Routes = [
  { path: "characters/create", component: CharacterCreateComponent },
  { path: "characters/:id", component: CharacterDetailsComponent },
  {
    path: "characters",
    component: CharacterListComponent
  },
  { path: "locations/create", component: LocationCreateComponent },
  { path: "locations/:id", component: LocationDetailComponent },
  {
    path: "locations",
    component: LocationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
