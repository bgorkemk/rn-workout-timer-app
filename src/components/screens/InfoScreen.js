import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AppStyles from '../../styles/AppStyles';
import { clearInterval } from './WorkoutScreen';

const {
    windowWidth,
    windowHeight,
    BACKGROUND_COLOR
} = AppStyles

const dayFormat = {
    day: "string",
    settings: {
        selected: true
    }
}

let markedDays = {
    // "2020-11-01": { "selected": true }, 
    // "2020-11-02": { "selected": true } 
}


let newDate = {}
let temp = [];
let tempObj = {}

//TODO gün secilince blue markla sonra button ile spor yaptım yapmadım kaydedebilsin 

@inject('SettingsStore')
@observer
export default class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switchRef: false
        }
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
        const { container, calendarStyle } = styles;
        return (
            <View style={container}>
                <TouchableOpacity
                    style={{ height: 200 }}
                    onPress={() => {
                        markedDays = this.state.markedDates

                    }}>
                    <View>
                        <Text style={{ color: 'white' }}>Ekle</Text>
                    </View>
                </TouchableOpacity>

                <Calendar
                    maxDate={new Date()}
                    firstDay={1}
                    style={calendarStyle}
                    theme={{
                        todayTextColor: 'red',
                        selectedDayBackgroundColor: 'green',
                        selectedDayTextColor: '#ffffff'
                    }}
                    onDayPress={(day) => {
                        if (this.state.switchRef) {
                            this.setState({
                                switchRef: false
                            })
                        }
                        else {
                            this.setState({
                                switchRef: true
                            })
                        }
                        newDate = { [day.dateString]: dayFormat.settings };
                        temp = []

                        temp.push(newDate)
                        this.props.SettingsStore.addDays(temp)

                    }}
                    markedDates={this.state.switchRef ? this.props.SettingsStore.DAYS : this.props.SettingsStore.DAYS_}
                />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR
    },
    calendarStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        width: windowWidth - 20,
        height: windowHeight / 2 - 10
    },
})