import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppStyles from '../styles/AppStyles'

const {
    windowWidth,
    SETTINGS_ELEMENT_HEIGHT,
    BORDER_RADIUS,
    WORKOUT_BUTTON_HEIGHT,
    SETTINGS_BUTTON_WIDTH,
    HEADER_WORKOUT,
    HEADER_BREAK
} = AppStyles

@inject('SettingsStore')
@observer
export default class SettingElement extends Component {
    constructor(props) {
        super(props)
        this.textControl = this.textControl.bind(this)
    }

    textControl(text) {
        this.props.SettingsStore.setText(text, this.props.type)
        return text;
    }
    render() {
        const { settingsElement, textStyle, buttonStyle_ON, buttonStyle_OFF } = styles;
        return (
            <View style={settingsElement}>
                {
                    this.props.SettingsStore.VOLUME_STAGE ?
                        <TouchableOpacity
                            style={buttonStyle_ON}
                            onPress={() => {
                                this.props.SettingsStore.toggleVolume()
                            }}>
                            <Text style={textStyle}>
                                {this.props.title} On!
                        </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={buttonStyle_OFF}
                            onPress={() => {
                                this.props.SettingsStore.toggleVolume()
                            }}>
                            <Text style={textStyle}>
                                {this.props.title} Off!
                        </Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    settingsElement: {
        flexDirection: 'row',
        borderRadius: 15,
        width: windowWidth - 40,
        height: SETTINGS_ELEMENT_HEIGHT,
        marginTop: 20
    },
    textStyle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    buttonStyle_ON: {
        height: WORKOUT_BUTTON_HEIGHT,
        width: SETTINGS_BUTTON_WIDTH,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: BORDER_RADIUS,
        opacity: 0.9,
        backgroundColor: HEADER_BREAK
    },
    buttonStyle_OFF: {
        height: WORKOUT_BUTTON_HEIGHT,
        width: SETTINGS_BUTTON_WIDTH,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: BORDER_RADIUS,
        opacity: 0.9,
        backgroundColor: HEADER_WORKOUT
    },
})