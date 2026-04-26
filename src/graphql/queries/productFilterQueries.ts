import { gql } from "@apollo/client";

export const GET_FILTERED_PRODUCTS = gql`
  query GetFilteredProducts(
    $first: Int!
    $search: String
    $after: String
    $sortBy: String
    $isFeatured: Boolean
  ) {
    products(
      first: $first
      after: $after
      search: $search
      sortBy: $sortBy
      isFeatured: $isFeatured
    ) {
      products {
        id
        name
        price
        discountPrice
        isFeatured

        # ✅ REQUIRED FOR CARD LOGIC
        isWishlisted
        isAddedcart

        # ✅ REQUIRED FOR UI
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

      nextCursor
      hasMore
    }
  }
`;