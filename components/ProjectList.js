import React from "react";
import ReactNative, {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faStar,
  faHashtag,
  faCalendar,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import { colors } from "../constants";

const ProjectItem = (props) => {
  const { project } = props;
  return (
    <TouchableOpacity onPress={() => props.onPress(project.projectName)}>
      <View style={styles.projectCard}>
        <Text style={styles.text}>{project.projectName}</Text>
        <TouchableOpacity
          style={{ ...styles.iconView, marginRight: "auto" }}
          onPress={() => props.onPress(project.user.name)}
        >
          <FontAwesomeIcon
            style={{ color: colors.day9Orange }}
            icon={faUserCircle}
          />
          <Text style={{ color: colors.day9Orange }}>{project.user.name}</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{ ...styles.iconView, marginRight: "auto" }}
            onPress={() => props.onPress(project.category.name)}
          >
            <FontAwesomeIcon
              style={{ color: colors.day9Orange }}
              icon={faHashtag}
            />
            <Text style={{ color: colors.day9Orange }}>
              {project.category.name}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.iconView, marginRight: "auto" }}>
          <FontAwesomeIcon style={{ color: colors.text }} icon={faCalendar} />
          <Text style={{ color: colors.text }}>{project.eventName}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.iconView}>
            <FontAwesomeIcon style={{ color: colors.text }} icon={faHeart} />
            <Text style={{ color: colors.text, marginLeft: 5 }}>
              {project.hearts}
            </Text>
          </View>
          <View style={styles.iconView}>
            <FontAwesomeIcon style={{ color: colors.text }} icon={faStar} />
            <Text style={{ color: colors.text, marginLeft: 5 }}>
              {project.stars}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProjectList = (props) => {
  const onPressHandler = (alertText) => {
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
          //onEndReachedThreshold={5}
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
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  iconView: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProjectList;
