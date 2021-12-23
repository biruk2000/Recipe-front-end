import { gql } from "@apollo/client/core";

export const UPLOAD_RECIPE_IMAGE = gql`
  mutation ($image: String!, $folder: String!) {
    uploadImage(image: $image, folder: $folder) {
      path
    }
  }
`;

export const INSER_RECIPE_IMAGE = gql`
  mutation ($path: String!, $recipeId: Int!) {
    insert_RecipeImages_one(object: { path: $path, recipe_id: $recipeId }) {
      id
      path
      recipe_id
    }
  }
`;