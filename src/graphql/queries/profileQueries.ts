import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetProfile {
    myCustomer {
      id
      user {
        firstName
        lastName
        email
        phone
      }
      addresses {
        id
        name
        phone
        city
        state
        pincode
        landmark   # ✅ added
        isDefault
      }
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phone: String!
  ) {
    updateCustomer(
      id: $id
      firstName: $firstName
      lastName: $lastName
      phone: $phone
    ) {
      customer {
        id
      }
    }
  }
`;

export const ADD_ADDRESS = gql`
  mutation AddShippingAddress(
    $name: String!
    $phone: String!
    $city: String!
    $state: String!
    $pincode: String!
    $landmark: String
    $isDefault: Boolean!
  ) {
    addShippingAddress(
      name: $name
      phone: $phone
      city: $city
      state: $state
      pincode: $pincode
      landmark: $landmark
      isDefault: $isDefault
    ) {
      addressId
    }
  }
`;

export const EDIT_ADDRESS = gql`
  mutation EditShippingAddress(
    $addressId: Int!
    $name: String!
    $phone: String!
    $city: String!
    $state: String!
    $pincode: String!
    $landmark: String
    $isDefault: Boolean!
  ) {
    editShippingAddress(
      addressId: $addressId
      name: $name
      phone: $phone
      city: $city
      state: $state
      pincode: $pincode
      landmark: $landmark
      isDefault: $isDefault
    ) {
      addressId
    }
  }
`;