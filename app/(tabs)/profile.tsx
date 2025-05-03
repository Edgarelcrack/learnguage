import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseconfig"; 
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();

            // Lógica de racha
            const updatedData = await calculateStreak(data);
            const learnedWords = data.learnedWords || {}; 
            const totalWords = Object.keys(learnedWords).length;
            data.nivel = determineLanguageLevel(totalWords);
            setUserData(updatedData); 
          } else {
            console.log("No hay datos del usuario en Firestore.");
          }
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();

    const intervalId = setInterval(() => {
      loadUserData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const determineLanguageLevel = (totalWords: number): string => {
    if (totalWords < 10) return "Principiante";
    if (totalWords >= 10 && totalWords < 20) return "Casual";
    if (totalWords >= 20 && totalWords < 30) return "Experimentado";
    return "Avanzado";
  };

  // Lógica de rachas
  const calculateStreak = async (data: any) => {
    const today = new Date().toISOString().split("T")[0]; 
    const lastLogin = data.lastLogin || today; 
    let rachaActual = data.rachaActual || 0;
    let mejorRacha = data.mejorRacha || 0;

    if (lastLogin === today) {
      return data;
    }

    const lastDate = new Date(lastLogin);
    const diffDays = Math.floor((new Date(today).getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      rachaActual += 1;
      mejorRacha = Math.max(mejorRacha, rachaActual);
    } else if (diffDays > 1) {
      rachaActual = 0;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          rachaActual,
          mejorRacha,
          lastLogin: today,
        });
        console.log("Datos actualizados correctamente en Firestore");
      } catch (error) {
        console.error("Error al actualizar datos en Firestore:", error);
      }
    }

    return { ...data, rachaActual, mejorRacha, lastLogin: today };
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profileText}>Perfil</Text>
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={() => navigation.navigate("Configuracion" as never)}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: userData?.foto || "https://via.placeholder.com/50" }} 
          style={styles.profileImage}
        />
      </View>
      <View style={styles.infoContainer}>
        <InfoRow label="Nombre" value={`${userData?.name || ""} ${userData?.lastName || ""}`} />
        <InfoRow label="Correo" value={userData?.email || "No disponible"} />
        <InfoRow label="Edad" value={userData?.age || "No disponible"} />
        <InfoRow label="Nivel de idioma" value={userData?.nivel || "No disponible"} />
        <InfoRow label="Racha actual" value={`${userData?.rachaActual || 0}`} />
        <InfoRow label="Mejor racha" value={`${userData?.mejorRacha || 0}`} />
      </View>
    </View>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#491778",
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
