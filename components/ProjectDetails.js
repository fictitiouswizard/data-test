import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faStar,
  faHashtag,
  faCalendar,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import HTML from "react-native-render-html";
import { AppContext, AppContextProvider } from "../AppContext";

const ProjectDetails = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const {
    projectName,
    user,
    category,
    event,
    hearts,
    stars,
    description,
  } = state.selectedProject;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={{
            backgroundColor: colors.secondaryBackground,
            margin: 10,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: colors.text, fontSize: 25 }}>
            {projectName}
          </Text>
          <View style={{ ...styles.iconView, marginRight: "auto" }}>
            <FontAwesomeIcon
              style={{ color: colors.text }}
              icon={faUserCircle}
            />
            <Text style={{ color: colors.text, marginLeft: 5 }}>{user}</Text>
          </View>
          <View style={{ ...styles.iconView, marginRight: "auto" }}>
            <FontAwesomeIcon style={{ color: colors.text }} icon={faHashtag} />
            <Text style={{ color: colors.text, marginLeft: 5 }}>
              {category}
            </Text>
          </View>
          <View style={{ ...styles.iconView, marginRight: "auto" }}>
            <FontAwesomeIcon style={{ color: colors.text }} icon={faCalendar} />
            <Text style={{ color: colors.text, marginLeft: 5 }}>{event}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconView}>
              <FontAwesomeIcon style={{ color: colors.text }} icon={faHeart} />
              <Text style={{ color: colors.text, marginLeft: 5 }}>
                {hearts}
              </Text>
            </View>
            <View style={styles.iconView}>
              <FontAwesomeIcon style={{ color: colors.text }} icon={faStar} />
              <Text style={{ color: colors.text, marginLeft: 5 }}>{stars}</Text>
            </View>
          </View>
          <Text style={{ color: colors.text }}>Description:</Text>
          <HTML
            baseFontStyle={{ color: colors.text }}
            html={description}
            imagesMaxWidth={Dimensions.get("window").width}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconView: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProjectDetails;
