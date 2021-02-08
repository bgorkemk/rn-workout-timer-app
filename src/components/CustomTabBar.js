import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyles from '../styles/AppStyles';

const {
    windowHeight,
    FONT_COLOR,
    HEADER_COLOR,
    WORKOUT_CIRCLE_FULL,
    BACKGROUND_COLOR
} = AppStyles;

export function CustomTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    const { touchableOpacityStyle } = styles

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                switch (label) {
                    case 'Workout':
                        {
                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    onPress={onPress}
                                    style={touchableOpacityStyle}>
                                    {
                                        isFocused ?
                                            <Icon name="chevron-right" size={15} style={{ paddingRight: 10 }} color={FONT_COLOR} />
                                            :
                                            <View></View>
                                    }
                                    <Icon name="dumbbell" size={28} color={isFocused ? WORKOUT_CIRCLE_FULL : FONT_COLOR} />
                                    {
                                        isFocused ?
                                            <Icon name="chevron-left" size={15} style={{ paddingLeft: 10 }} color={FONT_COLOR} />
                                            :
                                            <View></View>
                                    }
                                </TouchableOpacity>
                            )
                        }
                        break;
                    case 'Info':
                        {
                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    onPress={onPress}
                                    style={touchableOpacityStyle}>
                                    {
                                        // info info icon
                                        isFocused ?
                                            <Icon name="chevron-right" size={15} style={{ paddingRight: 10 }} color={WORKOUT_CIRCLE_FULL} />
                                            :
                                            <View></View>
                                    }
                                    <Icon name="calendar-alt" size={28} color={FONT_COLOR} />
                                    {
                                        isFocused ?
                                            <Icon name="chevron-left" size={15} style={{ paddingLeft: 10 }} color={WORKOUT_CIRCLE_FULL} />
                                            :
                                            <View></View>
                                    }
                                </TouchableOpacity>
                            )
                        }
                        break;
                    case 'Settings':
                        {
                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    onPress={onPress}
                                    style={touchableOpacityStyle}>
                                    {
                                        isFocused ?
                                            <Icon name="chevron-right" size={15} style={{ paddingRight: 10 }} color={WORKOUT_CIRCLE_FULL} />
                                            :
                                            <View></View>
                                    }
                                    <Icon name="cog" size={28} color={FONT_COLOR} />
                                    {
                                        isFocused ?
                                            <Icon name="chevron-left" size={15} style={{ paddingLeft: 10 }} color={WORKOUT_CIRCLE_FULL} />
                                            :
                                            <View></View>
                                    }
                                </TouchableOpacity>
                            )
                        }
                        break;
                    default:
                        {
                            return (
                                <Text>asdsad</Text>
                            )
                        }
                        break;
                }
            })}
        </View >
    );
}


const styles = StyleSheet.create({
    touchableOpacityStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR,
        height: windowHeight / 14,
        borderColor: BACKGROUND_COLOR,
        borderWidth: 2,
        borderTopColor: HEADER_COLOR,
        borderRightColor: HEADER_COLOR
    },
    touchableOpacityWorkout: {

    }
})