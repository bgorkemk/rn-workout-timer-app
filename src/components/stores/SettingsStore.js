import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, autorun, observable } from 'mobx';


const appSettings_default = {
    TIMER_INTERVAL: "1000",
    TIMEOUT_SEC: "1000",
    MAX_POINTS_WORKOUT: "60",
    MAX_POINTS_BREAK: "30",
    RED_TITLE: "Workout",
    GREEN_TITLE: "Break",
    ADD_SECONDS: "15",
    VOLUME: "1",
    FIRST_TIME: "FIRST_TIME"
}


class SettingsStore {
    constructor() {
        autorun(() => {
            this.loadDataForFirstTime()
        })
    }


    @observable TIMER_INTERVAL = 1;
    @observable TIMEOUT_SEC = 1;
    @observable MAX_POINTS_WORKOUT = 1;
    @observable MAX_POINTS_BREAK = 1;
    @observable fillRatioWorkout = 1;
    @observable fillRatioBreak = 1;
    @observable NEW_MAX_POINTS_WORKOUT = 1;
    @observable NEW_MAX_POINTS_BREAK = 1;
    @observable RED_TITLE = "";
    @observable GREEN_TITLE = "";
    @observable ADD_SECONDS = 1;
    @observable VOLUME = 1;
    @observable BREAK_STAGE = false;
    @observable START_AFTER_RESET = false;
    @observable TIMER_RUNNING = false;
    @observable PAUSED = false;

    @observable Changed_RED_TITLE = "";
    @observable Changed_GREEN_TITLE = "";
    @observable Changed_MAX_POINTS_WORKOUT = 1;
    @observable Changed_MAX_POINTS_BREAK = 1;
    // @observable Changed_TIMER_INTERVAL = 1;
    @observable Changed_ADD_SECONDS = 1;

    // MAKE DEFAUT BUTTON
    // TIMER INTERVALİN 100DEN KÜCÜK OLMAMA KONTROLÜ

    @action async applySettings() {
        try {
            if (this.Changed_ADD_SECONDS.toString() != "") {
                await AsyncStorage.setItem('RED_TITLE', this.Changed_RED_TITLE);
            }
            if (this.Changed_ADD_SECONDS.toString() != "") {
                await AsyncStorage.setItem('GREEN_TITLE', this.Changed_GREEN_TITLE);
            }
            if (this.Changed_MAX_POINTS_WORKOUT.toString() != "") {
                if (this.Changed_MAX_POINTS_WORKOUT <= 0) {
                    this.Changed_MAX_POINTS_WORKOUT = 1
                }
                await AsyncStorage.setItem('MAX_POINTS_WORKOUT', (this.Changed_MAX_POINTS_WORKOUT).toString());
            }
            if (this.Changed_MAX_POINTS_BREAK.toString() != "") {
                if (this.Changed_MAX_POINTS_BREAK <= 0) {
                    this.Changed_MAX_POINTS_BREAK = 1
                }
                await AsyncStorage.setItem('MAX_POINTS_BREAK', (this.Changed_MAX_POINTS_BREAK).toString());
            }
            // OLD FUNC DONT NECESSARY
            // if (this.Changed_TIMER_INTERVAL.toString() != "") {
            //     await AsyncStorage.setItem('TIMER_INTERVAL', (this.Changed_TIMER_INTERVAL).toString());
            // }
            if (this.Changed_ADD_SECONDS.toString() != "") {
                await AsyncStorage.setItem('ADD_SECONDS', (this.Changed_ADD_SECONDS).toString());
            }
            this.getAppSettings()
        } catch (error) {
            console.log(error)
        }
        // this.setAppSettings({
        //     TIMER_INTERVAL : "1000", 
        //     TIMEOUT_SEC : "1000", 
        //     MAX_POINTS_WORKOUT : "60", 
        //     MAX_POINTS_BREAK : "30", 
        //     RED_TITLE : "WORKOUT", 
        //     GREEN_TITLE : "BREAK", 
        //     ADD_SECONDS : "15", 
        //     VOLUME : "1", 
        //     FIRST_TIME : "FIRST_TIME"
        // })
    }

