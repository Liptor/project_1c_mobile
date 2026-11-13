import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import CatalogScreen from './screens/CatalogScreen';
import ItemScreen from './screens/ItemScreen';

const RootStack = createNativeStackNavigator({
  screens: {
    Catalog: {
      screen: CatalogScreen,
      options: {title: "Список номенклатуры"},
    },
    ItemScreen: {
      screen: ItemScreen,
      options: {title: "Создать новый товар"},
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
