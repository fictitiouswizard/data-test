import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

import { fetchProjects } from "./api";
import ProjectList from "./components/ProjectList";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchProjects(pageNumber).then(projects => {
      setProjects(projects);
    });
  }, [pageNumber]);

  const showReturnButton = pageNumber > 1;
  const previousButton = (
    <TouchableOpacity
      style={{ ...styles.Button, marginRight: "auto" }}
      title="Previous"
      onPress={() => {
        setPageNumber(pageNumber - 1);
      }}
    >
      <Text>Previous</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>DAY[9]TV DK30</Text>
      </View>
      <View style={styles.content}>
        <ProjectList projects={projects} />
        <View style={styles.Buttons}>
          {showReturnButton ? previousButton : null}
          <TouchableOpacity
            style={{ ...styles.Button, marginLeft: "auto" }}
            title="Next"
            onPress={() => {
              setPageNumber(pageNumber + 1);
            }}
          >
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  header: {
    flex: 3,
    paddingTop: 30
  },
  content: {
    width: "100%",
    flex: 7
  },
  Button: {
    padding: 20,
    width: "30%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    margin: "auto"
  },
  Buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  }
});
