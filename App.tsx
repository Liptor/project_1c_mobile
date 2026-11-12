/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useState, useEffect } from "react";
import { StatusBar, Text, FlatList, StyleSheet, useColorScheme, View, ActivityIndicator } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { getCatalog } from "./api/api";

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const result = await getCatalog();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCatalog()
  }, [])

  if (isLoading) {
     return <ActivityIndicator size="large" />;
  }


  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Список номенклатуры</Text>
      </View>

      <FlatList
        data={data}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) =>
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.name}. {item.article}</Text>
          </View>
        }
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
  },
  containerTitle: {
    alignItems: "center",
    padding: 35,
  },
  listContent: {
    gap: 13
  },
  itemContainer: {
    textAlign: 'center',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 23,
    fontWeight: "bold"
  },
  text: {
    textAlign: 'left',
  }
});


export default App;
