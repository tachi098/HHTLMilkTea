const { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } = require("react-native")
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLoginAction } from './../../store/actions/AuthAction'

const SignInScreen = ({ navigation }) => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [message, setMessage] = useState("");

    const onSubmit = (data) => {
        AuthLoginAction(data)(dispatch).then((res) => {
            if (Object.is(401, res.error)) {
                setMessage("Tài khoản hoặc mật khẩu không đúng");
                return;
            }
            if (res.roles.includes("ROLE_ADMIN")) {
                setMessage("Tài khoản hoặc mật khẩu không đúng");
                return;
            }
            if (res.roles.includes("ROLE_USER")) {
                AsyncStorage.setItem("user", JSON.stringify(auth.user));
                AsyncStorage.removeItem("groupMember");
                AsyncStorage.removeItem("member");
                navigation.navigate("HomeScreen")
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Login</Text>
            <View style={styles.inputView} >
                <Controller
                    style={styles.inputText}
                    placeholderTextColor="#003f5c"
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            placeholder="Enter Username"
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="username"
                    rules={{ required: true }}
                    defaultValue=""
                />
            </View>
            {errors.username && <Text style={{ color: 'red', marginBottom: 10 }}>Username is required.</Text>}
            <View style={styles.inputView} >
                <Controller
                    style={styles.inputText}
                    placeholderTextColor="#003f5c"
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            placeholder="Enter Password"
                            secureTextEntry={true}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="password"
                    rules={{ required: true }}
                    defaultValue=""
                />
            </View>
            {errors.password && <Text style={{ color: 'red' }}>Password is required.</Text>}

            {message.length > 0 && <Text style={{ color: 'red', marginBottom: 10 }}>{message}</Text>}

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText} onPress={handleSubmit(onSubmit)}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#F9813A",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 25,
        height: 65,
        marginBottom: 10,
        justifyContent: "center",
        padding: 20,
        borderWidth: 1,
        borderColor: "#F9813A",
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#F9813A",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});

export default SignInScreen