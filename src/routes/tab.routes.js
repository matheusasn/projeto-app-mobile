import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 

import Home from "../pages/Home/Home";
import ExamResults from "../pages/ExamResults/ExamResults";
import Schedule from "../pages/Schedule/Schedule";
import HealthUnit from "../pages/HealthUnit/HealthUnit";
import Profile from "../pages/Profile/Profile";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View} from 'react-native';
import { Text } from "react-native";
import { useContext } from 'react';

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
                        if (focused) {
                            return (
                              <>
                                <Ionicons name="home" size={22} color='#179ee8' />
                                <Text style={{ color: '#179ee8', fontWeight: 700, fontSize: 12 }}>Home</Text>
                              </>
                            );
                        }
                        return (
                        <>
                            <Ionicons name="home-outline" size={22} color='#179ee8' />
                            <Text style={{ color: '#179ee8', fontSize: 12 }}>Home</Text>
                        </>
                        );
                        }
                    }}>
                    
                </Tab.Screen>

                <Tab.Screen 
                name="ScheduleStack" 
                component={ScheduleStack}
                options={{
                    headerShown: false, 
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return (
                                <>
                                <Ionicons name="ios-calendar" size={22} color='#179ee8'/>
                                <Text style={{ color: '#179ee8', fontWeight: 700, fontSize: 12 }}>Agendamento</Text>
                                </>
                            );
                        }
                        return (
                        <>
                            <Ionicons name="ios-calendar-outline" size={22} color='#179ee8'/>
                            <Text style={{ color: '#179ee8', fontSize: 12 }}>Agendamento</Text>
                        </>
                        );
                    }}}
                ></Tab.Screen>

                <Tab.Screen 
                name="ExamResults" 
                component={ExamResults} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return (
                              <>
                                <MaterialCommunityIcons name="clipboard-file" size={22} color="#179ee8" />
                                <Text style={{ color: '#179ee8', fontWeight: 700, fontSize: 12 }}>Exames</Text>
                              </>
                            );
                        }
                        return (
                        <>
                            <MaterialCommunityIcons name="clipboard-file-outline" size={22} color="#179ee8" />
                            <Text style={{ color: '#179ee8', fontSize: 12 }}>Exames</Text>
                        </>
                        );
                    }
                    }}
                ></Tab.Screen>

                <Tab.Screen 
                name="HealthUnit" 
                component={HealthUnit} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({color, size, focused}) => {
                    //   const { notificationCount } = useContext(10);

                    if (focused) {
                        return (
                        <>
                            <View style={{width: 24, height: 24, justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="notifications" size={size} color="#179ee8" />
                            {10 > 0 && 
                                <View style={{ 
                                    position: 'absolute',
                                    right: -6,
                                    top: -3,
                                    backgroundColor: '#FFA500',
                                    borderRadius: 6,
                                    width: 12,
                                    height: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Text style={{ color: 'white', fontSize: 7, fontWeight: 'bold' }}>
                                    8
                                </Text>
                                </View>
                            }
                            </View>
                            <Text style={{ color: '#179ee8', fontWeight: 700, fontSize: 12 }}>Notificações</Text>
                        </>
                        );
                    }
                    return (
                        <>
                        <View style={{width: 24, height: 24, justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="notifications-outline" size={size} color="#179ee8" />
                            {10 > 0 && 
                            <View style={{ 
                                position: 'absolute',
                                right: -6,
                                top: -3,
                                backgroundColor: '#FFA500',
                                borderRadius: 6,
                                width: 12,
                                height: 12,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: 7, fontWeight: 'bold' }}>
                                8
                                </Text>
                            </View>
                            }
                        </View>
                        <Text style={{ color: '#179ee8', fontSize: 12 }}>Notificações</Text>
                        </>
                    );
                    } 
                }}
                ></Tab.Screen>

                <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return (
                              <>
                                <Ionicons name="person" size={22} color='#179ee8'/>
                                <Text style={{ color: '#179ee8', fontWeight: 700, fontSize: 12 }}>Perfil</Text>
                              </>
                            );
                        }
                        return (
                        <>
                            <Ionicons name="person-outline" size={22} color='#179ee8'/>
                            <Text style={{ color: '#179ee8', fontSize: 12 }}>Perfil</Text>
                        </>
                        );
                    } 
                    }}
                ></Tab.Screen>
            </Tab.Navigator>
        </View>
    );
}