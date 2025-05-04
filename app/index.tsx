import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";
import { auth , db } from '../app/firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false); 

    const signIn = async () => {
        if (!email || !password) {
            Alert.alert("Ha ocurrido un error", "Completa todos los campos");
            return;
        }

        setLoading(true); 
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                const currentStreak = userData.sessionStreak || 0;
                const updatedStreak = currentStreak + 1;

                await updateDoc(userDocRef, {
                    sessionStreak: updatedStreak,
                });
            } 

            router.push("/(tabs)"); 
        } catch (error: any) {
            let errorMessage = error.message;
            if (error.code === 'auth/user-not-found') {
                errorMessage = "El correo electrónico no está registrado";
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = "La contraseña es incorrecta";
            }
            Alert.alert("Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

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

            <TouchableOpacity
                style={styles.loginButton}
                onPress={signIn}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <>
                        <Text style={styles.loginText}>Iniciar sesión</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </>
                )}
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

            <TouchableOpacity style={[{marginTop: 30}]}
            onPress={() => router.push("/recover")}>
                
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
