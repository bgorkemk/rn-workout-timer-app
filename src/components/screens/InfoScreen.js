import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AppStyles from '../../styles/AppStyles';
import { clearInterval } from './WorkoutScreen';

const {
    windowWidth,
    windowHeight,
    BACKGROUND_COLOR,
    BORDER_RADIUS,
    HEADER_COLOR,
    FONT_COLOR,
    WORKOUT_BUTTON_HEIGHT,
    SETTINGS_BUTTON_WIDTH    
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
             this.setState({
                 switchRef: !this.state.switchRef
             })
        })        
    }
    componentWillUnmount() {
        this.props.navigation.removeListener('focus', () => {
            // console.log('removed listener')
        })
    }

    render() {
        const { container, calendarStyle, headerStyle, headerTextStyle, buttonContainer, buttonContent, buttonText } = styles;
        return (
            <View style={container}>  
                <View style={headerStyle}>
                    <Text style={headerTextStyle}>Calendar</Text>
                </View>              
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
                        this.props.SettingsStore.getTotalWorkoutCount()
                    }}
                    // EKRAN YENİLEMESİ İÇİN STATE DEĞİŞTİRİLİYOR
                    markedDates={this.state.switchRef ? this.props.SettingsStore.DAYS : this.props.SettingsStore.DAYS_}
                />

                <TouchableOpacity
                    style={{ height: 100 }}
                    onPress={() => {
                        // // markedDays = this.state.markedDates
                        // this.props.SettingsStore.addDays(temp)   

                        // if (this.state.switchRef) {
                        //     this.setState({
                        //         switchRef: false
                        //     })
                        // }
                        // else {
                        //     this.setState({
                        //         switchRef: true
                        //     })
                        // }
                    }}>
                    {/* <View>
                        <Text style={{ color: 'white', fontSize: 24 }}>{this.props.SettingsStore.totalWorkout}</Text>
                    </View> */}
                </TouchableOpacity>
                <View style={buttonContainer}>
                    <TouchableOpacity
                        style={buttonContent}
                        onPress={() => {
                            this.props.SettingsStore.removeSavedDates();
                            
                            // TODO: refresh screen when saved dates removed
                            this.setState({
                                switchRef: !this.state.switchRef
                            })
                            }}>
                        <Text
                            style={buttonText}>
                            {this.props.SettingsStore.totalWorkout}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR
    },
    calendarStyle: {        
        marginTop: 50,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 15,
        width: windowWidth - 20,
        height: windowHeight / 2 - 10
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
        marginTop: -9,
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