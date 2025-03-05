import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { uploadFile } from '@/services/appwrite/upFIle';

const Notification = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} >
            <Text>Notification</Text>
            <Button title='Chọn file và up lên' onPress={uploadFile}></Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Notification;
