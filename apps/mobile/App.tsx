import React from 'react'
import { Text, View } from 'react-native'
import { greet } from '@acme/utils'

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Expo Mobile</Text>
      <Text>{greet('Mobile')}</Text>
    </View>
  )
}
