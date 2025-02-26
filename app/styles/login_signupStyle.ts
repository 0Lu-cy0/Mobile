import { StyleSheet } from "react-native";
import responsive from "@/components/reponsive";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212832"
    },
    text1: {
        fontSize: 26,
        lineHeight: 26,
        position: "absolute",
        color: "#FFFFFF",
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(179),

    },
    text2: {
        fontSize: 18,
        lineHeight: 18,
        position: "absolute",
        color: "#8CAAB9",
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(218),
    },
    text3: {
        fontSize: 18,
        lineHeight: 18,
        position: "absolute",
        color: "#8CAAB9",
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(338),
    },
    text4: {
        fontSize: 16,
        lineHeight: 16,
        position: "absolute",
        color: "#8CAAB9",
        left: responsive.normalizeX(283),
        top: responsive.normalizeY(442),
    },
    text5: {
        // position: "absolute",
        color: "#8CAAB9",
        textAlign: "center",
        top: responsive.normalizeY(601),
    },
    text6: {
        fontSize: 18,
        lineHeight: 18,
        position: "absolute",
        color: "#8CAAB9",
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(458),
    },
    text7: {
        fontSize: 14,
        lineHeight: 20.5,
        color: "#8CAAB9",
    },
    text8: {
        color: "#8CAAB9",
        textAlign: "center",
        top: responsive.normalizeY(710),
    },
    inputEmail: {
        position: "absolute",
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(253),
    },
    inputPassword: {
        position: "absolute",
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(373),
    },
    signUpPassword: {
        position: "absolute",
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(493),
    },
    termsContainer: {
        position: "absolute",
        flexDirection: "row",
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(568),
    },
    textTermsContainer: {
        position: "absolute",
        flexDirection: "row",
        left: responsive.normalizeX(36),
    },
    loginButton: {
        position: "absolute",
        width: responsive.normalizeWidth(376),
        height: responsive.normalizeHeight(67),
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(499),
        justifyContent: "center",
        alignItems: "center",
    },
    signnupButton: {
        position: "absolute",
        width: responsive.normalizeWidth(376),
        height: responsive.normalizeHeight(67),
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(639),
        justifyContent: "center",
        alignItems: "center",
    },
    line1: {
        borderWidth: 1,
        position: "absolute",
        borderColor: "#8CAAB9",
        width: responsive.normalizeWidth(111),
        height: 0,
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(613),
    },
    line2: {
        borderWidth: 1,
        position: "absolute",
        borderColor: "#8CAAB9",
        width: responsive.normalizeWidth(111),
        height: 0,
        left: responsive.normalizeX(291),
        top: responsive.normalizeY(613),
    },
    line1Sign: {
        borderWidth: 1,
        position: "absolute",
        borderColor: "#8CAAB9",
        width: responsive.normalizeWidth(111),
        height: 0,
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(749),
    },
    line2Sign: {
        borderWidth: 1,
        position: "absolute",
        borderColor: "#8CAAB9",
        width: responsive.normalizeWidth(111),
        height: 0,
        left: responsive.normalizeX(291),
        top: responsive.normalizeY(749),
    },
    googleButton: {
        position: "absolute",
        width: responsive.normalizeWidth(376),
        height: responsive.normalizeHeight(67),
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(659),
        borderWidth: 1,
        borderColor: '#FFFFFF'

    },
    googleButtonSign: {
        position: "absolute",
        width: responsive.normalizeWidth(376),
        height: responsive.normalizeHeight(67),
        left: responsive.normalizeX(26),
        top: responsive.normalizeY(795),
        borderWidth: 1,
        borderColor: '#FFFFFF'

    },
    googleIconStyle: {
        // position: "absolute",
        width: 24,
        height: 24,
        left: responsive.normalizeX(-13),
    },
    signUpPageTransition: {
        position: "absolute",
        flexDirection: "row",
        left: responsive.normalizeX(118),
        top: responsive.normalizeY(751),
    },
    logInPageTransition: {
        position: "absolute",
        flexDirection: "row",
        left: responsive.normalizeX(118),
        top: responsive.normalizeY(887),
    }

});

export default styles;
