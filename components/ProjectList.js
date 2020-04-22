import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Alert } from "react-native";

import ProjectItem from "./ProjectItem";

const ProjectList = props => {
  const onPressHandler = alertText => {
    Alert.alert(alertText);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.content}>
        <FlatList
          style={{ height: "100%" }}
          data={props.projects}
          renderItem={({ item }) => (
            <ProjectItem project={item} onPress={onPressHandler} />
          )}
          keyExtractor={(item, index) => item.projectId}
          onEndReached={props.endReachedHandler}
          refreshing={props.loadingAdditionalProjects}
          initialNumToRender={2}
          onEndReachedThreshold={2}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1
  }
});

export default ProjectList;
