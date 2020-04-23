import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import HTML from "react-native-render-html";

import { fetchProject } from "../api";
import { colors } from "../constants";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faStar,
  faHashtag,
  faCalendar,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const ShowWebView = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ html: props.html }} originWhitelist={["*"]} />
    </View>
  );
};

const ProjectDetails = ({ route, navigation }) => {
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProject(route.params.projectId).then((_project) => {
      setProject(_project);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
            {project.projectName}
          </Text>
          <View style={{ ...styles.iconView, marginRight: "auto" }}>
            <FontAwesomeIcon
              style={{ color: colors.text }}
              icon={faUserCircle}
            />
            <Text style={{ color: colors.text }}>{project.user}</Text>
          </View>
          <View style={{ ...styles.iconView, marginRight: "auto" }}>
            <FontAwesomeIcon style={{ color: colors.text }} icon={faHashtag} />
            <Text style={{ color: colors.text }}>{project.category}</Text>
          </View>
          <View style={{ ...styles.iconView, marginRight: "auto" }}>
            <FontAwesomeIcon style={{ color: colors.text }} icon={faCalendar} />
            <Text style={{ color: colors.text }}>{project.event}</Text>
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
          <Text style={{ color: colors.text }}>Description:</Text>
          <HTML
            baseFontStyle={{ color: colors.text }}
            html={project.description}
            imagesMaxWidth={Dimensions.get("window").width}
          />
        </View>
        {project.updateCards.map((updateCard, index) => {
          return (
            <View
              key={index}
              style={{
                flex: 1,
                margin: 10,
                padding: 10,
                backgroundColor: colors.secondaryBackground,
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <View style={{ ...styles.iconView, marginRight: "auto" }}>
                  <FontAwesomeIcon
                    style={{ color: colors.text }}
                    icon={faUserCircle}
                  />
                  <Text
                    style={{
                      color: colors.text,
                      marginRight: "auto",
                      padding: 5,
                    }}
                  >
                    {updateCard.user.name}
                  </Text>
                </View>
                <Text
                  style={{ color: colors.text, marginLeft: "auto", padding: 5 }}
                >
                  {updateCard.timeSpan}
                </Text>
              </View>
              <HTML
                baseFontStyle={{ color: colors.text }}
                html={updateCard.content}
                imagesMaxWidth={Dimensions.get("window").width - 40}
              />
            </View>
          );
        })}
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
