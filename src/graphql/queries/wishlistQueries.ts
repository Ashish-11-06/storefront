import { gql } from "@apollo/client";

export const GET_WISHLIST = gql`
  query GetWishlist {
    myWishlist {
      id
      product {
        id
        name
        price
        isAddedcart
        images {
          image
        }
      }
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($productId: Int!) {
    addToWishlist(productId: $productId) {
      wishlist {
        id
        product {
          id
          name
        }
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($productId: Int!) {
    removeFromWishlist(productId: $productId) {
      success
    }
  }
`;