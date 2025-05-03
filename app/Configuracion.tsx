import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput} from "react-native";
import { auth, db } from '../app/firebaseconfig';
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        router.push("/");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setEditedName(docSnap.data().name || "");
        setEditedLastName(docSnap.data().lastName || "");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los datos");
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateName = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: editedName,
        lastName: editedLastName
      });

      setUserData({ ...userData, name: editedName, lastName: editedLastName });
      setIsEditing(false);
      Alert.alert("Éxito", "Datos actualizados correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la información");
    }
  };

  const renderNameField = () => {
    if (isEditing) {
      return (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.editInput}
            value={editedLastName}
            onChangeText={setEditedLastName}
            placeholder="Apellidos"
          />
        </View>
      );
    }
    return (
      <Text style={styles.value}>
        {userData?.name || "Sin nombre"} {userData?.lastName}
      </Text>
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Text style={{color: '#FFF'}}>Cargando...</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>

      {/* Imagen de perfil */}
      <View style={styles.section}>
        <Text style={styles.label}>Imagen</Text>
        <Ionicons name="person-circle" size={60} color="#FFD700" />
      </View>

      {/* Datos del usuario */}
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text style={styles.label}>Nombre completo</Text>
          {!isEditing ? (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Ionicons name="create-outline" size={24} color="#FFD700" />
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={handleUpdateName}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {renderNameField()}
      </View>


      <View style={styles.section}>
        <Text style={styles.label}>Edad</Text>
        <Text style={styles.value}>{userData?.age || "No especificada"}</Text>
      </View>

      {/* Sección cuenta */}
      <View style={styles.section}>
        <Text style={styles.header}>Cuenta</Text>
        <Text style={styles.email}>{auth.currentUser?.email}</Text>
        <Text style={styles.label}>Miembro desde:</Text>
        <Text style={styles.value}>
          {auth.currentUser?.metadata.creationTime?.split(' ')[0]}
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Sección idioma */}
      <View style={styles.section}>
        
      </View>
    </View>
  );
};

// Mantener los mismos estilos del archivo original

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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editContainer: {
    marginTop: 10,
  },
  editInput: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    width: "80%",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  saveButton: {
    backgroundColor: "#2fb680",
    padding: 8,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#ff4444",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  }

});

export default ProfileScreen;
