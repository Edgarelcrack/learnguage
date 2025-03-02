import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de instalar expo/vector-icons

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.profileText}>Perfil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Imagen de Perfil */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }} // Reemplaza con una imagen real
          style={styles.profileImage}
        />
      </View>

      {/* Lista de información */}
      <View style={styles.infoContainer}>
        <InfoRow label="Idioma" value="Inglés" />
        <InfoRow label="Nivel de idioma" value="Principiante" />
        <InfoRow label="Racha actual" value="0" />
        <InfoRow label="Mejor racha" value="0" />
      </View>
    </View>
  );
};

// Componente para filas de información
const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0057FF",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  settingsButton: {
    padding: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF",
  },
  infoContainer: {
    backgroundColor: "transparent",
    marginHorizontal: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  infoLabel: {
    color: "white",
    fontSize: 16,
  },
  infoValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
