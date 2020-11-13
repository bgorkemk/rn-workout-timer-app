import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppStyles from '../styles/AppStyles';

const {
    windowWidth,
    windowHeight,
    BACKGROUND_COLOR,
    COMMON_TINT,
    WORKOUT_CIRCLE_FULL,
    WORKOUT_CIRCLE_HALF,
    WORKOUT_CIRCLE_EMPTY,
    BREAK_CIRCLE_FULL,
    BREAK_CIRCLE_HALF,
    BREAK_CIRCLE_EMPTY,
    PAUSE_CIRCLE,
    PAUSE_TINT,
    CIRCLE_COLOR,
    CIRCLE_WIDTH,
    HEADER_WORKOUT,
    HEADER_BREAK,
    WORKOUT_BUTTON_HEIGHT,
    BUTTON_WIDTH,
    BUTTON_ADD_COLOR,
    BUTTON_RESET_COLOR,
    BUTTON_START_COLOR,
    BUTTON_STOP_COLOR,
    FONT_COLOR,
    BORDER_RADIUS
} = AppStyles;

export default class ButtonComponent extends Component {
    render() {
        const { container, buttonText, buttonContainer, buttonAdd, buttonReset } = styles;
        return (
            <TouchableOpacity
                touchSoundDisabled={true}
                onPress={this.props.func}
                style={[buttonContainer, { backgroundColor: this.props.color, width: this.props.width }]}>
                <Text
                    style={buttonText}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    buttonContainer: {
        height: WORKOUT_BUTTON_HEIGHT,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        margin: 15,
        borderRadius: BORDER_RADIUS,
        opacity: 0.9
    },
    buttonText: {
        fontSize: 30,
        color: FONT_COLOR,
        fontWeight: 'bold'
    },
    buttonReset: {
        backgroundColor: BUTTON_RESET_COLOR
    },
    buttonAdd: {
        backgroundColor: BUTTON_ADD_COLOR
    },
})