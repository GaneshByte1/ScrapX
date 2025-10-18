export type ID = string & { readonly __brand: unique symbol }

export interface User {
  id: ID
  email: string
  name?: string
}
