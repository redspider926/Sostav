import React from 'react';
import Navigation from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';

const Index = props => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Index;
