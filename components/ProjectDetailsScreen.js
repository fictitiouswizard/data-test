import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchProject } from "../api";
import { colors } from "../constants";
import ProjectDetails from "./ProjectDetails";
import UpdateCardList from "./UpdateCardList";
import { AppContext, AppContextProvider, actions } from "../AppContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const ProjectDetailsScreen = ({ route, navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const { isSelectedProjectLoading } = state;

  useEffect(() => {
    dispatch({
      type: actions.PROJECT_DETAILS_LOADING,
    });
    fetchProject(route.params.projectId).then((_project) => {
      dispatch({
        type: actions.LOAD_SELECTED_PROJECT,
        data: {
          project: _project,
        },
      });
    });
  }, []);

  if (isSelectedProjectLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.backgroundColor,
        }}
      >
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Details" component={ProjectDetails} />
      <Tab.Screen name="Updates" component={UpdateCardList} />
    </Tab.Navigator>
    // <ProjectDetails
    //   name={project.name}
    //   user={project.user}
    //   category={project.category}
    //   event={project.event}
    //   hearts={project.hearts}
    //   stars={project.stars}
    //   description={project.description}
    // />
    // <UpdateCardList updateCards={project.updateCards} />
  );
};

export default ProjectDetailsScreen;
