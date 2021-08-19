import type { OrdercloudCart } from '../../../types/cart'
import type { CartEndpoint } from '.'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  res,
  body: { cartId, ...rest },
}) => {
  console.log({ cartId, rest })

  if (!cartId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const cart: OrdercloudCart = await Promise.resolve({})

  console.log({ cart })

  res.status(200).json({ data: null, errors: [] })
}

export default getCart
