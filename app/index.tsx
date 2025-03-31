import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={[styles.container]}>
            <Text style={styles.title}>Learnguage</Text>
            <Text style={styles.subtitle}>Aprende y explora tu imaginacion!</Text>
            
            <TextInput
                style={styles.inputText}
                onChangeText={setEmail}
                value={email}
                placeholder="Correo electrónico"
            />
            
            <TextInput
                style={styles.inputPassword}
                onChangeText={setPassword}
                value={password}
                placeholder="Contraseña"
            />

            <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/(tabs)")}>
                <Text style={styles.loginText}>Iniciar sesion</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>

            <Text style={[styles.text, { marginTop: 10 }]}>
                Pide ayuda a tus padres para iniciar con la experiencia
            </Text>

            <Text style={[styles.subtitle, { marginTop: 50 }, {color: "#2fb680"}, {fontWeight: "bold"}]}>
                ¿No tienes cuenta?
            </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.createAccount}>Crear cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[{marginTop: 30}]}onPress={() => router.push("/recover")}>
                <Text style={styles.createAccount}>Olvidaste tu Contraseña?</Text>
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
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle:{
        color: "#fff",
        fontSize: 20,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        marginTop: 10
    },
    loginButton: {
        backgroundColor: "#2fb680",
        flexDirection: "row",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        color: "#fff",
        marginRight: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    inputText: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 5,
        marginVertical: 25,
        width: "80%",
        fontSize: 16,
    },
    inputPassword: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 5,
        width: "80%",
        fontSize: 16,
    },
    createAccount: {
        color: "#fff",
        fontSize: 16,
        marginTop: 7,
        fontWeight: "bold",
    },

});