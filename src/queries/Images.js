import { gql } from "@apollo/client/core";

export const UPLOAD_RECIPE_IMAGE = gql`
  mutation ($image: String!, $folder: String!) {
    uploadImage(image: $image, folder: $folder) {
      path
    }
  }
`;

export const UPLOAD_USER_IMAGE = gql`
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

export const DELETE_IMAGE = gql`
  mutation ($id: Int!) {
    delete_RecipeImages_by_pk(id: $id) {
      id
    }
  }
`;
