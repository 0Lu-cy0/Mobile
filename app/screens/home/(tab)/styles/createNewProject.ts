import reponsive from '@/components/reponsive';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212832',
    },
    title1: {
        fontSize: 20,
        color: '#fff',
        marginLeft: reponsive.normalizeX(41),
    },
    input1: {
        marginTop: reponsive.normalizeY(13),
        marginLeft: reponsive.normalizeX(41),
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
        marginTop: reponsive.normalizeY(23),
        marginLeft: reponsive.normalizeX(41),
        width: reponsive.normalizeX(358),
        height: reponsive.normalizeY(48),
    },

});
export default styles;