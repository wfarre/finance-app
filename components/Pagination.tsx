import { kColors } from "@/app-example/constants/theme";
import { Transaction } from "@/models/Transaction";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PaginationButton from "./PaginationButton";

interface Props {
  currentPage: number;
  items: Transaction[][] | null;
  setCurrentPage: (newCurrentPage: number) => void;
}

const Pagination = (props: Props) => {
  const setPrevPage = () => {
    if (props.currentPage > 0) {
      props.setCurrentPage(props.currentPage - 1);
    }
  };

  const setNextPage = () => {
    if (props.items && props.currentPage < props.items?.length - 1) {
      props.setCurrentPage(props.currentPage + 1);
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 48,
        position: "fixed",
      }}
    >
      <Pressable style={[styles.paginationBtn]} onPress={setPrevPage}>
        <FontAwesome name="chevron-left" size={24} color="black" />
      </Pressable>
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        {props.items?.map((_, index) => {
          if (
            index === props.currentPage ||
            index === props.currentPage - 1 ||
            index === props.currentPage + 1 ||
            (props.items && index === props.items.length - 1)
          )
            return (
              <PaginationButton
                key={"pagination-btn" + index}
                index={index}
                currentPage={props.currentPage}
                transactions={props.items}
                onPress={() => props.setCurrentPage(index)}
              />
            );
        })}
      </View>
      <Pressable style={[styles.paginationBtn]} onPress={setNextPage}>
        <FontAwesome name="chevron-right" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Pagination;

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
