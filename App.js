import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomTabBar } from './src/components/CustomTabBar';
import Info from './src/components/screens/InfoScreen';
import Settings from './src/components/screens/SettingsScreen';
import Workout from './src/components/screens/WorkoutScreen';
import SettingsStore from './src/components/stores/SettingsStore';
import AppStyles from './src/styles/AppStyles';


const {
  FONT_COLOR,
  BACKGROUND_COLOR
} = AppStyles;

function WorkoutScreen() {
  const { container } = styles
  // Workout
  return (
    <View style={container}>
      <Workout></Workout>
    </View>
  )
}
function SettingsScreen() {
  const { container } = styles
  // Settings
  return (
    <View style={container}>
      <Settings></Settings>
    </View>
  )
}
function InfoScreen() {
  const { container } = styles
  // Info
  return (
    <View style={container}>
      <Info></Info>
    </View>
  )
}

const Tab = createBottomTabNavigator();


export default class App extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <Provider SettingsStore={SettingsStore}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Workout"
            tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen
              name="Info"              >
              {props => <Info {...props} />}
            </Tab.Screen>
            <Tab.Screen
              name="Workout">
              {props => <Workout {...props} />}
            </Tab.Screen>
            <Tab.Screen
              name="Settings">
              {props => <Settings {...props} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#263238'
  }
})