import React from 'react'
import { Button } from '@acme/ui'
import { greet } from '@acme/utils'

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Admin</h1>
      <p>{greet('Admin')}</p>
      <Button label="Click me" />
    </main>
  )
}
