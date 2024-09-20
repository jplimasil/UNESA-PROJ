import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TrainingScreen from '../screens/TrainingScreen'; // Nossa nova tela de treino

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Você pode adicionar mais telas aqui, se necessário */}
        <Tab.Screen name="Treino" component={TrainingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
