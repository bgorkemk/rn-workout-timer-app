import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import AppStyles from '../styles/AppStyles'

const {
    windowWidth,
    CIRCLE_COLOR,
    SETTINGS_ELEMENT_HEIGHT,
    COLOR_SETTINGS_ELEMENT_TEXT,
    COLOR_SETTINGS_ELEMENT_INPUT,
    BORDER_RADIUS
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
        const { settingsElement, titleStyle, inputStyle } = styles;
        return (
            <View style={settingsElement}>
                <Text
                    allowFontScaling={true}
                    style={titleStyle}>
                    {
                        this.props.title != null ?
                            this.props.title :
                            'Default Value'
                    }
                </Text>
                <TextInput
                    style={inputStyle}
                    placeholder={
                        (this.props.placeholder != null ?
                            this.props.placeholder :
                            'Default Placeholder').toString()
                    }
                    // number-pad
                    // default
                    keyboardType={
                        this.props.keyboardType != null ?
                            this.props.keyboardType :
                            'default'
                    }
                    onChangeText={(text) => this.textControl(text)}
                    value={
                        (this.props.value != null ?
                            (this.props.value) :
                            'default').toString()
                    }
                    maxLength={
                        this.props.maxLength != null ?
                            this.props.maxLength :
                            9
                    }
                />
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
    titleStyle: {
        flex: 1,
        fontSize: 20,
        height: SETTINGS_ELEMENT_HEIGHT,
        marginRight: 5,
        textAlign: "center",
        lineHeight: SETTINGS_ELEMENT_HEIGHT,
        fontWeight: 'bold',
        borderRadius: BORDER_RADIUS,
        borderWidth: 2,
        color: CIRCLE_COLOR,
        borderColor: COLOR_SETTINGS_ELEMENT_TEXT,
        backgroundColor: COLOR_SETTINGS_ELEMENT_TEXT
    },
    inputStyle: {
        flex: 1,
        fontSize: 20,
        height: SETTINGS_ELEMENT_HEIGHT,
        marginLeft: 5,
        textAlign: "center",
        fontWeight: 'bold',
        borderRadius: BORDER_RADIUS,
        borderWidth: 2,
        borderColor: COLOR_SETTINGS_ELEMENT_INPUT,
        color: '#424242',
        backgroundColor: COLOR_SETTINGS_ELEMENT_INPUT
    },
})