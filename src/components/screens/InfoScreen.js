import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

@inject('SettingsStore')
@observer
export default class Info extends Component {
    constructor(props) {
        super(props)
    }
    // componentDidMount() {
    //     console.log('INFO EKRANI BASLATILDI')
    // }

    // componentWillUnmount() {
    //     console.log('INFO EKRANI YOKEDİLDİ')
    // }
    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <TouchableOpacity
                    onPress={() => this.props.SettingsStore.applySettings()}>
                    <View>
                        <Text>{this.props.SettingsStore.RED_TITLE}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})