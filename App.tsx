import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';
import { store } from 'store';
import { App } from "./src/App";
const theme = {
  colors: {
    primary: 'black',
  }
}


export default function AppContainer() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  )
}