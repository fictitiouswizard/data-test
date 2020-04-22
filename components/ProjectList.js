import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { colors } from "../constants";

const ProjectItem = (props) => {
  const { project } = props;
  return (
    <View style={styles.projectCard}>
      <Text style={styles.text}>{project.projectName}</Text>
      <Text style={{ color: colors.text }}>{project.user.name}</Text>
      <Text style={{ color: colors.text }}>{project.category.name}</Text>
      <Text style={{ color: colors.text }}>{project.eventName}</Text>
      <Text style={{ color: colors.text }}>
        <FontAwesomeIcon icon="heart" />
        {project.hearts}
      </Text>
      <Text style={{ color: colors.text }}>
        <FontAwesomeIcon icon="star" />
        {project.stars}
      </Text>
    </View>
  );
};

const ProjectList = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.content}>
        <FlatList
          style={{ height: "100%" }}
          data={props.projects}
          renderItem={({ item }) => <ProjectItem project={item} />}
          keyExtractor={(item, index) => item.projectId}
          onEndReached={props.endReachedHandler}
          refreshing={props.loadingAdditionalProjects}
          onEndReachedThreshold={3}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  projectCard: {
    backgroundColor: colors.secondaryBackground,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: colors.day9Orange,
    //fontFamily: "Tungsten-Bold",
    fontSize: 15,
  },
  content: {
    flex: 1,
  },
});

export default ProjectList;
