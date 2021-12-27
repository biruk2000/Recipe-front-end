import { gql } from "@apollo/client/core";

export const ADD_FAVORITE = gql`
  mutation ($recipe_id: Int!, $user_id: uuid!) {
    insert_Favorites_one(object: { recipe_id: $recipe_id, user_id: $user_id }) {
      recipe_id
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation ($recipe_id: Int!, $user_id: uuid!) {
    delete_Favorites(
      where: {
        user_id: { _eq: $user_id }
        _and: { recipe_id: { _eq: $recipe_id } }
      }
    ) {
      returning {
        id
        user_id
        recipe_id
      }
    }
  }
`;

export const USER_FAVORITES = gql`
  query ($userId: uuid!) {
    Favorites(where: { user_id: { _eq: $userId } }) {
      id
      Recipe {
        id
        title
        noServant
        prepTime
        description
      }
    }
  }
`;

export const USER_FAVORITES_RECIPE_IDS = gql`
  query ($userId: uuid!) {
    Favorites(where: { user_id: { _eq: $userId } }) {
      recipe_id
    }
  }
`;
