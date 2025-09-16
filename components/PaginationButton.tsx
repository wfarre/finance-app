import { kColors } from "@/app-example/constants/theme";
import { Transaction } from "@/models/Transaction";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  index: number;
  currentPage: number;
  onPress: () => void;
  transactions: Transaction[][] | null;
}

const PaginationButton = (props: Props) => {
  return (
    <Pressable
      style={[
        styles.paginationBtn,
        props.currentPage === props.index && styles.currentPaginationBtn,
      ]}
      onPress={() => props.onPress()}
    >
      <Text
        style={[
          props.currentPage === props.index && styles.currentPaginationBtn,
        ]}
      >
        {props.transactions &&
        props.index === props.currentPage + 1 &&
        props.index !== props.transactions?.length - 1
          ? "..."
          : props.index + 1}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  paginationBtn: {
    borderWidth: 1,
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  currentPaginationBtn: {
    backgroundColor: kColors.grey900,
    color: "white",
  },
});

export default PaginationButton;
