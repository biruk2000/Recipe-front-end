import { gql } from "@apollo/client/core";

export const ADD_COMMENT = gql`
  mutation ($comment: String!, $recipe_id: Int!, $user_id: uuid!) {
    insert_Comments_one(
      object: { comment: $comment, recipe_id: $recipe_id, user_id: $user_id }
    ) {
      id
      comment
      date
      User {
        id
        user_name
      }
    }
  }
`;
