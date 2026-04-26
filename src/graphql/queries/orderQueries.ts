import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $customerName: String!
    $customerPhone: String!
    $customerEmail: String!
    $shippingAddress: String!
    $items: [OrderItemInput!]!
  ) {
    createCustomerOrder(
      customerName: $customerName
      customerPhone: $customerPhone
      customerEmail: $customerEmail
      shippingAddress: $shippingAddress
      items: $items
    ) {
      order {
        id
        orderNumber
        status
        finalAmount
        customerName
        items {
          quantity
          priceAtOrder
          subtotal
          product {
            name
            unit
            measureValue
            images {
              image
            }
          }
        }
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    allOrders {
      id
      orderNumber
      status
      totalAmount
      items {
        quantity
        subtotal
        product {
          name
          unit
          measureValue
          images {
            image
          }
        }
      }
    }
  }
`;

export const GET_ORDER_TRACKING = gql`
  query GetOrderTracking($orderId: Int!) {
    orderTracking(orderId: $orderId) {
      status
      notes
      updatedAt
      date
      time
    }
  }
`;


export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: Int!) {
    order(id: $id) {
      id
      orderNumber
      status
      totalAmount
      finalAmount
      createdAt

      customer {
        id
        firstName
        lastName
        email
        phone
      }

      items {
        quantity
        subtotal
        product {
          id
          name
          price
          discountPrice
          unit
          measureValue
          images {
            image
          }
        }
      }
    }
  }
`;