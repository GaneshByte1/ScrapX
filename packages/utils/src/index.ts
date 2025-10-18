import type { User } from '@acme/types'

export function greet(name: string): string {
  return `Hello, ${name}!`
}

export function getDisplayName(user: User): string {
  return user.name ?? user.email
}
