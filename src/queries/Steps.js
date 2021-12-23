import { gql } from "@apollo/client/core";

export const INSERT_STEPS = gql`
mutation($step: String!, $recipe_id: Int!) {
  insert_Steps_one(object: {step: $step, recipe_id: $recipe_id}) {
    id
    step
    recipe_id
  }
}
`;