import { gql } from "@apollo/client";

export const ALL_PEOPLE = gql`
  query allPeople($after: String) {
    allPeople(first: 5, after: $after) {
      pageInfo {
        endCursor
      }
      people {
        id
        name
        birthYear
        homeworld {
          name
        }
      }
    }
  }
`;

export const PERSON_DETAILS = gql`
  query personDetail($ID: ID) {
    person(id: $ID) {
      id
      name
      birthYear
      eyeColor
      gender
      hairColor
      height
      mass
      homeworld {
        name
      }
      starshipConnection {
        starships {
          id
          name
          model
          crew
          passengers
        }
      }
      species {
        name
      }
    }
  }
`;
