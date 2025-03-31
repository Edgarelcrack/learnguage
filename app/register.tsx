import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";

export default function Register() {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.text}>Y explora con nosotros el mundo de los idiomas</Text>
            
            <TextInput
                style={styles.inputText}
                onChangeText={setEmail}
                value={name}
                placeholder="Correo electrónico"
            />

            <TextInput
                style={styles.inputText}
                onChangeText={setName}
                value={email}
                placeholder="Nombres"
            />

            <TextInput
                style={styles.inputText}
                onChangeText={setLastName}
                value={lastName}
                placeholder="Apellidos"
            />

            <TextInput
                style={styles.inputText}
                onChangeText={setAge}
                value={age}
                placeholder="Edad"
            />

            
            <TextInput
                style={styles.inputPassword}
                onChangeText={setPassword}
                value={password}
                placeholder="Contraseña"
            />

            <TextInput
                style={styles.inputPassword}
                onChangeText={setPassword}
                value={password}
                placeholder="Confirma Contraseña"
            />



            <TouchableOpacity 
                style={styles.createButton}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.buttonText}>Crear cuenta</Text>
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
        marginVertical: 10,
        width: "80%",
        fontSize: 16,
    },
    inputPassword: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 5,
        width: "80%",
        fontSize: 16,
        marginVertical: 10,
    },
    createAccount: {
        color: "#fff",
        fontSize: 16,
        marginTop: 7,
        fontWeight: "bold",
    },
    createButton: {
        flexDirection: "row",
        backgroundColor: "#2fb680",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
    },

});