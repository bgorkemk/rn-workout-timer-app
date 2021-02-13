import { AdEventType, InterstitialAd } from '@react-native-firebase/admob';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AD_UNIT from '../../AD_UNIT';
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

let newDate = {}
let temp = [];

const adUnitId = AD_UNIT;


//TODO gün secilince blue markla sonra button ile spor yaptım yapmadım kaydedebilsin 

@inject('SettingsStore')
@observer
export default class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switchRef: false,
            adLoaded: false
        }
    }

    componentDidMount() {
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

    showInterstitialAd = () => {
        // Create a new instance
        const interstitialAd = InterstitialAd.createForAdRequest(adUnitId);
        // Add event handlers
        interstitialAd.onAdEvent((type, error) => {
            if (type === AdEventType.LOADED) {
                interstitialAd.show();
                this.props.SettingsStore.ADS_COUNTER_INCREAMENT();
            }
            else {
                // console.log('Ad yüklenmedi')
            }
        });

        // Load a new advert
        interstitialAd.load();
    }


    render() {
        if (this.props.SettingsStore.ADS_COUNTER % 30 == 0) {
            this.showInterstitialAd();
        }
        const { container, calendarStyle, headerStyle, headerTextStyle, buttonContainer, buttonContent, buttonText } = styles;
        return (
            <SafeAreaView style={container}>
                <StatusBar
                    backgroundColor={BACKGROUND_COLOR}
                />
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
                                            this.showInterstitialAd();
                                            this.props.SettingsStore.removeSavedDates();
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
                                </Text>
                                :
                                <Text
                                    style={buttonText}>
                                    Total: {this.props.SettingsStore.totalWorkout} Days
                                </Text>
                        }
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
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
        marginTop: windowHeight / 11,
        borderWidth: 5,
        borderColor: HEADER_COLOR,
        borderRadius: BORDER_RADIUS,
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
        fontSize: 50,
        color: FONT_COLOR,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end'
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