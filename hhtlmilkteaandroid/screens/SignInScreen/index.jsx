const { View, Text, TextInput, TouchableOpacity, StyleSheet } = require("react-native")
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLoginAction } from './../../store/actions/AuthAction'
import { OrderFindAction } from "./../../store/actions/OrderAction"
import { GetWishlist } from "./../../store/actions/WishlistAction"

const SignInScreen = ({ navigation }) => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const onSubmit = () => {
        if (username !== "") {
            if (password !== "") {
                const data = { username: username, password: password };
                AuthLoginAction(data)(dispatch).then((res) => {
                    if (Object.is(401, res.error)) {
                        setMessage("Username or password not correct");
                        return;
                    }
                    if (res.roles.includes("ROLE_ADMIN")) {
                        setMessage("Username or password not correct");
                        return;
                    }
                    if (res.roles.includes("ROLE_USER")) {
                        OrderFindAction(res.id, `Bearer ${res?.token}`)(dispatch)
                        GetWishlist(res.username, `Bearer ${res?.token}`)(dispatch)
                        navigation.navigate("Home ")
                    }
                });
            } else {
                setMessage("Password must not be blank")
            }
        } else {
            setMessage("Username must not be blank")
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Login</Text>
            {message.length > 0 && <Text style={{ color: 'red', marginBottom: 10 }}>{message}</Text>}
            <View style={styles.inputView} >
                <TextInput
                    placeholder="Enter Username"
                    onChangeText={value => setUsername(value)}
                />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry={true}
                    placeholder="Enter password"
                    onChangeText={value => setPassword(value)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={onSubmit}>
                <Text style={styles.loginText} >LOGIN</Text>
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
        marginBottom: 20
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
        marginTop: 20,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});

export default SignInScreen