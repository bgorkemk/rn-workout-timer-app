import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppStyles from '../styles/AppStyles';

const { windowWidth, windowHeight, FONT_COLOR, BORDER_RADIUS } = AppStyles;


export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    color: null
  }

  render() {
    const { container, headerText } = styles;
    return (
      <View style={[container, { backgroundColor: this.props.color }]}>
        <Text style={headerText}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    width: windowWidth - 20,
    height: windowHeight / 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
    opacity: 0.95,
  },
  headerText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: FONT_COLOR,
  }
})