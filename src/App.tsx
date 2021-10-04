import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotifierWrapper } from 'react-native-notifier';

import { AppNavigator } from 'modules/navigation/navigators/app-navigator';

const client = new QueryClient();

/**
 * Renders the main app component
 */
export default function App() {
  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <NotifierWrapper>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </NotifierWrapper>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
