import { kColors } from "@/app-example/constants/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import TransactionCard from "@/components/TransactionCard";
import { Transaction, TransactionAPI } from "@/models/Transaction";

const Transactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedTransactions, setDisplayedTranctions] = useState(null);

  // console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await fetch("./data.json");
        // const json = await data.json();
        // console.log(json);
        const json = require("./data.json");
        const formattedTransactions = json.transactions.map(
          (transaction: TransactionAPI) => new Transaction(transaction)
        );

        setTransactions(formattedTransactions);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(transactions);
    if (transactions && transactions?.length > 0) {
      const newTransactions = transactions.slice(
        currentPage * 10,
        currentPage * 10 + 10
      );
      setDisplayedTranctions(newTransactions);
    }
  }, [transactions, currentPage]);

  return (
    <View style={{ backgroundColor: kColors.beige100, flex: 1 }}>
      <Text style={styles.headerContainer}>Transactions</Text>
      <View style={styles.ListContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search transaction"
          />
          <Pressable>
            <FontAwesome name="filter" size={24} color="black" />
          </Pressable>
          <Pressable>
            <FontAwesome name="list-alt" size={24} color="black" />
          </Pressable>
        </View>
        <View style={{ marginTop: 24 }}>
          <FlatList
            data={displayedTransactions}
            renderItem={({ item }) => {
              // const itemImageSrc = `@${item.avatar.slice(1, 1)}`;
              // console.log(itemImageSrc);

              return (
                <TransactionCard
                  name={item.name}
                  category={item.category}
                  amount={item.amount}
                  date={item.date}
                />
              );
            }}
          ></FlatList>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    fontSize: 32,
    marginBottom: 32,
    paddingLeft: 16,
    paddingTop: 24,
  },
  ListContainer: {
    paddingTop: 24,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    padding: 12,
    paddingInline: 20,
    borderRadius: 8,
    borderColor: kColors.grey300,
  },
});

export default Transactions;
