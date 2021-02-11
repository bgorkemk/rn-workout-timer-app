import { InterstitialAd, TestIds } from '@react-native-firebase/admob';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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


const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

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
        interstitial.load();
        this.props.navigation.addListener('focus', () => {
            clearInterval();
            // this.setState({
            //     switchRef: !this.state.switchRef
            // })
        })
    }
    componentWillUnmount() {
        this.props.navigation.removeListener('focus', () => {
            // console.log('removed listener')
        })
    }



    render() {
        if (this.props.SettingsStore.ADS_COUNTER % 10 == 0) {
            // SHOW ADS
            //interstitial.show();
            console.log('BOOM')
        }
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
                        this.setState({
                            switchRef: !this.state.switchRef
                        });
                        newDate = { [day.dateString]: dayFormat.settings };
                        temp = []
                        temp.push(newDate)
                        this.props.SettingsStore.addDays(temp)
                        this.props.SettingsStore.getTotalWorkoutCount()
                    }}
                    // EKRAN YENİLEMESİ İÇİN STATE DEĞİŞTİRİLİYOR
                    markedDates={this.state.switchRef ? this.props.SettingsStore.DAYS : this.props.SettingsStore.DAYS_}
                />

                {/* <TouchableOpacity
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
                    <View>
                        <Text style={{ color: 'white', fontSize: 24 }}>{this.props.SettingsStore.totalWorkout}</Text>
                    </View>
                </TouchableOpacity> */}
                <View style={buttonContainer}>
                    <TouchableOpacity
                        style={buttonContent}
                        onPress={() => {
                            Alert.alert(
                                'Days will be removed!',
                                'Do you really want to clear calendar?',
                                [
                                    {
                                        text: 'No',
                                        onPress: () => {
                                            // close alert
                                        },
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'YES', onPress: () => {
                                            this.props.SettingsStore.removeSavedDates();
                                            interstitial.show();
                                            // this.setState({
                                            //     switchRef: !this.state.switchRef
                                            // });
                                        }
                                    },
                                ]
                            );
                        }}>
                        {
                            this.props.SettingsStore.totalWorkout <= 1 ?
                                <Text
                                    style={buttonText}>
                                    Total: {this.props.SettingsStore.totalWorkout} Day
                            </Text> :
                                <Text
                                    style={buttonText}>
                                    Total: {this.props.SettingsStore.totalWorkout} Days
                            </Text>
                        }
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
        bottom: 0,
        marginTop: 91,
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