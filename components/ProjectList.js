import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Alert } from "react-native";
import AppContext from "../AppContext";

import ProjectItem from "./ProjectItem";
import { colors } from "../constants";
import { TextInput } from "react-native-gesture-handler";

const ProjectList = ({ navigation }) => {
  const { state, endReachedHandler, searchHandler } = useContext(AppContext);
  const { searchString, projects, isLoadingAdditionalProjects } = state;

  const onPressHandler = ({ event, data }) => {
    if (event == "project") {
      navigation.navigate("ProjectDetails", {
        projectId: data.projectId,
      });
    } else {
      Alert.alert(data);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ height: 60 }}>
        <TextInput
          placeholder="Search..."
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            flex: 1,
            height: 100,
            borderWidth: 2,
            margin: 10,
            padding: 10,
          }}
          onChangeText={searchHandler}
          value={searchString}
        />
      </View>
      <SafeAreaView style={styles.content}>
        <FlatList
          style={{ height: "100%" }}
          data={projects}
          renderItem={({ item }) => (
            <ProjectItem project={item} onPress={onPressHandler} />
          )}
          keyExtractor={(item, index) => item.projectId}
          onEndReached={endReachedHandler}
          refreshing={isLoadingAdditionalProjects}
          initialNumToRender={2}
          onEndReachedThreshold={2}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ProjectList;
