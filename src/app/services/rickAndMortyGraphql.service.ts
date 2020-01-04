import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};



export type CaracterMutation = {
   __typename?: 'CaracterMutation',
  createCharacter: Character,
  deleteCharacter: Scalars['Boolean'],
  updateCharacter: Character,
};


export type CaracterMutationCreateCharacterArgs = {
  creator: CharacterCreator,
  relations: CharacterRelations
};


export type CaracterMutationDeleteCharacterArgs = {
  id: Scalars['Int']
};


export type CaracterMutationUpdateCharacterArgs = {
  updater: CharacterUpdater,
  relations?: Maybe<CharacterRelations>
};

export type Character = {
   __typename?: 'Character',
  id: Scalars['Int'],
  name: Scalars['String'],
  status: Scalars['String'],
  species: Scalars['String'],
  gender: Scalars['String'],
  originId?: Maybe<Scalars['Int']>,
  locationId?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
  origin?: Maybe<Location>,
  location?: Maybe<Location>,
  episodes: Array<Episode>,
};

export type CharacterCreator = {
  name: Scalars['String'],
  status: Scalars['String'],
  species: Scalars['String'],
  gender: Scalars['String'],
  type?: Maybe<Scalars['String']>,
  originId?: Maybe<Scalars['Int']>,
  locationId?: Maybe<Scalars['Int']>,
};

export type CharacterFilter = {
  searchText?: Maybe<Scalars['String']>,
  status?: Maybe<Array<Scalars['String']>>,
  species?: Maybe<Array<Scalars['String']>>,
  gender?: Maybe<Array<Scalars['String']>>,
  originId?: Maybe<Array<Scalars['Int']>>,
  locationId?: Maybe<Array<Scalars['Int']>>,
};

export type CharacterListResult = {
   __typename?: 'CharacterListResult',
  info: InfoListResult,
  results: Array<Character>,
};

export type CharacterRelations = {
  episodeIds: Array<Scalars['Int']>,
};

export type CharacterUpdater = {
  id: Scalars['Int'],
  name: Scalars['String'],
  status: Scalars['String'],
  species: Scalars['String'],
  gender: Scalars['String'],
  type?: Maybe<Scalars['String']>,
  originId?: Maybe<Scalars['Int']>,
  locationId?: Maybe<Scalars['Int']>,
};

export type Episode = {
   __typename?: 'Episode',
  id: Scalars['Int'],
  name: Scalars['String'],
  airDate: Scalars['String'],
  code: Scalars['String'],
  characters: Array<Character>,
};

export type EpisodeCreator = {
  name: Scalars['String'],
  airDate: Scalars['String'],
  code: Scalars['String'],
};

export type EpisodeListResult = {
   __typename?: 'EpisodeListResult',
  info: InfoListResult,
  results: Array<Episode>,
};

export type EpisodeMutation = {
   __typename?: 'EpisodeMutation',
  createEpisode: Episode,
  deleteEpisode: Scalars['Boolean'],
  updateEpisode: Episode,
};


export type EpisodeMutationCreateEpisodeArgs = {
  creator: EpisodeCreator
};


export type EpisodeMutationDeleteEpisodeArgs = {
  id: Scalars['Int']
};


export type EpisodeMutationUpdateEpisodeArgs = {
  updater: EpisodeUpdater
};

export type EpisodeUpdater = {
  id: Scalars['Int'],
  name: Scalars['String'],
  airDate: Scalars['String'],
  code: Scalars['String'],
};

export type InfoListResult = {
   __typename?: 'InfoListResult',
  nextPage?: Maybe<Scalars['Int']>,
  numPages: Scalars['Int'],
  itemCount: Scalars['Int'],
};

export type Location = {
   __typename?: 'Location',
  id: Scalars['Int'],
  name: Scalars['String'],
  type: Scalars['String'],
  dimension: Scalars['String'],
  charactersWithOrigin: Array<Character>,
  charactersWithLocation: Array<Character>,
};

export type LocationCreator = {
  name: Scalars['String'],
  type: Scalars['String'],
  dimension: Scalars['String'],
};

export type LocationListResult = {
   __typename?: 'LocationListResult',
  info: InfoListResult,
  results: Array<Location>,
};

export type LocationMutation = {
   __typename?: 'LocationMutation',
  createLocation: Location,
  deleteLocation: Scalars['Boolean'],
  updateLocation: Location,
};


export type LocationMutationCreateLocationArgs = {
  creator: LocationCreator
};


export type LocationMutationDeleteLocationArgs = {
  id: Scalars['Int']
};


