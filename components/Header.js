import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../constants";

const Header = (props) => {
  return (
    <Text
      style={{ ...styles.header, fontFamily: "Tungsten-Bold", fontSize: 40 }}
    >
      DAY[9]TV DK30
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.day9Orange,
    fontFamily: "Tungsten-Bold",
    fontSize: 40,
    alignSelf: "center",
  },
});

export default Header;
