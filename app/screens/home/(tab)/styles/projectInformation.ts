import reponsive from '@/components/reponsive';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212832',
    },
    headTitle: {
        fontSize: 20,
        color: '#fff',
    },
    title1: {
        marginTop: reponsive.normalizeY(105), // Đẩy nội dung xuống dưới Head
        fontSize: 20,
        color: '#fff',
        marginLeft: reponsive.normalizeX(41),
    },
    input1: {
        marginTop: reponsive.normalizeY(13),
        marginLeft: reponsive.normalizeX(41),
        paddingLeft: reponsive.normalizeX(25.5),
        paddingRight: reponsive.normalizeX(25.5),
        width: reponsive.normalizeX(358),
        height: reponsive.normalizeY(48),
    },
    title2: {
        fontSize: 20,
        color: '#fff',
        marginTop: reponsive.normalizeY(29),
        marginLeft: reponsive.normalizeX(41),
    },
    input2: {
        marginTop: reponsive.normalizeY(20),
        marginLeft: reponsive.normalizeX(41),
        paddingLeft: reponsive.normalizeX(25.5),
        paddingRight: reponsive.normalizeX(25.5),
        paddingBottom: reponsive.normalizeY(9),
        width: reponsive.normalizeX(358),
        height: reponsive.normalizeY(82),
    },
    box1: {
        marginTop: reponsive.normalizeY(20),
        marginLeft: reponsive.normalizeX(41),
        width: reponsive.normalizeX(358),
        height: reponsive.normalizeY(41),
        flexDirection: "row",
    },
    temMember: {
        width: reponsive.normalizeX(309),
        height: "100%",
    },
    addTeamMember: {
        marginLeft: reponsive.normalizeX(8),
        width: reponsive.normalizeX(41),
        paddingVertical: 0,
        paddingHorizontal: 0,
        height: "100%",
        backgroundColor: "#FED36A",
        justifyContent: 'center',
        alignItems: 'center',
    },
    box2: {
        marginTop: reponsive.normalizeY(20),
        marginLeft: reponsive.normalizeX(41),
        width: reponsive.normalizeX(358),
        height: reponsive.normalizeY(41),
        flexDirection: 'row',
    },
    Time: {
        width: reponsive.normalizeWidth(176),
        height: '100%',
        flexDirection: 'row',
        marginRight: reponsive.normalizeX(6),
    },
    timeIcon: {
        width: reponsive.normalizeWidth(41),
        height: '100%',
        backgroundColor: '#FED36A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeView: {
        width: reponsive.normalizeWidth(135),
        height: '100%',
        backgroundColor: '#455A64',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Date: {
        width: reponsive.normalizeWidth(176),
        height: '100%',
        flexDirection: 'row',
    },
    dateIcon: {
        width: reponsive.normalizeWidth(41),
        height: '100%',
        backgroundColor: '#FED36A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateView: {
        width: reponsive.normalizeWidth(135),
        height: '100%',
        backgroundColor: '#455A64',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteChange: {
        marginTop: reponsive.normalizeY(70),
        marginLeft: reponsive.normalizeX(41),
        marginRight: reponsive.normalizeX(29),
        height: reponsive.normalizeY(48),
        flexDirection: 'row',

    },
    Delete: {
        width: reponsive.normalizeWidth(176),
        height: '100%',
        marginRight: reponsive.normalizeX(6)
    },
    Change: {
        width: reponsive.normalizeWidth(176),
        height: '100%',
    },
});
export default styles;