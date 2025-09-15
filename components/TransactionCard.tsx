import { kColors } from "@/app-example/constants/theme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  category: string;
  name: string;
  date: string;
  amount: string;
}

const TransactionCard = (props: Props) => {
  return (
    <View style={styles.card}>
      <Image
        source={require("@/assets/images/avatars/emma-richardson.jpg")}
        // source={require(props.avatar)}
        style={{
          borderRadius: 32,
          width: 32,
          height: 32,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.textBold}>{props.name}</Text>
        <Text style={styles.lightGrayText}>{props.category}</Text>
      </View>
      <View>
        <Text
          style={[
            styles.textBold,
            {
              textAlign: "right",
            },
            !props.amount.includes("-") && { color: kColors.green },
          ]}
        >
          {props.amount}
        </Text>
        <Text style={styles.lightGrayText}>{props.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 16,
    borderBottomColor: kColors.grey100,
    borderBottomWidth: 1,
  },
  textBold: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 14,
  },
  lightGrayText: {
    color: kColors.grey500,
    fontSize: 12,
  },
});

export default TransactionCard;