export type LocationMutationUpdateLocationArgs = {
  updater: LocationUpdater
};

export type LocationUpdater = {
  id: Scalars['Int'],
  name: Scalars['String'],
  type: Scalars['String'],
  dimension: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  resetDb: Scalars['Boolean'],
  characterMutation: CaracterMutation,
  episodeMutation: EpisodeMutation,
  locationMutation: LocationMutation,
};

export type Query = {
   __typename?: 'Query',
  characters: CharacterListResult,
  charactersFiltered: Array<Character>,
  character: Character,
  episodes: EpisodeListResult,
  episode: Episode,
  locations: LocationListResult,
  location: Location,
};


export type QueryCharactersArgs = {
  page: Scalars['Int']
};


export type QueryCharactersFilteredArgs = {
  limit: Scalars['Int'],
  offset: Scalars['Int'],
  filter: CharacterFilter
};


export type QueryCharacterArgs = {
  id: Scalars['Int']
};


export type QueryEpisodesArgs = {
  page: Scalars['Int']
};


export type QueryEpisodeArgs = {
  id: Scalars['Int']
};


export type QueryLocationsArgs = {
  page: Scalars['Int']
};


export type QueryLocationArgs = {
  id: Scalars['Int']
};

export type CharacterQueryVariables = {
  id: Scalars['Int']
};


export type CharacterQuery = (
  { __typename?: 'Query' }
  & { character: (
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'name' | 'status' | 'species' | 'gender' | 'type'>
    & { origin: Maybe<(
      { __typename?: 'Location' }
      & Pick<Location, 'id' | 'name' | 'type' | 'dimension'>
    )>, location: Maybe<(
      { __typename?: 'Location' }
      & Pick<Location, 'id' | 'name' | 'type' | 'dimension'>
    )>, episodes: Array<(
      { __typename?: 'Episode' }
      & Pick<Episode, 'id' | 'name' | 'airDate' | 'code'>
    )> }
  ) }
);

export type DeleteCharacterMutationVariables = {
  id: Scalars['Int']
};


export type DeleteCharacterMutation = (
  { __typename?: 'Mutation' }
  & { characterMutation: (
    { __typename?: 'CaracterMutation' }
    & Pick<CaracterMutation, 'deleteCharacter'>
  ) }
);

export type UpdateCharacterMutationVariables = {
  characterUpdater: CharacterUpdater,
  relations?: Maybe<CharacterRelations>
};


export type UpdateCharacterMutation = (
  { __typename?: 'Mutation' }
  & { characterMutation: (
    { __typename?: 'CaracterMutation' }
    & { updateCharacter: (
      { __typename?: 'Character' }
      & Pick<Character, 'id' | 'name' | 'status' | 'species' | 'gender' | 'type'>
    ) }
  ) }
);

export type CreateCharacterMutationVariables = {
  creator: CharacterCreator,
  relations: CharacterRelations
};


export type CreateCharacterMutation = (
  { __typename?: 'Mutation' }
  & { characterMutation: (
    { __typename?: 'CaracterMutation' }
    & { createCharacter: (
      { __typename?: 'Character' }
      & Pick<Character, 'id' | 'name' | 'status' | 'species' | 'gender' | 'type' | 'originId' | 'locationId'>
    ) }
  ) }
);

export type CharactersQueryVariables = {
  page: Scalars['Int']
};


export type CharactersQuery = (
  { __typename?: 'Query' }
  & { characters: (
    { __typename?: 'CharacterListResult' }
    & { info: (
      { __typename?: 'InfoListResult' }
      & Pick<InfoListResult, 'nextPage' | 'numPages' | 'itemCount'>
    ), results: Array<(
      { __typename?: 'Character' }
      & Pick<Character, 'id' | 'name' | 'status' | 'species' | 'gender' | 'type' | 'originId' | 'locationId'>
    )> }
  ) }
);

export type EpisodesQueryVariables = {};


export type EpisodesQuery = (
  { __typename?: 'Query' }
  & { episodes: (
    { __typename?: 'EpisodeListResult' }
    & { results: Array<(
      { __typename?: 'Episode' }
      & Pick<Episode, 'id' | 'name' | 'airDate' | 'code'>
    )> }
  ) }
);

export type CreateEpisodeMutationVariables = {
  creator: EpisodeCreator
};


export type CreateEpisodeMutation = (
  { __typename?: 'Mutation' }
  & { episodeMutation: (
    { __typename?: 'EpisodeMutation' }
    & { createEpisode: (
      { __typename?: 'Episode' }
      & Pick<Episode, 'id' | 'name' | 'airDate' | 'code'>
    ) }
  ) }
);

