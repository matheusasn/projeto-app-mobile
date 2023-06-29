import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 

import Home from "../pages/Home/Home";
import ExamResults from "../pages/ExamResults/ExamResults";
import Schedule from "../pages/Schedule/Schedule";
import HealthUnit from "../pages/HealthUnit/HealthUnit";
import Profile from "../pages/Profile/Profile";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View} from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import ScheduleInfo from "../pages/ScheduleInfo/ScheduleInfo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ScheduleStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Schedule" component={Schedule} options={{ headerShown: false }}/>
        <Stack.Screen name="ScheduleInfo" component={ScheduleInfo} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
  };
  


export default function Routes() {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle:{
                        backgroundColor: '#fff',
                        borderTopColor: '#179ee8',
                        height: 60,
                    }
                }}
            >
                <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Ionicons name="home" size={size} color='#179ee8'/>
                        }

                        return <Ionicons name="home-outline" size={size} color='#179ee8'/>
                    } 
                    }}>
                    
                </Tab.Screen>

                <Tab.Screen 
                name="ExamResults" 
                component={ExamResults} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <MaterialCommunityIcons name="clipboard-file" size={size} color="#179ee8" />
                        }

                        return <MaterialCommunityIcons name="clipboard-file-outline" size={size} color="#179ee8" />
                    }
                    }}
                ></Tab.Screen>

            <Tab.Screen 
            name="ScheduleStack" 
            component={ScheduleStack} 
            options={{
                headerShown: false, 
                tabBarIcon: ({color, size, focused}) => {
                    if(focused){
                        return <Ionicons name="ios-calendar" size={size} color='#179ee8'/>
                    }
                    }}}
            ></Tab.Screen>

                <Tab.Screen 
                name="HealthUnit" 
                component={HealthUnit} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <MaterialCommunityIcons name="hospital-box" size={size} color="#179ee8" />
                        } 
                        
                        return <MaterialCommunityIcons name="hospital-box-outline" size={size} color='#179ee8'/>
                    } 
                    }}
                ></Tab.Screen>

                <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Ionicons name="person" size={size} color='#179ee8'/>
                        }

                        return <Ionicons name="person-outline" size={size} color='#179ee8'/>
                    } 
                    }}
                ></Tab.Screen>
            </Tab.Navigator>
        </View>
    );
}