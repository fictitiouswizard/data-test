import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import HTML from "react-native-render-html";
import { colors } from "../constants";

const UpdateCard = ({ index, userName, timeSpan, content }) => {
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
          <FontAwesomeIcon style={{ color: colors.text }} icon={faUserCircle} />
          <Text
            style={{
              color: colors.text,
              marginRight: "auto",
              padding: 5,
            }}
          >
            {userName}
          </Text>
        </View>
        <Text style={{ color: colors.text, marginLeft: "auto", padding: 5 }}>
          {timeSpan}
        </Text>
      </View>
      <HTML
        baseFontStyle={{ color: colors.text }}
        html={content}
        imagesMaxWidth={Dimensions.get("window").width - 40}
      />
    </View>
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

export default UpdateCard;
