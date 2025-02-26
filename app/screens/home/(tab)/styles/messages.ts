import { Dimensions, StyleSheet } from "react-native";
import responsive from "@/components/reponsive";
const { width } = Dimensions.get('window'); // Lấy chiều rộng màn hình

const styles = StyleSheet.create({
    chatButton: {
        left: responsive.normalizeX(29),
        top: responsive.normalizeY(26),
        width: responsive.normalizeX(175),
        height: responsive.normalizeY(47),
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupsButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: responsive.normalizeX(224),
        top: responsive.normalizeY(26),
        width: responsive.normalizeX(175),
        height: responsive.normalizeY(47),
    },
    highlightTab: {
        position: 'absolute',
        top: responsive.normalizeY(26),
        width: responsive.normalizeX(175),
        height: responsive.normalizeY(47),
        backgroundColor: '#FED36A',
    },
    largeBox: {
        width: width,
        height: 300,
        backgroundColor: 'red',
        marginTop: responsive.normalizeY(100),
        justifyContent: 'center',
        alignItems: 'center',

    },
    groupBox: {
        width: width,
        height: 300,
        backgroundColor: 'yellow',
        marginTop: responsive.normalizeY(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallBox: {
        width: responsive.normalizeX(100),
        height: responsive.normalizeY(40),
        marginBottom: responsive.normalizeY(10),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212832',
    },
    spinner: {
        width: 50,
        height: 50,
        borderWidth: 5,
        borderColor: '#FED36A',
        borderTopColor: 'transparent',
        borderRadius: 25,
    },
});

export default styles;