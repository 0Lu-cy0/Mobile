// import { styles } from './../../../../styles/signupStyles';
import { StyleSheet } from "react-native";
import responsive from "@/components/reponsive";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212832',
        paddingHorizontal: responsive.normalizeX(22),
    },
    containerHeader: {
        position: 'absolute',
        width: responsive.normalizeWidth(376),
        top: 0,
        left: responsive.normalizeX(5),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerText1: {
        fontSize: 12.7,
        color: '#FED36A',
        left: 0,
    },
    headerText2: {
        transform: [
            { scaleX: 1.31 },     // Kéo dài theo chiều ngang
            { translateX: 12.5 }   // Dịch lại vị trí ban đầu
        ],
        fontSize: 22.29,
        color: 'white',
    },
    headerRight: {
        width: responsive.normalizeWidth(48),
        height: responsive.normalizeHeight(48),
    },
    searchAndSetting: {
        marginTop: responsive.normalizeY(13),
        width: "100%",
        height: responsive.normalizeHeight(58),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    search: {
        width: responsive.normalizeWidth(311),
        height: '100%'
    },
    setting: {
        width: responsive.normalizeWidth(58),
        height: "100%",
        backgroundColor: '#FED36A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    settingImage: {
        width: responsive.normalizeWidth(24),
        height: responsive.normalizeHeight(24),
        resizeMode: 'contain',
    },
    completedProject: {
        marginTop: responsive.normalizeY(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ongoingProject: {
        marginTop: responsive.normalizeY(-134),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title1: {
        fontSize: 26,
        lineHeight: 26,
        color: 'white',
    },
    title2: {
        fontSize: 20,
        lineHeight: 25,
        color: '#FED36A',
    },
    title3: {
        position: 'absolute',
        fontSize: 20,
        color: 'white',
        top: responsive.normalizeY(390),
        left: responsive.normalizeX(22),
    },
    title4: {
        position: 'absolute',
        fontSize: 16,
        lineHeight: 26,
        color: '#FED36A',
        top: responsive.normalizeY(390),
        left: responsive.normalizeX(356),
    },
    scrollViewContent: {
        marginTop: responsive.normalizeY(16),
    },
    box: {
        flex: 1,
        width: responsive.normalizeWidth(183),
        height: responsive.normalizeHeight(175),
        backgroundColor: '#FED36A',
        paddingHorizontal: responsive.normalizeX(10),
        paddingVertical: responsive.normalizeY(10),
        justifyContent: 'space-between',

    },
    titleBoxSelectedBox: {
        transform: [
            { scaleX: 1.63 },     // Kéo dài theo chiều ngang
            { translateX: 27.5 }   // Dịch lại vị trí ban đầu
        ],
        fontSize: 21,
        color: '#000000',
    },
    titleBoxUnSelected: {
        transform: [
            { scaleX: 1.59 },     // Kéo dài theo chiều ngang
            { translateX: 60.6 }   // Dịch lại vị trí ban đầu
        ],
        fontSize: 21,
        color: '#FFFFFF',
    },
    teamMemberConntainer: {
        flexDirection: 'row', // Xếp theo chiều ngang
        alignItems: 'center',
    },
    teamMember: {
        width: responsive.normalizeWidth(71),
        height: responsive.normalizeHeight(20),
        marginLeft: responsive.normalizeX(10),
    },
    circle1: {
        width: responsive.normalizeWidth(20), // Kích thước đường kính hình tròn
        height: responsive.normalizeHeight(20),
        borderRadius: 50, // Biến hình vuông thành hình tròn
        backgroundColor: 'blue',
    },
    circle2: {
        position: 'absolute',
        width: responsive.normalizeWidth(20), // Kích thước đường kính hình tròn
        height: responsive.normalizeHeight(20),
        borderRadius: 50,
        backgroundColor: 'green',
        marginLeft: responsive.normalizeX(13),
    },
    circle3: {
        position: 'absolute',
        width: responsive.normalizeWidth(20), // Kích thước đường kính hình tròn
        height: responsive.normalizeHeight(20),
        borderRadius: 50,
        backgroundColor: 'yellow',
        marginLeft: responsive.normalizeX(26),
    },
    circle4: {
        position: 'absolute',
        width: responsive.normalizeWidth(20), // Kích thước đường kính hình tròn
        height: responsive.normalizeHeight(20),
        borderRadius: 50,
        backgroundColor: 'white',
        marginLeft: responsive.normalizeX(39),
    },
    circle5: {
        position: 'absolute',
        width: responsive.normalizeWidth(20), // Kích thước đường kính hình tròn
        height: responsive.normalizeHeight(20),
        borderRadius: 50,
        backgroundColor: 'green',
        marginLeft: responsive.normalizeX(52),
    },
    progressBox: {
        width: responsive.normalizeWidth(164),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollViewContentVertically: {
        marginTop: responsive.normalizeY(16),
        paddingBottom: responsive.normalizeY(20), // Để tạo không gian dưới cùng
    },
    box1: {
        width: responsive.normalizeWidth(384),
        height: responsive.normalizeHeight(125),
        backgroundColor: '#455A64',
        paddingTop: responsive.normalizeY(10),
        paddingRight: responsive.normalizeX(10),
        paddingBottom: responsive.normalizeY(10),
        paddingLeft: responsive.normalizeX(10),
        justifyContent: 'space-between',
    },
    box2: {
        height: responsive.normalizeHeight(67),
    },
    teamMemberProject: {
        height: responsive.normalizeHeight(45),
        width: responsive.normalizeWidth(84),
        justifyContent: 'space-between'
    },
    completed: {
        position: 'absolute',
        left: responsive.normalizeX(303),
        top: responsive.normalizeY(5),
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default styles;
