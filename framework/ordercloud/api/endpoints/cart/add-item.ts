import type { CartEndpoint } from '.'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  res,
  body: { cartId, item },
  config: { fetch },
}) => {
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }
  if (!item.quantity) item.quantity = 1

  if (!cartId) {
    cartId = await fetch('POST', `/orders/Outgoing`, {}).then(
      (response: { ID: string }) => response.ID
    )
  }

  console.log({ cartId, item })

  const response = await fetch('POST', `/orders/Outgoing/${cartId}/lineitems`, {
    ProductID: item.productId,
    Quantity: item.quantity,
  })

  console.log({ response })

  // res.setHeader(
  //   'Set-Cookie',
  //   getCartCookie(config.cartCookie, data.id, config.cartCookieMaxAge)
  // )

  res.status(200).json({ data: null, errors: [] })
}

export default addItem
