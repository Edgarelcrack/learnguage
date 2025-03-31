import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ExerciseScreen from "./ExerciseScreen"; 

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ANIMALES</Text>
          <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("Exercise")}>
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

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Category = ({ title, color }) => (
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
    backgroundColor: "#491778",
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
    backgroundColor: "#E78935",
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
});

export default App;
