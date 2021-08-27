import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import SignInScreen from '../screens/SignInScreen';
import { useSelector } from 'react-redux';
import UserDetailScreen from '../screens/UserDetailScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    const auth = useSelector((state) => state.auth);
    const { quantity } = useSelector((state) => state.order);

    return (
        <Tab.Navigator
            options={{
                style: {
                    height: 55,
                    borderTopWidth: 0,
                    elevation: 0,
                },
                showLabel: false,
            }}
        >
            <Tab.Screen
                name="Home "
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home-filled" color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="shopping-cart" color={color} size={28} />
                    ),
                    tabBarBadge: auth?.user?.token ? quantity : "0"
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="favorite" color={color} size={28} />
                    ),
                }}
            />
            {auth?.user?.token ? (
                <Tab.Screen
                    name="User"
                    component={UserDetailScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="face" color={color} size={28} />
                        ),
                    }}
                />
            ) : (
                <Tab.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="face" color={color} size={28} />
                        ),
                    }}
                />
            )}

        </Tab.Navigator>
    );
};

export default BottomNavigator;