    @action setText(value, type) {
        switch (type) {
            case 'RED_TITLE':
                this.Changed_RED_TITLE = value
                break;
            case 'GREEN_TITLE':
                this.Changed_GREEN_TITLE = value
                break;
            case 'MAX_POINTS_WORKOUT':
                value = value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '') // numeric-pad control            
                this.Changed_MAX_POINTS_WORKOUT = (value)
                break;
            case 'MAX_POINTS_BREAK':
                value = value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '') // numeric-pad control
                this.Changed_MAX_POINTS_BREAK = (value)
                break;
            case 'TIMER_INTERVAL':
                value = value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '') // numeric-pad control
                this.Changed_TIMER_INTERVAL = (value)
                break;
            case 'ADD_SECONDS':
                value = value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '') // numeric-pad control
                this.Changed_ADD_SECONDS = (value)
                break;
            default:
                break;
        }
    }

    @action async loadDataForFirstTime() {
        // İLK KEZ YÜKLENME DENETİMİ
        try {
            await AsyncStorage.getItem('FIRST_TIME').then(result => {
                if (result != null) {
                    // console.log('ESKİ KULLANICI ESKİ AYARLAR YÜKLENİYOR')                    
                    // this.setAppSettings(appSettings_default);
                    this.getAppSettings();
                } else {
                    // console.log('YENİ KULLANICI YENİ AYARLAR KURULACAK VE YÜKLENECEK')
                    this.setAppSettings(appSettings_default);
                    this.getAppSettings();
                }
            })
        } catch (error) {

        }

    }

    @action async defaultSettings() {
        this.setAppSettings(appSettings_default);
        this.getAppSettings();
    }

    @action changeValueFillRatioWorkout(value) {
        this.fillRatioWorkout = value
        // console.log('degisti', this.fillRatioWorkout)
    }

    @action changeValueFillRatioBreak(value) {
        this.fillRatioBreak = value
        // console.log('degisti', this.fillRatioBreak)
    }

    @action changeValueNewMaxWorkout(value) {
        this.NEW_MAX_POINTS_WORKOUT = value
        // console.log('degisti', this.fillRatioWorkout)
    }

    @action changeValueNewMaxBreak(value) {
        this.NEW_MAX_POINTS_BREAK = value
        // console.log('degisti', this.fillRatioWorkout)
    }

    @action changeAppStage() {
        if (this.BREAK_STAGE || !this.BREAK_STAGE) {
            this.BREAK_STAGE = !this.BREAK_STAGE
            this.getAppSettings();
        }
    }

    @action toggleAppStage() {
        if (this.BREAK_STAGE || !this.BREAK_STAGE) {
            this.BREAK_STAGE = !this.BREAK_STAGE
            this.getAppSettings();
        }
        if (this.TIMER_RUNNING) {
            this.changeTimerRunning(false)
        }
    }

    @action changeTimerRunning(state) {
        this.TIMER_RUNNING = state
    }

    @action changePause(state) {
        this.TIMER_RUNNING = state
    }



    setAppSettings = async (data) => {
        try {
            await AsyncStorage.setItem('TIMER_INTERVAL', data.TIMER_INTERVAL)
            await AsyncStorage.setItem('TIMEOUT_SEC', data.TIMEOUT_SEC)
            await AsyncStorage.setItem('MAX_POINTS_WORKOUT', data.MAX_POINTS_WORKOUT)
            await AsyncStorage.setItem('MAX_POINTS_BREAK', data.MAX_POINTS_BREAK)
            await AsyncStorage.setItem('RED_TITLE', data.RED_TITLE)
            await AsyncStorage.setItem('GREEN_TITLE', data.GREEN_TITLE)
            await AsyncStorage.setItem('ADD_SECONDS', data.ADD_SECONDS)
            await AsyncStorage.setItem('VOLUME', data.VOLUME)
            await AsyncStorage.setItem('FIRST_TIME', data.FIRST_TIME)
            console.log('YENİ AYARLAR KAYDEDİLDİ')
        } catch (error) {

        }
    }

    getAppSettings = async () => {

        try {
            this.TIMER_INTERVAL = parseInt(await AsyncStorage.getItem('TIMER_INTERVAL'))
            this.TIMEOUT_SEC = parseInt(await AsyncStorage.getItem('TIMEOUT_SEC'))
            this.MAX_POINTS_WORKOUT = parseInt(await AsyncStorage.getItem('MAX_POINTS_WORKOUT'))
            this.MAX_POINTS_BREAK = parseInt(await AsyncStorage.getItem('MAX_POINTS_BREAK'))
            this.RED_TITLE = await AsyncStorage.getItem('RED_TITLE')
            this.GREEN_TITLE = await AsyncStorage.getItem('GREEN_TITLE')
            this.ADD_SECONDS = parseInt(await AsyncStorage.getItem('ADD_SECONDS'))
            this.VOLUME = parseInt(await AsyncStorage.getItem('VOLUME'))
        } catch (error) {

        }

        this.fillRatioWorkout = this.MAX_POINTS_WORKOUT;
        this.fillRatioBreak = this.MAX_POINTS_BREAK;

        this.NEW_MAX_POINTS_WORKOUT = this.MAX_POINTS_WORKOUT
        this.NEW_MAX_POINTS_BREAK = this.MAX_POINTS_BREAK;

        //alphabet
        this.Changed_RED_TITLE = this.RED_TITLE;
        this.Changed_GREEN_TITLE = this.GREEN_TITLE

        //numeric
        this.Changed_MAX_POINTS_WORKOUT = this.MAX_POINTS_WORKOUT
        this.Changed_MAX_POINTS_BREAK = this.MAX_POINTS_BREAK
        // this.Changed_TIMER_INTERVAL = this.TIMER_INTERVAL
        this.Changed_ADD_SECONDS = this.ADD_SECONDS


        console.log('AYARLAR YÜKLENDİ')
    }
}

export default new SettingsStore();