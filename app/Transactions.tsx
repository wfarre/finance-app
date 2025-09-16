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

import PaginationButton from "@/components/PaginationButton";
import TransactionCard from "@/components/TransactionCard";
import { Transaction, TransactionAPI } from "@/models/Transaction";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [dividedTransactions, setDividedTranctions] = useState<
    Transaction[][] | null
  >(null);

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
        const divTransactions = formattedTransactions.flatMap(
          (_: Transaction, index: number, self: Transaction[]) =>
            index % 10 ? [] : [self.slice(index, index + 10)]
        );

        setDividedTranctions(divTransactions);
        setTransactions(formattedTransactions);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(transactions);
    console.log(dividedTransactions?.[0]);
    // console.log(displayedTransactions);
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
        <FlatList
          style={{ flex: 1 }}
          data={dividedTransactions?.[currentPage] ?? []}
          keyExtractor={(item, index) => "transaction" + index}
          renderItem={({ item }) => {
            return (
              <TransactionCard
                name={item.name}
                category={item.category}
                amount={item.amount}
                date={item.date}
              />
            );
          }}
          ListFooterComponent={() => {
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
                <Pressable style={[styles.paginationBtn]}>
                  <FontAwesome name="chevron-left" size={24} color="black" />
                </Pressable>
                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                  {dividedTransactions?.map((_, index) => {
                    // if (
                    //   index === currentPage + 1 &&
                    //   index !== dividedTransactions.length - 1
                    // ) {
                    //   return (
                    //     <PaginationButton
                    //       key={"pagination-btn" + index}
                    //       index={index}
                    //       currentPage={currentPage}
                    //       onPress={() => setCurrentPage(index)}
                    //     />
                    //   );
                    // }
                    if (
                      index === currentPage ||
                      index === currentPage - 1 ||
                      index === currentPage + 1 ||
                      index === dividedTransactions.length - 1
                    )
                      return (
                        <PaginationButton
                          key={"pagination-btn" + index}
                          index={index}
                          currentPage={currentPage}
                          transactions={transactions}
                          onPress={() => setCurrentPage(index)}
                        />
                      );
                  })}
                </View>
                <Pressable style={[styles.paginationBtn]}>
                  <FontAwesome name="chevron-right" size={24} color="black" />
                </Pressable>
              </View>
            );
          }}
        />
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
    flex: 1,
    paddingTop: 24,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "white",
    borderRadius: 12,
    paddingBottom: 40,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
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

export default Transactions;
