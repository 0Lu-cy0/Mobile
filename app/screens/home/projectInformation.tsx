import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import CustomText from '@/components/customText';
import styles from '@/app/screens/home/(tab)/styles/projectInformation';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyInputField from '@/components/inputButton';
import MyButton from '@/components/myButton';
import AddTeamMemberFlashList from '@/components/addTeamMemberFlashList';
import DateTimePicker from '@react-native-community/datetimepicker';
import Head from '@/components/head';
import { router } from 'expo-router';

const ProjectInformation: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueTime, setDueTime] = useState(new Date()); // Thời gian deadline
    const [dueDate, setDueDate] = useState(new Date()); // Ngày deadline
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const items = ["A", "B", "C", "D", "E", "F", "G"];

    // Xử lý mở picker thời gian
    const onShowTimePicker = () => setShowTimePicker(true);
    const onShowDatePicker = () => setShowDatePicker(true);

    // Xử lý chọn thời gian
    const onTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) setDueTime(selectedTime);
    };

    // Xử lý chọn ngày
    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) setDueDate(selectedDate);
    };

    // Format thời gian thành dạng HH:mm
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Format ngày thành dạng DD/MM/YYYY
    const formatDate = (date: Date) => {
        return date.toLocaleDateString();
    };

    const handleGoBack = () => {
        router.back(); // Điều hướng quay lại trang trước đó
    };

    return (
        <SafeAreaView style={styles.container}>
            <Head
                onLeftPress={handleGoBack} // Hàm xử lý quay lại
                showRightIcon={false}
            >
                <CustomText style={[{ fontFamily: 'Inter' }, styles.headTitle]}>Project Information</CustomText>
            </Head>
            <CustomText fontFamily='InterSemiBold' style={styles.title1}>Project Title</CustomText>
            <MyInputField
                style={styles.input1}
                value={taskName}
                textStyle={{ fontSize: 18 }}
                onChangeText={setTaskName}
                placeholder='Enter your title...'
            />
            <CustomText fontFamily='InterSemiBold' style={styles.title2}>Project Details</CustomText>
            <MyInputField
                value={description}
                style={styles.input2}
                onChangeText={setDescription}
                multiline={true}
                scrollEnabled={true}
                textAlignVertical="top"
                placeholder='Enter your description...'
                placeholderStyle={{ textAlignVertical: "top", top: 10 }}
            />
            <CustomText fontFamily='InterSemiBold' style={styles.title2}>Add team members</CustomText>
            <View style={styles.box1}>
                <View style={styles.temMember}>
                    <AddTeamMemberFlashList data={items} />
                </View>
                <MyButton
                    style={styles.addTeamMember}
                    onPress={() => console.log("Add Team Member Pressed!")}
                    title={<Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e2e98082-960a-4970-bb96-0b5b27337190" }} style={{ width: 24, height: 24 }} />}
                />
            </View>
            <CustomText fontFamily='InterSemiBold' style={styles.title2}>Time & Date</CustomText>
            <View style={styles.box2}>
                <View style={styles.Time}>
                    <Pressable onPress={onShowTimePicker} style={styles.timeIcon}>
                        <Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/98f481d7-a3c9-43ad-bea6-4e6c9512925e" }} style={{ width: 24, height: 24 }} />
                    </Pressable>
                    <View style={styles.timeView}>
                        <CustomText fontSize={20} style={{ color: "#fff" }}>
                            {formatTime(dueTime)}
                        </CustomText>
                    </View>
                </View>
                <View style={styles.Date}>
                    <Pressable onPress={onShowDatePicker} style={styles.dateIcon}>
                        <Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c89994dc-77ab-4dfb-a2c7-db39b0b35d73" }} style={{ width: 24, height: 24 }} />
                    </Pressable>
                    <View style={styles.dateView}>
                        <CustomText fontSize={20} style={{ color: "#fff" }}>
                            {formatDate(dueDate)}
                        </CustomText>
                    </View>
                </View>
            </View>
            <View style={styles.deleteChange}>
                <MyButton
                    onPress={() => console.log("Create Button Pressed!")}
                    title={<CustomText fontFamily="InterMedium" fontSize={18} style={{ color: '#FFFFFF' }}>Delete</CustomText>}
                    style={styles.Delete}
                    backgroundColor='#455A64'
                />
                <MyButton
                    onPress={() => console.log("Create Button Pressed!")}
                    title={<CustomText fontFamily="InterMedium" fontSize={18} style={{ color: '#000' }}>Change</CustomText>}
                    style={styles.Change}
                />
            </View>
            {/* Hiển thị DateTimePicker */}
            {showTimePicker && (
                <DateTimePicker
                    value={dueTime}
                    mode="time"
                    display="default"
                    onChange={onTimeChange}
                />
            )}
            {showDatePicker && (
                <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
        </SafeAreaView>
    );
};

export default ProjectInformation;
