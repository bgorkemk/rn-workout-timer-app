import { Dimensions } from 'react-native';


const AppStyles = {
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
    // COLOR PALETTE
    BACKGROUND_COLOR: '#22272c',
    HEADER_COLOR: '#546E7A',

    WORKOUT_CIRCLE_FULL: "#AD100B",
    WORKOUT_CIRCLE_HALF: "#D9130B",
    WORKOUT_CIRCLE_EMPTY: "#FF2214",

    BREAK_CIRCLE_FULL: "#055902",
    BREAK_CIRCLE_HALF: "#078C03",
    BREAK_CIRCLE_EMPTY: "#09A603",

    PAUSE_CIRCLE: "#E65100",
    PAUSE_TINT: "#E65100",

    COMMON_TINT: "#546E7A",

    HEADER_WORKOUT: "#C62828",
    HEADER_BREAK: "#2E7D32",

    CIRCLE_COLOR: "#CFD8DC",
    FONT_COLOR: "#E8F5E9",


    BUTTON_ADD_COLOR: "#1976D2",
    BUTTON_RESET_COLOR: "#FF6F00",
    BUTTON_START_COLOR: "#00695C",
    BUTTON_STOP_COLOR: "#D50000",


    COLOR_SETTINGS_ELEMENT_TEXT: "#757575",
    COLOR_SETTINGS_ELEMENT_INPUT: "#BDBDBD",

    // DIMENSIONS
    CIRCLE_WIDTH: Dimensions.get('window').width / 50,
    WORKOUT_BUTTON_WIDTH: Dimensions.get('window').width / 2.5,
    WORKOUT_BUTTON_HEIGHT: Dimensions.get('window').height / 9,

    SETTINGS_BUTTON_WIDTH: Dimensions.get('window').width - 40,
    SETTINGS_BUTTON_HEIGHT: Dimensions.get('window').height / 9,
    
    SETTINGS_ELEMENT_HEIGHT: Dimensions.get('window').height / 9.5,

    BORDER_RADIUS: 15,

}

export default AppStyles;