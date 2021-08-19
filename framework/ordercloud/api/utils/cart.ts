import type { Cart, OrdercloudCart } from '../../types/cart'

export function formatCart(data: OrdercloudCart): Cart {
  console.log({ data })

  return {
    id: data.ID,
    customerId: data.FromUserID,
    email: data.FromUser.Email,
    createdAt: data.DateCreated,
    currency: {
      code: 'USD',
    },
    taxesIncluded: data.TaxCost === 0,
    lineItems: [],
    lineItemsSubtotalPrice: data.Subtotal,
    subtotalPrice: data.Subtotal,
    totalPrice: data.Total,
    discounts: [],
  }
}
