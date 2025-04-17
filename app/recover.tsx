import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RecoverPassword() {
    const router = useRouter();
    const [email, setEmail] = React.useState('');

    const handleRecoverPassword = () => {
        if (!email) {
            Alert.alert("Error", "Por favor, ingresa tu correo electrónico.");
            return;
        }
        // Simulate password recovery process
        Alert.alert("Recuperación de contraseña", "Se ha enviado un enlace de recuperación a tu correo.");
        router.back();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <Text style={styles.subtitle}>Ingresa tu correo electrónico para recuperar tu contraseña</Text>
            
            <TextInput
                style={styles.inputText}
                onChangeText={setEmail}
                value={email}
                placeholder="Correo electrónico"
                keyboardType="email-address"
            />

            <TouchableOpacity style={styles.recoverButton} onPress={handleRecoverPassword}>
                <Text style={styles.recoverText}>Recuperar Contraseña</Text>
                <Ionicons name="mail" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => router.back()}>
                <Text style={styles.backToLogin}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#491778",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 30,
    },
    inputText: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 5,
        width: "100%",
        fontSize: 16,
        marginBottom: 20,
    },
    recoverButton: {
        backgroundColor: "#2fb680",
        flexDirection: "row",
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    recoverText: {
        color: "#fff",
        marginRight: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    backToLogin: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});