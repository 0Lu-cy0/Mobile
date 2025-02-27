import Head from '@/components/head';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} >
            {/* <Head
                // onLeftPress={handleGoBack} // Hàm xử lý quay lại
                showRightIcon={false} // Hàm xử lý thêm mới
            >
                <CustomText style={[{ fontFamily: 'Inter' }, styles.headTitle]}>Task Details</CustomText>
            </Head> */}
            <Text>Profile</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Profile;