export type DeleteEpisodeMutationVariables = {
  id: Scalars['Int']
};


export type DeleteEpisodeMutation = (
  { __typename?: 'Mutation' }
  & { episodeMutation: (
    { __typename?: 'EpisodeMutation' }
    & Pick<EpisodeMutation, 'deleteEpisode'>
  ) }
);

export type UpdateEpisodeMutationVariables = {
  updater: EpisodeUpdater
};


export type UpdateEpisodeMutation = (
  { __typename?: 'Mutation' }
  & { episodeMutation: (
    { __typename?: 'EpisodeMutation' }
    & { updateEpisode: (
      { __typename?: 'Episode' }
      & Pick<Episode, 'id' | 'name' | 'airDate' | 'code'>
    ) }
  ) }
);

export type GetEpisodeQueryVariables = {
  id: Scalars['Int']
};


export type GetEpisodeQuery = (
  { __typename?: 'Query' }
  & { episode: (
    { __typename?: 'Episode' }
    & Pick<Episode, 'id' | 'name' | 'airDate' | 'code'>
    & { characters: Array<(
      { __typename?: 'Character' }
      & Pick<Character, 'id' | 'name' | 'status' | 'species' | 'gender' | 'originId' | 'locationId' | 'type'>
    )> }
  ) }
);

export type LocationsQueryVariables = {};


export type LocationsQuery = (
  { __typename?: 'Query' }
  & { locations: (
    { __typename?: 'LocationListResult' }
    & { results: Array<(
      { __typename?: 'Location' }
      & Pick<Location, 'id' | 'name' | 'type' | 'dimension'>
    )> }
  ) }
);

export type CreateLocationMutationVariables = {
  creator: LocationCreator
};


export type CreateLocationMutation = (
  { __typename?: 'Mutation' }
  & { locationMutation: (
    { __typename?: 'LocationMutation' }
    & { createLocation: (
      { __typename?: 'Location' }
      & Pick<Location, 'id' | 'name' | 'type' | 'dimension'>
    ) }
  ) }
);

export type UpdateLocationMutationVariables = {
  updater: LocationUpdater
};


export type UpdateLocationMutation = (
  { __typename?: 'Mutation' }
  & { locationMutation: (
    { __typename?: 'LocationMutation' }
    & { updateLocation: (
      { __typename?: 'Location' }
      & Pick<Location, 'id' | 'name' | 'type' | 'dimension'>
    ) }
  ) }
);

export type DeleteLocationMutationVariables = {
  id: Scalars['Int']
};


export type DeleteLocationMutation = (
  { __typename?: 'Mutation' }
  & { locationMutation: (
    { __typename?: 'LocationMutation' }
    & Pick<LocationMutation, 'deleteLocation'>
  ) }
);

export type GetLocationQueryVariables = {
  id: Scalars['Int']
};


export type GetLocationQuery = (
  { __typename?: 'Query' }
  & { location: (
    { __typename?: 'Location' }
    & Pick<Location, 'id' | 'name' | 'type' | 'dimension'>
    & { charactersWithOrigin: Array<(
      { __typename?: 'Character' }
      & Pick<Character, 'id' | 'name' | 'status' | 'species' | 'gender' | 'originId' | 'locationId' | 'type'>
    )>, charactersWithLocation: Array<(
      { __typename?: 'Character' }
      & Pick<Character, 'id' | 'name' | 'status' | 'species' | 'gender' | 'originId' | 'locationId' | 'type'>
    )> }
  ) }
);


