import React, { useEffect } from "react";
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { checkUser } from "../redux/actions";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function BottomTabNav() {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUser());
    }, [dispatch]);

    if (isAuthenticated) {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "Account") {
                            iconName = focused ? "account" : "account-outline";
                        }

                        // You can return any component that you like here!
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: "#2089DC",
                    inactiveTintColor: "gray",
                }}
            >
                <Tab.Screen name='Home' component={Home} />
                <Tab.Screen name='Account' component={Setting} />
            </Tab.Navigator>
        );
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name='Sign In' component={SignIn} />
            <Stack.Screen name='Sign Up' component={SignUp} />
        </Stack.Navigator>
    );
}