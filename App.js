import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

import { useFonts } from "@use-expo/font";
import { fetchProjects } from "./api";
import ProjectList from "./components/ProjectList";
import { colors } from "./constants";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingAdditionalProjects, setLoadingAdditionalProjects] = useState(
    false
  );
  const [distance, setDistance] = useState(0);

  const [isLoaded] = useFonts({
    "Tungsten-Bold": require("./assets/fonts/Tungsten-Bold.ttf"),
    "Tungsten-Book": require("./assets/fonts/Tungsten-Book.ttf"),
  });

  useEffect(() => {
    fetchProjects(pageNumber).then((projects) => {
      setProjects(projects);
      setLoadingProjects(false);
    });
  }, [loadingProjects]);

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

  if (!isLoaded || loadingProjects) {
    return (
      <View>
        <Text>Loading... :-(</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontFamily: "Tungsten-Bold", fontSize: 40 }}>
            DAY[9]TV DK30
          </Text>
        </View>
        <View style={styles.content}>
          <ProjectList
            projects={projects}
            endReachedHandler={endReachedHandler}
            loadingAdditionalProjects={loadingAdditionalProjects}
          />
        </View>
      </View>
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
  header: {
    flex: 1,
    paddingTop: 30,
    width: "100%",
    backgroundColor: colors.day9Orange,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Tungsten-Bold",
    fontSize: 40,
  },
  content: {
    width: "100%",
    flex: 7,
  },
  Button: {
    padding: 20,
    width: "30%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    margin: "auto",
  },
  Buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});
