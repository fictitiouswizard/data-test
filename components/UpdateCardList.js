import React, { useContext } from "react";
import { View } from "react-native";
import UpdateCard from "./UpdateCard";

import { AppContext } from "../AppContext";

const UpdateCardList = (props) => {
  const { state } = useContext(AppContext);
  const { selectedProject } = state;
  const updateCards = selectedProject.updateCards;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View>
          {updateCards.map((updateCard, index) => {
            return (
              <UpdateCard
                index={index}
                userName={updateCard.user.name}
                timeSpan={updateCard.timeSpan}
                content={updateCard.content}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateCardList;
