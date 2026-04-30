import { gql } from "@apollo/client";

/* ================= PRODUCTS ================= */

export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $first: Int!, $after: String) {
    products(first: $first, after: $after, search: $search) {
      products {
        id
        name
        price
        discountPrice
        description
        sku
        isActive
        isWishlisted
        unit
        measureValue
        isFeatured
        isAddedcart

        category {
          id
          name
        }

        images {
          image
        }
        stock {
          quantity
          reservedQuantity
          availableQuantity
          isOutOfStock
        }
      }
      categories {
        id
        name
        image
      }
      nextCursor
      hasMore
    }
  }
`;

/* ================= PRODUCT DETAIL ================= */

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($search: String!) {
    products(first: 1, search: $search) {
      products {
        id
        name
        price
        discountPrice
        description
        unit
        measureValue

        images {
          image
        }

        category {
          id
          name
        }
        stock {
          quantity
          reservedQuantity
          availableQuantity
          isOutOfStock
        }
      }
    }
  }
`;

/* ================= STOCK ================= */

export const GET_STOCK = gql`
  query GetStock($productId: Int!) {
    stock(productId: $productId) {
      quantity
      reservedQuantity
      availableQuantity
    }
  }
`;
