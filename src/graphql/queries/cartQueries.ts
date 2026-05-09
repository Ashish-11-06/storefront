import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: Int!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      cart {
        id
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($cartItemId: Int!, $quantity: Int!) {
    updateCartItem(cartItemId: $cartItemId, quantity: $quantity) {
      cart {
        id
      }
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($cartItemId: Int!) {
    removeCartItem(cartItemId: $cartItemId) {
      cart {
        id
      }
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    myCart {
      items {
        id
        quantity
        product {
          id
          name
          price
          discountPrice
          isFeatured

          isWishlisted
          isAddedcart

          unit
          measureValue

          category {
            id
            name
            image
          }

          images {
            image
          }
        }
      }
    }
  }
`;