export const CharacterDocument = gql`
    query character($id: Int!) {
  character(id: $id) {
    id
    name
    status
    species
    gender
    type
    origin {
      id
      name
      type
      dimension
    }
    location {
      id
      name
      type
      dimension
    }
    episodes {
      id
      name
      airDate
      code
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CharacterGQL extends Apollo.Query<CharacterQuery, CharacterQueryVariables> {
    document = CharacterDocument;
    
  }
export const DeleteCharacterDocument = gql`
    mutation deleteCharacter($id: Int!) {
  characterMutation {
    deleteCharacter(id: $id)
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCharacterGQL extends Apollo.Mutation<DeleteCharacterMutation, DeleteCharacterMutationVariables> {
    document = DeleteCharacterDocument;
    
  }
export const UpdateCharacterDocument = gql`
    mutation updateCharacter($characterUpdater: CharacterUpdater!, $relations: CharacterRelations) {
  characterMutation {
    updateCharacter(updater: $characterUpdater, relations: $relations) {
      id
      name
      status
      species
      gender
      type
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCharacterGQL extends Apollo.Mutation<UpdateCharacterMutation, UpdateCharacterMutationVariables> {
    document = UpdateCharacterDocument;
    
  }
export const CreateCharacterDocument = gql`
    mutation createCharacter($creator: CharacterCreator!, $relations: CharacterRelations!) {
  characterMutation {
    createCharacter(creator: $creator, relations: $relations) {
      id
      name
      status
      species
      gender
      type
      originId
      locationId
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCharacterGQL extends Apollo.Mutation<CreateCharacterMutation, CreateCharacterMutationVariables> {
    document = CreateCharacterDocument;
    
  }
export const CharactersDocument = gql`
    query characters($page: Int!) {
  characters(page: $page) {
    info {
      nextPage
      numPages
      itemCount
    }
    results {
      id
      name
      status
      species
      gender
      type
      originId
      locationId
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CharactersGQL extends Apollo.Query<CharactersQuery, CharactersQueryVariables> {
    document = CharactersDocument;
    
  }
export const EpisodesDocument = gql`
    query episodes {
  episodes(page: -1) {
    results {
      id
      name
      airDate
      code
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EpisodesGQL extends Apollo.Query<EpisodesQuery, EpisodesQueryVariables> {
    document = EpisodesDocument;
    
  }
export const CreateEpisodeDocument = gql`
    mutation createEpisode($creator: EpisodeCreator!) {
  episodeMutation {
    createEpisode(creator: $creator) {
      id
      name
      airDate
      code
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateEpisodeGQL extends Apollo.Mutation<CreateEpisodeMutation, CreateEpisodeMutationVariables> {
    document = CreateEpisodeDocument;
    
  }
export const DeleteEpisodeDocument = gql`
    mutation deleteEpisode($id: Int!) {
  episodeMutation {
    deleteEpisode(id: $id)
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteEpisodeGQL extends Apollo.Mutation<DeleteEpisodeMutation, DeleteEpisodeMutationVariables> {
    document = DeleteEpisodeDocument;
    
  }
export const UpdateEpisodeDocument = gql`
    mutation updateEpisode($updater: EpisodeUpdater!) {
  episodeMutation {
    updateEpisode(updater: $updater) {
      id
      name
      airDate
      code
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateEpisodeGQL extends Apollo.Mutation<UpdateEpisodeMutation, UpdateEpisodeMutationVariables> {
    document = UpdateEpisodeDocument;
    
  }
export const GetEpisodeDocument = gql`
    query getEpisode($id: Int!) {
  episode(id: $id) {
    id
    name
    airDate
    code
    characters {
      id
      name
      status
      species
      gender
      originId
      locationId
      type
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEpisodeGQL extends Apollo.Query<GetEpisodeQuery, GetEpisodeQueryVariables> {
    document = GetEpisodeDocument;
    
  }
export const LocationsDocument = gql`
    query locations {
  locations(page: -1) {
    results {
      id
      name
      type
      dimension
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LocationsGQL extends Apollo.Query<LocationsQuery, LocationsQueryVariables> {
    document = LocationsDocument;
    
  }
export const CreateLocationDocument = gql`
    mutation createLocation($creator: LocationCreator!) {
  locationMutation {
    createLocation(creator: $creator) {
      id
      name
      type
      dimension
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateLocationGQL extends Apollo.Mutation<CreateLocationMutation, CreateLocationMutationVariables> {
    document = CreateLocationDocument;
    
  }
export const UpdateLocationDocument = gql`
    mutation updateLocation($updater: LocationUpdater!) {
  locationMutation {
    updateLocation(updater: $updater) {
      id
      name
      type
      dimension
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateLocationGQL extends Apollo.Mutation<UpdateLocationMutation, UpdateLocationMutationVariables> {
    document = UpdateLocationDocument;
    
  }
export const DeleteLocationDocument = gql`
    mutation deleteLocation($id: Int!) {
  locationMutation {
    deleteLocation(id: $id)
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteLocationGQL extends Apollo.Mutation<DeleteLocationMutation, DeleteLocationMutationVariables> {
    document = DeleteLocationDocument;
    
  }
export const GetLocationDocument = gql`
    query getLocation($id: Int!) {
  location(id: $id) {
    id
    name
    type
    dimension
    charactersWithOrigin {
      id
      name
      status
      species
      gender
      originId
      locationId
      type
    }
    charactersWithLocation {
      id
      name
      status
      species
      gender
      originId
      locationId
      type
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLocationGQL extends Apollo.Query<GetLocationQuery, GetLocationQueryVariables> {
    document = GetLocationDocument;
    
  }