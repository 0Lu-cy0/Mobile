import React from 'react';
import { View } from 'react-native';
import CustomText from '@/components/customText'; // Path to your CustomText component
import styles from './styles/createNewProject'; // Path to your styles file
import { SafeAreaView } from 'react-native-safe-area-context';
import MyInputField from '@/components/inputButton';

const createNewProject = () => {
    const [taskName, setTaskName] = React.useState('');
    return (
        <SafeAreaView style={styles.container}>
            <CustomText fontFamily='InterSemiBold' style={styles.title1}>Task Title</CustomText>
            <MyInputField
                style={styles.input1}
                value={taskName}
                onChangeText={setTaskName}
                placeholder='Enter your title...'
            />
            <CustomText fontFamily='InterSemiBold' style={styles.title2}>Task Details</CustomText>
        </SafeAreaView>
    );
};

export default createNewProject;
