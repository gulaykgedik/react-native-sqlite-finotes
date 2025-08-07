import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './src/navigators/RootNavigator'
import { initializeDatabase } from './src/utils/db'
import { Provider } from 'react-redux'
import store from './src/redux/store'

const App = () => {

  useEffect(() => {

initializeDatabase();
  }, []);

  
  return (
  <Provider store={store}>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  </Provider>
  )
}

export default App