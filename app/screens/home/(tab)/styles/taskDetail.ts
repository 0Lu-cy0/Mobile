import { Dimensions, StyleSheet } from "react-native";
import responsive from "@/components/reponsive";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212832',
        paddingHorizontal: responsive.normalizeX(29),
    },
    headTitle: {
        fontSize: 20,
        color: '#fff',
    },
    header: {
        marginTop: responsive.normalizeY(123), // Đẩy nội dung xuống dưới Head
        transform: [
            { scaleX: 1.62 },     // Kéo dài theo chiều ngang
            { translateX: 62.7 }   // Dịch lại vị trí ban đầu
        ],
    },
    info: {
        fontSize: 21,
        color: '#fff',
    },
    dateAndTeam: {
        top: responsive.normalizeY(27),
        width: responsive.normalizeWidth(400),
        height: responsive.normalizeHeight(47),
        flexDirection: 'row',
    },
    date: {
        width: responsive.normalizeWidth(47),
        height: responsive.normalizeHeight(47),
        backgroundColor: '#FED36A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateImage: {
        width: responsive.normalizeWidth(24),
        height: responsive.normalizeHeight(24),
        resizeMode: 'contain',
    },
    textDate: {
        width: responsive.normalizeWidth(110),
        height: responsive.normalizeHeight(47),
        paddingVertical: responsive.normalizeHeight(5),
        paddingLeft: responsive.normalizeX(14),
        justifyContent: 'space-between',
    },
    dueDate: {
        fontSize: 11,
        color: '#8CAAB9',
    },
    dateText: {
        fontSize: 17,
        color: '#FFFFFF',
    },
    team: {
        position: 'absolute',
        width: responsive.normalizeWidth(47),
        height: responsive.normalizeHeight(47),
        backgroundColor: '#FED36A',
        left: responsive.normalizeX(208),
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamImage: {
        width: responsive.normalizeWidth(60),
        height: responsive.normalizeHeight(47),
        backgroundColor: 'red',
    },
    textTeam: {
        width: responsive.normalizeWidth(90),
        height: responsive.normalizeHeight(47),
        left: responsive.normalizeX(98),
        paddingVertical: responsive.normalizeHeight(5),
        paddingLeft: responsive.normalizeX(14),
        justifyContent: 'space-between',
    },
    teamMember: {
        width: responsive.normalizeWidth(71),
        height: responsive.normalizeHeight(20),
    },
    teamMemberCircle: {
        flexDirection: 'row', // Hiển thị các hình tròn theo hàng ngang
        position: 'relative', // Đảm bảo các hình tròn có thể được định vị
    },
    circle: {
        position: 'absolute',
        width: responsive.normalizeWidth(20), // Kích thước đường kính hình tròn
        height: responsive.normalizeHeight(20),
        borderRadius: 50, // Biến hình vuông thành hình tròn
        backgroundColor: 'blue',
    },
    details: {
        position: 'absolute',
        left: responsive.normalizeX(29),
        top: responsive.normalizeY(253),//253
        width: responsive.normalizeWidth(350),
        height: responsive.normalizeHeight(119),
        // justifyContent: 'space-between',
    },
    projectDetails: {
        fontSize: responsive.normalizeFontSize(24.15),
        color: 'white',
        lineHeight: 21.5
    },
    textDetails: {
        marginTop: 5,
        fontSize: responsive.normalizeFontSize(17),
        color: '#BCCFD8',
        lineHeight: 18.5
    },
    progress: {
        position: 'absolute',
        left: responsive.normalizeX(29),
        top: responsive.normalizeY(375),//375
        width: responsive.normalizeWidth(370),
        height: responsive.normalizeHeight(59),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressText: {
        fontSize: responsive.normalizeFontSize(24.15),
        color: 'white',
        lineHeight: 21.5
    },
    completed: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    allTask: {
        position: 'absolute',
        left: responsive.normalizeX(29),
        top: responsive.normalizeY(453),//453
        width: responsive.normalizeWidth(77),
        height: responsive.normalizeHeight(22),
    },
    allTaskText: {
        fontSize: responsive.normalizeFontSize(24.15),
        color: 'white',
        lineHeight: 21.5
    },
    flashList: {
        flex: 1,
        top: responsive.normalizeY(298),
        width: '100%',
        height: responsive.normalizeHeight(200),
    },

    flashListContent: {
        paddingBottom: 400, // Khoảng cách dưới cùng
    },

    box: {
        height: responsive.normalizeHeight(58), // Chiều cao hộp
        backgroundColor: '#455A64',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 19,
        paddingRight: 10,
    },
    boxText: {
        fontSize: responsive.normalizeFontSize(24.15),
        color: 'white',
        lineHeight: 21.5
    },
    boxIcon: {
        height: responsive.normalizeHeight(40),
        width: responsive.normalizeWidth(40),
        backgroundColor: '#FED36A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addTask: {
        position: 'absolute',
        bottom: 0,
        width: 400,
        left: 0,
        height: responsive.normalizeHeight(114),
        backgroundColor: '#263238',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addTaskButton: {
        width: responsive.normalizeWidth(318),
        height: responsive.normalizeHeight(57),
        backgroundColor: '#FED36A',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '86.75%',
        height: responsive.normalizeHeight(270),
        backgroundColor: '#263238',
        padding: 20,
        alignItems: 'center',
    },
    exitBox: {
        width: responsive.normalizeWidth(30),
        height: responsive.normalizeHeight(30),
        right: responsive.normalizeX(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteChange: {
        width: responsive.normalizeWidth(358),
        height: responsive.normalizeHeight(48),
        flexDirection: 'row',
        marginTop: responsive.normalizeY(20),
    },
    Delete: {
        width: responsive.normalizeWidth(176),
        height: '100%',
        marginRight: responsive.normalizeX(6)
    },
    Change: {
        width: responsive.normalizeWidth(176),
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: responsive.normalizeY(5),
        left: responsive.normalizeX(350),
    },
    closeText: {
        fontSize: 18,
        color: 'white',
    },
    nameTask: {
        top: responsive.normalizeY(20),
        width: responsive.normalizeWidth(358),
        height: responsive.normalizeHeight(48),
    },
    dateTime: {
        marginTop: responsive.normalizeY(40),
        width: responsive.normalizeWidth(358),
        height: responsive.normalizeHeight(41),
        flexDirection: 'row',
    },
    Time: {
        width: responsive.normalizeWidth(176),
        height: '100%',
        flexDirection: 'row',
        marginRight: responsive.normalizeX(6),
    },
    timeIcon: {
        width: responsive.normalizeWidth(41),
        height: '100%',
        backgroundColor: '#FED36A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeView: {
        width: responsive.normalizeWidth(135),
        height: '100%',
        backgroundColor: '#455A64'
    },
    Date: {
        width: responsive.normalizeWidth(176),
        height: '100%',
        flexDirection: 'row',
    },
    dateIcon: {
        width: responsive.normalizeWidth(41),
        height: '100%',
        backgroundColor: '#FED36A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateView: {
        width: responsive.normalizeWidth(135),
        height: '100%',
        backgroundColor: '#455A64'
    },
    Add: {
        marginTop: responsive.normalizeY(20),
        width: responsive.normalizeWidth(310),
        height: responsive.normalizeHeight(58),
        backgroundColor: '#FED36A',
    },
});

export default styles;