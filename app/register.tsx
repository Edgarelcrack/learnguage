import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";
// Firebase imports
import { auth, db } from '../app/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


export default function Register() {

    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const router = useRouter();
    
    const handleRegister = async () => {

        if (!email || !password || !name || !lastName || !confirmPassword || !age) {
            Alert.alert("Error", "Completa todos los campos");
            return;
          }
        
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            Alert.alert("Error", "Ingresa un correo electrónico válido");
            return;
          }

          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
          if (!passwordRegex.test(password)) {
            Alert.alert(
              "Contraseña insegura",
              "Debe tener al menos:\n- 6 caracteres\n- 1 letra\n- 1 número\n- 1 símbolo (@$!%*#?&)"
            );
            return;
          }
        
          if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
          }
        
          if (age && (isNaN(parseInt(age)) || parseInt(age) < 3 || parseInt(age) > 18)) {
            Alert.alert("Error", "La edad debe ser entre 5 y 18 años");
            return;
          }

        

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email,
                name,
                lastName,
                age,
                createdAt: new Date(),
            });

            Alert.alert("Éxito", "Cuenta creada exitosamente");
            router.back();
        } catch (error: any) {
            let errorMessage = error.message;
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "El correo electrónico ya está en uso";}
            Alert.alert("Error", errorMessage);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.text}>Y explora con nosotros el mundo de los idiomas</Text>
            
            <TextInput
                style={styles.inputText}
                onChangeText={setEmail}
                value={email}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.inputText}
                onChangeText={setName}
                value={name}
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
                keyboardType="numeric"
            />

            <TextInput
                style={styles.inputPassword}
                onChangeText={setPassword}
                value={password}
                placeholder="Contraseña"
                secureTextEntry
            />

            <TextInput
                style={styles.inputPassword}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirma Contraseña"
                secureTextEntry
            />

            <TouchableOpacity 
                style={styles.createButton}
                onPress={handleRegister}
            >
                <Ionicons name="checkmark" size={24} color="white" />
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