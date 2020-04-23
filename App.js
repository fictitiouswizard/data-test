import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "@use-expo/font";
import { fetchProjects } from "./api";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import Header from "./components/Header";
import { colors } from "./constants";
import AppContext from "./AppContext";

const Stack = createStackNavigator();

export default function App() {
  const [projects, setProjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [loadingAdditionalProjects, setLoadingAdditionalProjects] = useState(
    false
  );
  const [distance, setDistance] = useState(0);

  const [isLoaded] = useFonts({
    "Tungsten-Bold": require("./assets/fonts/Tungsten-Bold.ttf"),
    "Tungsten-Book": require("./assets/fonts/Tungsten-Book.ttf"),
  });

  useEffect(() => {
    fetchProjects(pageNumber, searchString).then((projects) => {
      setProjects(projects);
      setLoadingProjects(false);
    });
  }, [loadingProjects, searchString]);

  const endReachedHandler = ({ distanceFromEnd }) => {
    const nextPage = pageNumber + 1;
    setLoadingAdditionalProjects(true);
    fetchProjects(nextPage).then((_projects) => {
      setProjects([...projects, ..._projects]);
      setPageNumber(nextPage);
      setLoadingAdditionalProjects(false);
    });

    setDistance(distanceFromEnd);
  };

  const searchHandler = (text) => {
    setSearchString(text);
  };

  if (!isLoaded || loadingProjects) {
    return (
      <View style={styles.header}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <AppContext.Provider
        value={{
          projects,
          endReachedHandler,
          loadingAdditionalProjects,
          searchHandler,
          searchString,
        }}
      >
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
            <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
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
