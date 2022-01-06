import { gql } from "@apollo/client/core";

export const UPATE_RATING = gql`
  mutation (
    $ratingValue: Float!
    $totalUser: Int!
    $totalValue: Float!
    $recipeId: Int!
  ) {
    update_Ratings(
      _inc: { totalUser: $totalUser, totalValue: $totalValue }
      where: { recipe_id: { _eq: $recipeId } }
      _set: { ratingValue: $ratingValue }
    ) {
      returning {
        id
        ratingValue
        totalUser
        totalValue
        recipe_id
      }
    }
  }
`;

export const INSERT_RATING = gql`
  mutation (
    $recipeId: Int!
    $ratingValue: Float!
    $totalUser: Int!
    $totalValue: Float!
  ) {
    insert_Ratings_one(
      object: {
        ratingValue: $ratingValue
        totalUser: $totalUser
        totalValue: $totalValue
        recipe_id: $recipeId
      }
    ) {
      id
      ratingValue
      recipe_id
      totalUser
      totalValue
    }
  }
`;
