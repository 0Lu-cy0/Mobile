import { Dimensions, StyleSheet } from "react-native";
import responsive from "@/components/reponsive";
const { width } = Dimensions.get('window'); // Lấy chiều rộng màn hình

const styles = StyleSheet.create({
    tabContainer: {
        width: '100%',
        height: responsive.normalizeHeight(47),
        flexDirection: 'row',
        marginTop: responsive.normalizeY(26),
    },
    chatButton: {
        marginLeft: responsive.normalizeX(29),//29
        width: responsive.normalizeWidth(175),//175
        height: responsive.normalizeHeight(47),//47
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: responsive.normalizeX(20),//29
        width: responsive.normalizeWidth(175),//175
        height: responsive.normalizeHeight(47),//47
    },
    highlightTab: {
        position: 'absolute',
        width: responsive.normalizeX(175),//175
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