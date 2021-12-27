import { gql } from "@apollo/client/core";

export const ADD_TO_BOOKMARK = gql`
  mutation ($recipe_id: Int!, $user_id: uuid!) {
    insert_BookMarks_one(object: { recipe_id: $recipe_id, user_id: $user_id }) {
      recipe_id
    }
  }
`;

export const REMOVE_FROM_BOOKMARK = gql`
  mutation ($recipe_id: Int!, $user_id: uuid!) {
    delete_BookMarks(
      where: {
        user_id: { _eq: $user_id }
        _and: { recipe_id: { _eq: $recipe_id } }
      }
    ) {
      returning {
        id
        recipe_id
        user_id
      }
    }
  }
`;
export const USER_BOOKMARK_RECIPES_IDS = gql`
  query ($userId: uuid!) {
    BookMarks(where: { user_id: { _eq: $userId } }) {
      recipe_id
    }
  }
`;
