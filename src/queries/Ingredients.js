import { gql } from "@apollo/client/core";

export const INSERT_INGREDIENTS =  gql`
mutation($name: String!, $unit: String!, $amount: Float!, $recepi_id: Int!) {
  insert_Ingredients_one(object: {name: $name, unit: $unit, amount: $amount, recepi_id: $recepi_id}) {
    id
    amount
    name
    recepi_id
    unit
  }
}
`;