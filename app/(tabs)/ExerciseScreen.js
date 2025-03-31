import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

const ExerciseScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.question}>¿Cómo se dice "Perro" en inglés?</Text>
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Dog </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Elephant</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} 
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  options: {
    width: "80%",
  },
  option: {
    backgroundColor: "#E78935",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  optionText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#491778",
    borderRadius: 10,
  },
  backText: {
    color: "white",
    fontSize: 16,
  },
});

export default ExerciseScreen;
