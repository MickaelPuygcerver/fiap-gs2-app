import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from './pages/home'
import { Register } from './pages/register'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Artigos"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: () => { return <Ionicons name="list"/> }
                }}
            />

            <Tab.Screen
                name="Cadastrar Artigo"
                component={Register}
                options={{
                    headerShown: false,
                    tabBarIcon: () => { return <Ionicons name="create"/> }
                }}
            />
        </Tab.Navigator>
    )
}