import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProjectList = props => {
  return (
    <View>
      {props.projects.map(project => {
        return (
          <View key={project.projectId}>
            <Text>{project.projectName}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ProjectList;
