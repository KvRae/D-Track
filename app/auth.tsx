import { KeyboardAvoidingView, Platform, View, StyleSheet, ImageBackground} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import React, {useState} from "react";
import {useAuth} from "@/lib/auth-context";
import {router} from "expo-router";

export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const theme = useTheme();

    const {signIn, signUp} = useAuth()

    const handleAuth = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
        }
        if (isSignUp) {
            await signUp(email, password).then((error) => {
                if (error) {
                    setError(error);
                }
            })
        } else {
            await signIn(email, password).then((error) => {
                if (error) {
                    setError(error);
                    return
                }
                router.replace("/(tabs)/home")
            })
        }
    }

    const handleSwitchMode = () => {
        setIsSignUp(!isSignUp);
    }




    return(
        <ImageBackground
            source={require("../assets/images/background-pattern.svg")}
            style={styles.container}
            imageStyle={styles.backgroundImage}
        >
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                variant="headlineMedium"
                style={styles.title}
                >
                    {isSignUp ? "Create an account" : "Welcome back"}
                </Text>
                <TextInput
                    style={styles.input}
                    label="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="Email"
                    mode={"outlined"}
                    onChangeText={email => setEmail(email)}
                    value={email}
                />

                <TextInput
                    style={styles.input}
                    label="Password"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="***********"
                    mode={"outlined"}
                    secureTextEntry
                    onChangeText={password => setPassword(password)}
                    value={password}
                />

                {error && <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text>}

                <Button
                    style={styles.button}
                    mode={"contained"}
                    onPress={handleAuth}
                >
                    {isSignUp ? "Sign Up" : "Log In"}
                </Button>

                <Button
                    mode={"text"}
                    onPress={handleSwitchMode}
                >
                    {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                </Button>
            </View>
        </KeyboardAvoidingView>
        </ImageBackground>
            )
}

const styles =
    StyleSheet.create({
        backgroundImage: {
            resizeMode: 'contain',
            opacity: 0.1,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
        },
        title: {
            fontSize: 24,
            marginBottom: 16,
            textAlign: "center",
        },
        input: {
            width: '100%',
            marginBottom: 16,
        },
        button: {
            width: '100%',
            marginTop: 16,
            padding: 8,
        }
    })
