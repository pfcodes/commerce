import * as Core from '@commerce/types/cart'

export * from '@commerce/types/cart'

export type OrdercloudCart = {
  ID: 'FPRYMokxd06992HMIODKmw'
  FromUser: {
    ID: 'default-anonymous-shopper'
    Username: 'anonymous-shopper'
    Password: null
    FirstName: 'anonymous'
    LastName: 'shopper'
    Email: 'fake@emai.com'
    Phone: null
    TermsAccepted: null
    Active: true
    xp: {
      something: 'else'
    }
    AvailableRoles: null
    DateCreated: '2021-08-11T17:35:29.663+00:00'
    PasswordLastSetDate: null
  }
  FromCompanyID: 'solitary-storefront'
  ToCompanyID: 'obJP2xTmH48jcat5'
  FromUserID: 'default-anonymous-shopper'
  BillingAddressID: null
  BillingAddress: null
  ShippingAddressID: null
  Comments: null
  LineItemCount: 0
  Status: 'Unsubmitted'
  DateCreated: '2021-08-18T17:12:47.26+00:00'
  DateSubmitted: null
  DateApproved: null
  DateDeclined: null
  DateCanceled: null
  DateCompleted: null
  LastUpdated: '2021-08-18T17:12:47.32+00:00'
  Subtotal: 0
  ShippingCost: 0
  TaxCost: 0
  PromotionDiscount: 0
  Total: 0
  IsSubmitted: false
  xp: {
    productId: 'mens-intrigue-active-shorts'
    variantId: 'mens-intrigue-active-shorts-mysterious-mint-L'
    quantity: 1
  }
}

/**
 * Extend core cart types
 */

export type Cart = Core.Cart & {
  lineItems: Core.LineItem[]
  url?: string
}

export type CartTypes = Core.CartTypes

export type CartHooks = Core.CartHooks<CartTypes>

export type GetCartHook = CartHooks['getCart']
export type AddItemHook = CartHooks['addItem']
export type UpdateItemHook = CartHooks['updateItem']
export type RemoveItemHook = CartHooks['removeItem']

export type CartSchema = Core.CartSchema<CartTypes>

export type CartHandlers = Core.CartHandlers<CartTypes>

export type GetCartHandler = CartHandlers['getCart']
export type AddItemHandler = CartHandlers['addItem']
export type UpdateItemHandler = CartHandlers['updateItem']
export type RemoveItemHandler = CartHandlers['removeItem']
