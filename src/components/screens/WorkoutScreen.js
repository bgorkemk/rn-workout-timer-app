import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Sound from 'react-native-sound';
import { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppStyles from '../../styles/AppStyles';
import Button from '../Button';
import Header from '../Header';


// TODO: MUTE SOUND BUTTON LIKE TOGGLE SCREEN
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
    CIRCLE_COLOR,
    CIRCLE_WIDTH,
    BUTTON_ADD_COLOR,
    BUTTON_RESET_COLOR,
    WORKOUT_BUTTON_WIDTH
} = AppStyles;

const tickSound = new Sound('tick.mp3');
const bellSound = new Sound('bell.mp3');


let fillpercentBreak;
let fillpercentWorkout;
let number;
let intervalCounter = null;

export function clearInterval() {
    window.clearInterval(intervalCounter);
    intervalCounter = null
}

@inject('SettingsStore')
@observer
export default class Workout extends Component {
    constructor(props) {
        super(props)
        this.startStop = this.startStop.bind(this)
        this.resetProgressBar = this.resetProgressBar.bind(this)
        this.addSeconds = this.addSeconds.bind(this)
        this.playSound = this.playSound.bind(this)
        this.playBell = this.playBell.bind(this)
        this.stopSound = this.stopSound.bind(this)
        this.state = {
            toggleSound: true
        };
        // console.log('WORKOUT EKRANI BASLATILDI')
    }


    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (intervalCounter == null) {
                this.props.SettingsStore.changeTimerRunning(false)
            }
            else {
                console.log('not null')
            }
        })

    }
    componentWillUnmount() {
        this.props.navigation.removeListener('focus', () => {
            // console.log('removed listener')
        })
    }


    playSound() {
        tickSound.play()
    }

    playBell() {
        bellSound.play()
    }

    stopSound() {
        tickSound.stop()
    }

    progressBar() {
        //mola kontrolü break true ise workout false ise break
        if (this.props.SettingsStore.BREAK_STAGE) {
            intervalCounter = setInterval(() => {
                if (this.props.SettingsStore.fillRatioBreak != 0) {
                    let number = this.props.SettingsStore.fillRatioBreak
                    number--
                    this.props.SettingsStore.changeValueFillRatioBreak(number)
                    this.playSound();
                }
                else {
                    clearInterval();
                    this.playBell();
                    setTimeout(() => {
                        this.resetProgressBar();
                        this.startStop();
                    }, this.props.SettingsStore.TIMEOUT_SEC);
                    this.props.SettingsStore.changeAppStage();
                }
            }, this.props.SettingsStore.TIMER_INTERVAL);
            this.props.SettingsStore.changeTimerRunning(true)
        }
        else {
            intervalCounter = setInterval(() => {
                if (this.props.SettingsStore.fillRatioWorkout != 0) {
                    let number = this.props.SettingsStore.fillRatioWorkout
                    number--
                    this.props.SettingsStore.changeValueFillRatioWorkout(number)
                    this.playSound();
                }
                else {
                    clearInterval();
                    this.playBell();
                    setTimeout(() => {
                        this.resetProgressBar();
                        this.startStop();
                    }, this.props.SettingsStore.TIMEOUT_SEC);
                    this.props.SettingsStore.changeAppStage();
                }
            }, this.props.SettingsStore.TIMER_INTERVAL);
            this.props.SettingsStore.changeTimerRunning(true)
        }
    }

    addSeconds() {
        if (this.props.SettingsStore.BREAK_STAGE) {
            number = this.props.SettingsStore.fillRatioBreak;
            number += this.props.SettingsStore.ADD_SECONDS;

            // hane taşma kontrolü eger 99999 dan büyük olacaksa ekleme
            if (number > 99999) {
                // do nothing
            } else {
                this.props.SettingsStore.changeValueFillRatioBreak(number)
                this.props.SettingsStore.changeValueNewMaxBreak(this.props.SettingsStore.fillRatioBreak)
            }
        }
        else {
            number = this.props.SettingsStore.fillRatioWorkout;
            number += this.props.SettingsStore.ADD_SECONDS;

            // hane taşma kontrolü eger 99999 dan büyük olacaksa ekleme
            if (number > 99999) {
                // do nothing
            } else {
                this.props.SettingsStore.changeValueFillRatioWorkout(number)
                this.props.SettingsStore.changeValueNewMaxWorkout(this.props.SettingsStore.fillRatioWorkout)
            }
        }
        this.props.SettingsStore.ADS_COUNTER_INCREAMENT();
    }

    startStop() {
        if (!this.props.SettingsStore.TIMER_RUNNING) {
            this.progressBar();
            this.stopSound();
        }
        else {
            clearInterval()
            this.props.SettingsStore.changeTimerRunning(false)
        }
        this.props.SettingsStore.ADS_COUNTER_INCREAMENT();
    }

    resetProgressBar() {
        clearInterval();
        // RESETE BASTIGIMDA TEKRAR DEFAULT SANİYELERE AYARLASIN
        this.props.SettingsStore.changeValueNewMaxWorkout(this.props.SettingsStore.MAX_POINTS_WORKOUT)
        this.props.SettingsStore.changeValueNewMaxBreak(this.props.SettingsStore.MAX_POINTS_BREAK)

        this.props.SettingsStore.changeValueFillRatioWorkout(this.props.SettingsStore.NEW_MAX_POINTS_WORKOUT)
        this.props.SettingsStore.changeValueFillRatioBreak(this.props.SettingsStore.MAX_POINTS_BREAK)

        this.props.SettingsStore.changeTimerRunning(false)
        this.props.SettingsStore.changePause(false)

        intervalCounter = null

        if (this.props.SettingsStore.START_AFTER_RESET) {
            setTimeout(() => {
                this.startStop();
            }, 100);
        }

        this.props.SettingsStore.ADS_COUNTER_INCREAMENT();

    }

    render() {
        tickSound.setVolume(this.props.SettingsStore.VOLUME);
        bellSound.setVolume(this.props.SettingsStore.VOLUME);
        const { container, buttons, progressBarText } = styles;
        if (this.props.SettingsStore.MAX_POINTS_WORKOUT != null && true) {
            fillpercentWorkout = (this.props.SettingsStore.fillRatioWorkout / this.props.SettingsStore.NEW_MAX_POINTS_WORKOUT) * 100;
            fillpercentBreak = (this.props.SettingsStore.fillRatioBreak / this.props.SettingsStore.NEW_MAX_POINTS_BREAK) * 100;
            return (
                <View style={[container, { zIndex: -1 }]}>
                    {!this.props.SettingsStore.BREAK_STAGE ?
                        <Header title={this.props.SettingsStore.RED_TITLE} color={(WORKOUT_CIRCLE_FULL)}></Header>
                        :
                        <Header title={this.props.SettingsStore.GREEN_TITLE} color={(BREAK_CIRCLE_FULL)}></Header>
                    }
                    {/* TOGGLE SOUND */}
                    {/* <TouchableOpacity
                        style={{ position: 'absolute', top: windowHeight / 7, left: 30, zIndex: 5 }}
                        onPress={() => {
                            if (this.props.SettingsStore.VOLUME == 0) {
                                this.props.SettingsStore.changeVolume(1);

                                console.log('ses kapa')
                            } else if (this.props.SettingsStore.VOLUME == 1) {
                                this.props.SettingsStore.changeVolume(0);
                                console.log('ses ac')
                            }
                        }}>
                        {
                            !this.props.SettingsStore.BREAK_STAGE ?
                                <Icon name="volume_up" size={30} color={BREAK_CIRCLE_FULL} />
                                :
                                <Icon name="volume_mute" size={30} color={WORKOUT_CIRCLE_FULL} />
                        }
                    </TouchableOpacity> */}

                    {/* TOGGLE STAGE */}
                    <TouchableOpacity
                        style={{ position: 'absolute', top: windowHeight / 7, right: 30, zIndex: 5 }}
                        onPress={() => {
                            clearInterval()
                            this.props.SettingsStore.toggleAppStage();
                            this.props.SettingsStore.ADS_COUNTER_INCREAMENT();
                        }}
                    >
                        {
                            !this.props.SettingsStore.BREAK_STAGE ?
                                <Icon name="human-handsdown" size={30} color={BREAK_CIRCLE_FULL} />
                                :
                                <Icon name="human-handsup" size={30} color={WORKOUT_CIRCLE_FULL} />

                        }
                    </TouchableOpacity>

                    {/* AnimatedCircularProgress */}
                    <TouchableOpacity
                        touchSoundDisabled={true}
                        style={{ borderRadius: 1000 }}
                        onPress={this.startStop}>
                        {!this.props.SettingsStore.BREAK_STAGE ?
                            <AnimatedCircularProgress
                                size={windowWidth}
                                width={(windowWidth / 7)}
                                fill={fillpercentWorkout}
                                tintColor={(!this.props.SettingsStore.TIMER_RUNNING ? PAUSE_CIRCLE :
                                    fillpercentWorkout < 33 ? WORKOUT_CIRCLE_EMPTY :
                                        fillpercentWorkout < 66 ? WORKOUT_CIRCLE_HALF :
                                            fillpercentWorkout < 100 ? WORKOUT_CIRCLE_FULL : WORKOUT_CIRCLE_FULL
                                )}
                                dashedBackground={
                                    {
                                        width: 3,
                                        gap: 30,
                                    }
                                }
                                backgroundColor={(!this.props.SettingsStore.TIMER_RUNNING ? PAUSE_CIRCLE :
                                    fillpercentWorkout < 33 ? WORKOUT_CIRCLE_EMPTY :
                                        fillpercentWorkout < 66 ? WORKOUT_CIRCLE_HALF :
                                            fillpercentWorkout < 100 ? WORKOUT_CIRCLE_FULL : WORKOUT_CIRCLE_FULL
                                )}
                                padding={10}
                                renderCap={({ center }) =>
                                    <Circle
                                        cx={center.x}
                                        cy={center.y}
                                        r={CIRCLE_WIDTH}

                                        fill={CIRCLE_COLOR}
                                    />
                                }
                            />
                            :
                            <AnimatedCircularProgress
                                size={windowWidth}
                                width={windowWidth / 7}
                                fill={fillpercentBreak}
                                tintColor={(!this.props.SettingsStore.TIMER_RUNNING ? PAUSE_CIRCLE :
                                    fillpercentBreak < 33 ? BREAK_CIRCLE_EMPTY :
                                        fillpercentBreak < 66 ? BREAK_CIRCLE_HALF :
                                            fillpercentBreak < 100 ? BREAK_CIRCLE_FULL : BREAK_CIRCLE_FULL
                                )}
                                dashedBackground={
                                    {
                                        width: 3,
                                        gap: 30,
                                    }
                                }
                                backgroundColor={(!this.props.SettingsStore.TIMER_RUNNING ? PAUSE_CIRCLE :
                                    fillpercentBreak < 33 ? BREAK_CIRCLE_EMPTY :
                                        fillpercentBreak < 66 ? BREAK_CIRCLE_HALF :
                                            fillpercentBreak < 100 ? BREAK_CIRCLE_FULL : BREAK_CIRCLE_FULL
                                )}
                                padding={10}
                                renderCap={({ center }) =>
                                    <Circle
                                        cx={center.x}
                                        cy={center.y}
                                        r={CIRCLE_WIDTH}

                                        fill={CIRCLE_COLOR}
                                    />
                                }
                            />
                        }
                    </TouchableOpacity>

                    {/* SAYAC VE PAUSE */}
                    <View style={[progressBarText, { flexDirection: 'row' }]}>
                        {(this.props.SettingsStore.TIMER_RUNNING && !this.props.SettingsStore.PAUSED) ?
                            <Text></Text>
                            :
                            <Icon style={{ opacity: 0.3, fontSize: windowWidth / 1.2, paddingLeft: 50, zIndex: -1 }} name="play-outline" color={COMMON_TINT} />
                        }
                        {!this.props.SettingsStore.BREAK_STAGE ?
                            <Text
                                style={progressBarText}>
                                {this.props.SettingsStore.fillRatioWorkout}
                            </Text>
                            :
                            <Text
                                style={progressBarText}>
                                {this.props.SettingsStore.fillRatioBreak}
                            </Text>
                        }
                    </View>

                    {/* BUTTONS */}
                    <View style={buttons}>
                        {/* ADD SECONDS BUTTON */}
                        <Button title="resetbutton" text="Reset" func={this.resetProgressBar} color={BUTTON_RESET_COLOR} width={WORKOUT_BUTTON_WIDTH} />
                        {/* RESET BUTTON */}
                        <Button title="addbutton" text={`+${this.props.SettingsStore.ADD_SECONDS}`} func={this.addSeconds} color={BUTTON_ADD_COLOR} width={WORKOUT_BUTTON_WIDTH} />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View></View>
            )
        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR
    },
    buttons: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        zIndex: 2
    },
    progressBarText: {
        color: '#CFD8DC',
        fontSize: 85,
        fontWeight: "bold",
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingBottom: 20,
        zIndex: -1
    }
})