import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import responsive from './reponsive';
import CustomText from "./customText";
export default function ResizableLogoBox() {
    const route = useRoute();

    // Xác định kích thước hộp dựa trên route
    const getBoxStyle = () => {
        if (route.name === "index") {
            return {
                width: responsive.normalizeWidth(94.06),
                height: responsive.normalizeHeight(61.5),
                marginTop: responsive.normalizeY(26),
            };
        } else if (route.name === "screens/login" || route.name === "screens/signup") {
            return {
                width: responsive.normalizeWidth(139),
                height: responsive.normalizeHeight(91.92),
                left: responsive.normalizeX(121),
                marginTop: responsive.normalizeY(37.5),
            };
        }
        return {};
    };

    const boxStyle = getBoxStyle();

    // Tỷ lệ ảnh và dòng chữ
    const imageWidthRatio = 91.22 / 139; // ~0.656
    const imageHeightRatio = 71.38 / 91.22; // ~0.783
    const textFontRatio = 14 / 139; // FontSize dòng chữ

    // Tính kích thước ảnh và font size dòng chữ dựa trên tỷ lệ
    const imageWidth = (boxStyle.width || 0) * imageWidthRatio;
    const imageHeight = imageWidth * imageHeightRatio;
    const fontSize = responsive.normalizeFontSize((boxStyle.width || 0) * textFontRatio);
    const textFontSize = responsive.normalizeFontSize((boxStyle.width || 0) * 0.255); // Font size lớn hơn cho DayTask

    return (
        <View style={[styles.box, boxStyle]}>
            {/* Ảnh */}
            <Image
                source={require("@/assets/images/Logo.png")}
                style={{
                    width: imageWidth,
                    height: imageHeight,
                }}
            />
            {/* Dòng chữ */}
            <Text
                style={{
                    width: boxStyle.width, // Chiều ngang bằng hộp
                    textAlign: "center",
                    fontSize: fontSize, // Responsive fontSize
                    fontFamily: 'Montserrat', // Font chung cho cả chữ
                    transform: [{ scaleX: 1.63 }, { translateX: 0 }],
                }}
            >
                <CustomText fontSize={textFontSize} >
                    <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Day</Text>
                    <Text style={{ color: '#FED36A', fontWeight: '600' }}>Task</Text>
                </CustomText>
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    box: {
        justifyContent: "center",
        alignItems: "center",
    }
});
