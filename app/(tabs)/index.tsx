import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ANIMALES</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startText}>START ▶</Text>
          </TouchableOpacity>
        </View>

        <Category title="DULCES - SWEETS" color="#A54444" />
        <Category title="COMIDA - FOOD" color="#222" />
        <Category title="Palabras elementales - Elemental words" color="#2A5EA5" />
      </ScrollView>
    </View>
  );
};

type CategoryProps = {
  title: string;
  color: string;
};

const Category: React.FC<CategoryProps> = ({ title, color }) => (
  <View style={styles.categoryWrapper}>
    <Text style={styles.categoryTitle}>{title}</Text>
    <View style={styles.categoryRow}>
      <TouchableOpacity style={[styles.categoryBox, { backgroundColor: color }]} />
      <TouchableOpacity style={[styles.categoryBox, { backgroundColor: color }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0057FF",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "#00F7FF",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  startText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryWrapper: {
    margin: 10,
  },
  categoryTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryBox: {
    flex: 1,
    height: 80,
    margin: 5,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#001A4D",
    paddingVertical: 10,
  },
  navItem: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default App;
