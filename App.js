import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "@use-expo/font";
import ProjectList from "./components/ProjectList";
import ProjectDetailsScreen from "./components/ProjectDetailsScreen";
import { colors } from "./constants";
import { AppContext, AppContextProvider } from "./AppContext";
import useDebounce from "./useDebounce";

const Stack = createStackNavigator();

export default function App() {
  const { state, fetchProjectsHandler } = useContext(AppContext);
  const dbdSearchString = useDebounce(state.searchString, 100);

  const [isLoaded] = useFonts({
    "Tungsten-Bold": require("./assets/fonts/Tungsten-Bold.ttf"),
    "Tungsten-Book": require("./assets/fonts/Tungsten-Book.ttf"),
  });

  useEffect(() => {
    fetchProjectsHandler(dbdSearchString);
  }, [dbdSearchString]);

  if (!isLoaded || state.isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.day9Orange }}>Loading...</Text>
      </View>
    );
  } else {
    return (
      <AppContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ProjectList"
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.day9Orange,
                height: 130,
              },
              headerTitle: "DAY[9]TV DK30",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: "Tungsten-Bold",
                fontSize: 40,
              },
            }}
          >
            <Stack.Screen name="ProjectList" component={ProjectList} />
            <Stack.Screen
              name="ProjectDetails"
              component={ProjectDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  content: {
    width: "100%",
    flex: 7,
  },
});
