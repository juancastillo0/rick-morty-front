import { ScrollingModule as ExperimentalScrollingModule } from "@angular/cdk-experimental/scrolling";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatListModule, MatProgressSpinnerModule, MatSelectModule, MatToolbarModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CharacterCreateComponent } from "./character-create/character-create.component";
import { CharacterDetailsComponent } from "./character-details/character-details.component";
import { CharacterEditComponent } from "./character-edit/character-edit.component";
import { CharacterFilterComponent } from "./character-filter/character-filter.component";
import { CharacterInfoComponent } from "./character-info/character-info.component";
import { CharacterListComponent } from "./character-list/character-list.component";
import { GraphQLModule } from "./graphql.module";
import { LocationCreateComponent } from "./location/location-create.component";
import { LocationDetailComponent } from "./location/location-detail/location-detail.component";
import { LocationFormComponent } from "./location/location-form/location-form.component";
import { LocationInfoComponent } from "./location/location-info/location-info.component";
import { LocationListComponent } from "./location/location-list/location-list.component";

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterDetailsComponent,
    CharacterEditComponent,
    CharacterInfoComponent,
    CharacterCreateComponent,
    LocationInfoComponent,
    LocationListComponent,
    LocationCreateComponent,
    LocationFormComponent,
    LocationDetailComponent,
    CharacterFilterComponent
  ],
  imports: [
    ScrollingModule,
    ExperimentalScrollingModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
