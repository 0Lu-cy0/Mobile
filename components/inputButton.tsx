import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import * as Font from 'expo-font';
import reponsive from './reponsive';

interface MyInputFieldProps {
    value: string;
    onChangeText: (text: string) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconSize?: number;
    iconColor?: string;
    backgroundColor?: string;
    onRightIconPress?: () => void;
    secureTextEntry?: boolean;
    placeholder?: string;
    placeholderStyle?: TextStyle;
    multiline?: boolean;
    scrollEnabled?: boolean;
    textAlignVertical?: "auto" | "top" | "bottom" | "center";
}

const MyInputField: React.FC<MyInputFieldProps> = ({
    value,
    onChangeText,
    style,
    textStyle,
    leftIcon,
    rightIcon,
    backgroundColor = "#455A64",
    onRightIconPress,
    secureTextEntry,
    placeholder = "Enter text...",
    placeholderStyle,
    multiline,
    scrollEnabled,
    textAlignVertical,
}) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'InterReguler': require('../assets/fonts/Inter_28pt-Regular.ttf'),
            });
            setFontLoaded(true);
        };
        loadFonts();
    }, []);

    if (!fontLoaded) return null;

    return (
        <View style={[styles.container, style, { backgroundColor }]}>
            {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

            <View style={{ flex: 1, position: 'relative' }}>
                {!value && (
                    <Text style={[styles.placeholder, { fontFamily: 'InterReguler' }, placeholderStyle]}>
                        {placeholder}
                    </Text>
                )}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={[styles.input, { fontFamily: 'InterReguler' }, textStyle]}
                    secureTextEntry={secureTextEntry}
                    multiline={multiline}
                    scrollEnabled={scrollEnabled}
                    textAlignVertical={textAlignVertical}
                />
            </View>

            {rightIcon && (
                <TouchableOpacity onPress={onRightIconPress} style={styles.iconRight}>
                    {rightIcon}
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: reponsive.normalizeHeight(58),
        width: reponsive.normalizeWidth(376),
        backgroundColor: "#455A64",
    },
    iconLeft: {
        marginRight: reponsive.normalizeX(20),
        marginLeft: reponsive.normalizeX(18),
    },
    input: {
        flex: 1,
        fontSize: reponsive.normalizeFontSize(16),
        color: "#FFFFFF",
    },
    placeholder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        color: "#999",
        fontSize: reponsive.normalizeFontSize(16),
        textAlignVertical: "center",
        paddingLeft: 4,
    },
    iconRight: {
        marginRight: reponsive.normalizeX(18),
    },
});

export default MyInputField;
