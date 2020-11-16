import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppStyles from '../../styles/AppStyles';
import SettingElement from '../SettingElement';
import { clearInterval } from './WorkoutScreen';

const {
    windowWidth,
    windowHeight,
    BACKGROUND_COLOR,
    FONT_COLOR,
    HEADER_COLOR,
    CIRCLE_COLOR,
    COMMON_TINT,
    SETTINGS_BUTTON_WIDTH,
    BUTTON_RESET_COLOR,
    SETTINGS_ELEMENT_HEIGHT,
    COLOR_SETTINGS_ELEMENT_TEXT,
    COLOR_SETTINGS_ELEMENT_INPUT,
    WORKOUT_BUTTON_HEIGHT,
    BORDER_RADIUS
} = AppStyles

@inject('SettingsStore')
@observer
export default class Settings extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            clearInterval()
        })
    }
    componentWillUnmount() {
        this.props.navigation.removeListener('focus', () => {
            // console.log('removed listener')
        })
    }
    render() {
        const { container, scrollViewContainer, buttonContainer, buttonContent, buttonText, headerStyle, headerTextStyle } = styles;
        return (
            <View style={container}>
                <View style={headerStyle}>
                    <Text style={headerTextStyle}>Settings</Text>
                </View>
                <ScrollView style={scrollViewContainer} contentContainerStyle={{ alignItems: 'center' }}>
                    {/* Red Title: Text Allowed */}
                    {/* keyboardType: number-pad, default */}
                    {/* maxLength default: 9, number recommend: X, text recommend: 9 */}

                    {/* Workout Title */}
                    <SettingElement title="Red Title" placeholder={this.props.SettingsStore.RED_TITLE} value={this.props.SettingsStore.Changed_RED_TITLE} keyboardType="default" type="RED_TITLE" maxLength={9} />

                    {/* Break Title */}
                    <SettingElement title="Green Title" placeholder={this.props.SettingsStore.GREEN_TITLE} value={this.props.SettingsStore.Changed_GREEN_TITLE} keyboardType="default" type="GREEN_TITLE" maxLength={9} />

                    {/* Workout Time */}
                    <SettingElement title={`${this.props.SettingsStore.RED_TITLE} Time`} placeholder={this.props.SettingsStore.MAX_POINTS_WORKOUT} value={this.props.SettingsStore.Changed_MAX_POINTS_WORKOUT} keyboardType="number-pad" type="MAX_POINTS_WORKOUT" maxLength={5} />

                    {/* Break Time */}
                    <SettingElement title={`${this.props.SettingsStore.GREEN_TITLE} Time`} placeholder={this.props.SettingsStore.MAX_POINTS_BREAK} value={this.props.SettingsStore.Changed_MAX_POINTS_BREAK} keyboardType="number-pad" type="MAX_POINTS_BREAK" maxLength={5} />

                    {/* Timer Interval */}
                    {/* <SettingElement title="Timer Interval" placeholder={this.props.SettingsStore.TIMER_INTERVAL} value={this.props.SettingsStore.Changed_TIMER_INTERVAL} keyboardType="number-pad" type="TIMER_INTERVAL" maxLength={8} /> */}

                    {/* Extra Time */}
                    <SettingElement title="Extra Time" placeholder={"+" + this.props.SettingsStore.ADD_SECONDS} value={this.props.SettingsStore.Changed_ADD_SECONDS} keyboardType="number-pad" type="ADD_SECONDS" maxLength={3} />

                    {/* RESET SETTINGS */}
                    <TouchableOpacity onPress={() => {
                        this.props.SettingsStore.defaultSettings()
                    }} style={[headerStyle, { width: windowWidth - 40, marginBottom: 30, backgroundColor: BUTTON_RESET_COLOR }]}>
                        <Text style={[headerTextStyle, { fontSize: 30 }]}>Reset Settings</Text>
                    </TouchableOpacity>
                </ScrollView>

                <View style={buttonContainer}>
                    <TouchableOpacity
                        style={buttonContent}
                        onPress={() => this.props.SettingsStore.applySettings()}>
                        <Text
                            style={buttonText}>
                            Apply Settings
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    scrollViewContainer: {
        flex: 9,
        width: windowWidth,
        top: 20,
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'column',
    },
    headerStyle: {
        top: 20,
        width: windowWidth - 20,
        height: windowHeight / 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS,
        opacity: 0.95,
        backgroundColor: HEADER_COLOR
    },
    headerTextStyle: {
        fontSize: 45,
        color: FONT_COLOR,
        fontWeight: 'bold'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        height: WORKOUT_BUTTON_HEIGHT,
        width: SETTINGS_BUTTON_WIDTH,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 5,
        borderRadius: BORDER_RADIUS,
        opacity: 0.9,
        backgroundColor: HEADER_COLOR
    },
    buttonText: {
        fontSize: 30,
        color: FONT_COLOR,
        fontWeight: 'bold'
    },
})