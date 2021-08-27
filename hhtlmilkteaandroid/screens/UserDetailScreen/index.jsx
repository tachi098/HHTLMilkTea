import { Text, StyleSheet, View, TouchableOpacity } from "react-native"
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthLogoutAction } from "../../store/actions/AuthAction";

const UserDetailScreen = () => {

    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const onSignOut = () => {
        AuthLogoutAction()(dispatch)
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@user')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    return (
        <View style={styles.container}>
            <Text>Welcome, {auth?.user?.fullName}</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={onSignOut}>
                <Text style={styles.loginText} >Logout</Text>
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


export default UserDetailScreen