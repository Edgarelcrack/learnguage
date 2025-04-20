import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import sweets1 from '../data/sweets1Data';
import sweets2 from '../data/sweets2Data';
import fastFood from '../data/fastFoodData';
import healthyFood from '../data/healthyFoodData';
import basicWords from '../data/elementalWords1Data';
import basicWords2 from '../data/elementalWords2Data';
import Ecolors from '../data/Colors';

import { RootStackParamList } from './types'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const App = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ANIMALES</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate("ExerciseScreen", { data: Ecolors })}
          >
            <Text style={styles.startText}>START ▶</Text>
          </TouchableOpacity>
        </View>

        {/* DULCES */}
        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryTitle}>DULCES - SWEETS</Text>
          <View style={styles.categoryRow}>
            <TouchableOpacity
              style={[styles.categoryBox, { backgroundColor: "#A54444" }]}
              onPress={() => navigation.navigate("ExerciseScreen", { data: sweets1 })}
            >
              <Text style={styles.boxText}>Dulces 1</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.categoryBox, { backgroundColor: "#A54444" }]}
              onPress={() => navigation.navigate("ExerciseScreen", { data: sweets2 })}
            >
              <Text style={styles.boxText}>Dulces 2</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* COMIDA */}
        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryTitle}>COMIDA - FOOD</Text>
          <View style={styles.categoryRow}>
            <TouchableOpacity
              style={[styles.categoryBox, { backgroundColor: "#222" }]}
              onPress={() => navigation.navigate("ExerciseScreen", { data: fastFood })}
            >
              <Text style={styles.boxText}>Comida rapida</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.categoryBox, { backgroundColor: "#222" }]}
              onPress={() => navigation.navigate("ExerciseScreen", { data: healthyFood })}
            >
              <Text style={styles.boxText}>Comida saludable</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PALABRAS ELEMENTALES */}
        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryTitle}>Palabras elementales - Elemental words</Text>
          <View style={styles.categoryRow}>
            <TouchableOpacity
              style={[styles.categoryBox, { backgroundColor: "#2A5EA5" }]}
              onPress={() => navigation.navigate("ExerciseScreen", { data: basicWords })}
            >
              <Text style={styles.boxText}>Elemental 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.categoryBox, { backgroundColor: "#2A5EA5" }]}
              onPress={() => navigation.navigate("ExerciseScreen", { data: basicWords2 })}
            >
              <Text style={styles.boxText}>Elemental 2</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  boxText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
