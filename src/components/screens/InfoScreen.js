import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clearInterval } from './WorkoutScreen';

@inject('SettingsStore')
@observer
export default class Info extends Component {
    constructor(props) {
        super(props)
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
        const { container } = styles;
        return (
            <View style={container}>
                <TouchableOpacity
                    onPress={() => {
                    }}>
                    <View>
                        <Text>idk</Text>
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