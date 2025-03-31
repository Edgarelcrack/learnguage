import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Imagen</Text>
        <Image source={{ uri: "https://example.com/profile.jpg" }} style={styles.profileImage} />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>Username</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Cuenta</Text>
        <Text style={styles.label}>Inicia sesión y guarda tu progreso</Text>
        <Text style={styles.email}>username@gmail.com</Text>
        <TouchableOpacity>
          <Text style={styles.logout}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Estadísticas</Text>
        <Text style={styles.label}>Último respaldo</Text>
        <Text style={styles.value}>2025-03-30 20:11:17</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Ajustes</Text>
        <Text style={styles.label}>Nivel de idioma</Text>
        <Text style={styles.value}>Principiante</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4B0082",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#BBB",
  },
  value: {
    fontSize: 18,
    color: "#FFD700",
    fontWeight: "bold",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 5,
  },
  email: {
    color: "#CCC",
  },
  logout: {
    color: "#FFD700",
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default ProfileScreen;
