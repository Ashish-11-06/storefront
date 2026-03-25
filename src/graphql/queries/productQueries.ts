export const GET_PRODUCTS = `
  query GetProducts {
    products {
      id
      name
      price
      slug
    }
  }
`;