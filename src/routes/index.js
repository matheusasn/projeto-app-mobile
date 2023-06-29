import { createNativeStackNavigator } from "@react-navigation/native-stack"; 

import Welcome from "../pages/Login/Welcome"
import SignIn from "../pages/Login/SignIn"
import Registration from "../pages/Registratio/Registratio"

import TabRoutes from './tab.routes';
import ScheduleInfo from "../pages/ScheduleInfo/ScheduleInfo";


const Stack = createNativeStackNavigator();

function HomeScreen() {
    return (
        <TabRoutes/>
    );
};

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Registratio" component={Registration} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
}
