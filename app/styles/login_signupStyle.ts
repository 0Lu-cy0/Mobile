import { StyleSheet } from "react-native";
import responsive from "@/components/reponsive";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212832",
        paddingHorizontal: responsive.normalizeX(26),
    },
    text1: {
        fontSize: 26,
        lineHeight: 26,
        color: "#FFFFFF",
        marginTop: responsive.normalizeY(43),
    },
    text2: {
        fontSize: 18,
        lineHeight: 18,
        color: "#8CAAB9",
        marginTop: responsive.normalizeY(23),
    },
    text3: {
        fontSize: 18,
        lineHeight: 18,
        color: "#8CAAB9",
        marginTop: responsive.normalizeY(30),
    },
    text4: {
        fontSize: 16,
        lineHeight: 16,
        color: "#8CAAB9",
        textAlign: "right",
        marginTop: responsive.normalizeY(14),
    },
    text7: {
        fontSize: 14,
        lineHeight: 20.5,
        color: "#8CAAB9",
    },
    inputEmailAndPassword: {
        marginTop: responsive.normalizeY(16),
    },
    termsContainer: {
        flexDirection: "row",
        marginTop: responsive.normalizeY(18),
    },
    textTermsContainer: {
        position: "absolute",
        flexDirection: "row",
        marginLeft: responsive.normalizeX(36),
    },
    loginButton: {
        width: '100%',
        height: responsive.normalizeHeight(67),
        marginTop: responsive.normalizeY(34),
        justifyContent: "center",
        alignItems: "center",
    },
    signUpButton: {
        width: "100%",
        height: responsive.normalizeHeight(67),
        marginTop: responsive.normalizeY(52),
        justifyContent: "center",
        alignItems: "center",
    },
    lineSignIn_Up: {
        marginTop: responsive.normalizeY(35),
    },
    googleButton: {
        width: "100%",
        height: responsive.normalizeHeight(67),
        marginTop: responsive.normalizeY(38),
        borderWidth: 1,
        borderColor: '#FFFFFF'
    },
    googleIconStyle: {
        width: 24,
        height: 24,
        left: responsive.normalizeX(-13),
    },
    PageTransition: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: "row",
        marginTop: responsive.normalizeY(24),
    },
});

export default styles;
