import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Head from '@/components/head'; // Đường dẫn tới component Head của bạn
import styles from './(tab)/styles/taskDetail';
import CustomText from '@/components/customText';
import CompletedCircle from '@/components/completedCircle';
import responsive from "@/components/reponsive";
import MyButton from '@/components/myButton';
import { updateTaskStatus } from '@/services/data';
import TaskModal from '@/components/taskModal';
import AddTaskModal from '@/components/addTaskModal';
import { FlashList } from "@shopify/flash-list";
import { deleteTaskFromFirebase, editTaskInFirebase, listenToTasks, saveTaskToFirebase } from "@/services/dataTask"
// import DateTimePicker from '@react-native-community/datetimepicker';

interface Task {
    id: string;
    name: string;
    deadlineDay: string;
    deadlineTime: string;
    status: boolean;
}
// Hàm tính toán phần trăm hoàn thành
const calculateCompletionPercentage = (tasks: Task[]): number => {
    if (tasks.length === 0) return 0; // Tránh chia cho 0

    const completedTasks = tasks.filter(task => task.status).length;
    return parseFloat(((completedTasks / tasks.length) * 100).toFixed(2));
};

const TaskDetails: React.FC = () => {
    const router = useRouter();
    const { title, id, teamMember, dueDate, projectDetails, allTasks, type } = useLocalSearchParams(); // Lấy thông tin từ params
    const processedTitle = title ? (title as string).replace(/\n/g, ' ') : 'No Title';
    const processTeamMember = teamMember ? parseInt(teamMember as string, 10) : 0;
    const processID = id !== null && id !== undefined ? (!isNaN(Number(id)) ? Number(id) : id.toString()) : null;
    const processDueDate = dueDate ? new Date(Array.isArray(dueDate) ? dueDate[0] : dueDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
    }) : "No Due Date";
    const processProjectDetails = projectDetails;
    const processAllTasks = allTasks ? JSON.parse(allTasks as string) : [];
    const [tasks, setTasks] = useState<Task[]>(processAllTasks);
    const selectedProjectType = type;
    const [modaAddTasklVisible, setModalAddTaskVisible] = useState(false);
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    const [nameTask, setNameTask] = useState('');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [taskProgress, setTaskProgress] = useState<number>(calculateCompletionPercentage(tasks));
    const [status, setStatus] = useState(false);
    const [dueTimeTask, setDueTimeTask] = useState(new Date());
    const [dueDateTask, setDueDateTask] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        setTaskProgress(calculateCompletionPercentage(tasks));
    }, [tasks]); // 🔥 Cập nhật progress mỗi khi tasks thay đổi

    useEffect(() => {
        const unsubscribe = listenToTasks(type, processID, setTasks);
        return () => {
            if (unsubscribe) unsubscribe(); // Dọn dẹp listener khi component unmount
        };
    }, [type, processID]);

    const handleSaveTask = async () => {
        if (!nameTask.trim()) {
            alert("Tên task không được để trống!");
            return;
        }
        try {
            await saveTaskToFirebase(type, processID, nameTask, dueDateTask, dueTimeTask, status);
            console.log("✅ Task đã được thêm thành công!");
            setModalAddTaskVisible(false); // Đóng modal sau khi lưu thành công
            setNameTask(""); // Reset form
        } catch (error) {
            console.error("❌ Lỗi khi thêm task:", error);
        }
    };

    // Xử lý cập nhật task
    const handleChangeTask = async () => {
        if (!selectedTask || !nameTask.trim()) {
            alert("Vui lòng chọn một task và nhập tên hợp lệ!");
            return;
        }

        try {
            await editTaskInFirebase(type, processID, selectedTask.id, {
                name: nameTask,
                deadlineDay: dueDateTask.toISOString(),
                deadlineTime: dueTimeTask.toISOString(),
                status: selectedTask.status, // Giữ nguyên trạng thái task
            });

            console.log(`✅ Task ID ${selectedTask.id} đã được cập nhật!`);
            setTaskModalVisible(false); // Đóng modal sau khi cập nhật
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật task:", error);
        }
    };

    // Xử lý xoá task
    const handleDeleteTask = async () => {
        if (!selectedTask) {
            alert("Vui lòng chọn một task để xoá!");
            return;
        }

        try {
            await deleteTaskFromFirebase(type, processID, selectedTask.id);
            console.log(`✅ Task ID ${selectedTask.id} đã bị xoá!`);
            setTaskModalVisible(false); // Đóng modal sau khi xoá
        } catch (error) {
            console.error("❌ Lỗi khi xoá task:", error);
        }
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) setDueDateTask(selectedDate);
    };

    const onChangeTime = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) setDueTimeTask(selectedTime);
    };

    // Hàm xử lý khi nhấn nút "Quay lại"
    const handleGoBack = () => {
        router.back(); // Điều hướng quay lại trang trước đó
    };

    // Hàm tạo màu ngẫu nhiên
    const getRandomColor = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Tạo mã hex ngẫu nhiên
        return randomColor;
    };

    // Tạo mảng chứa các giá trị marginLeft
    const circles: { marginLeft: number; backgroundColor: string }[] = [];
    for (let i = 0; i < processTeamMember; i++) {
        circles.push({
            marginLeft: i * responsive.normalizeX(13),
            backgroundColor: i === 0 ? 'blue' : getRandomColor(), // Hình tròn đầu màu xanh, các hình khác màu ngẫu nhiên
        });
    }
    const boxes = Array.from({ length: 20 }, (_, index) => index + 1); // Tạo mảng 20 phần tử

    // Hàm thay đổi trạng thái task
    const toggleTaskStatus = async (index: number) => {
        try {
            console.log("🆔 Project ID:", processID);
            console.log("📌 Task Index:", index);

            // Tạo một bản sao mới của tasks
            const newTasks = tasks.map((task, i) =>
                i === index ? { ...task, status: !task.status } : task
            );

            setTasks(newTasks); // Cập nhật UI trước
            await updateTaskStatus(processID, index, newTasks[index].status, selectedProjectType); // Cập nhật Firebase
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật trạng thái task:", error);
        }
    };




    return (
        <View style={styles.container}>
            <Head
                onLeftPress={handleGoBack} // Hàm xử lý quay lại
                onRightPress={handleSaveTask} // Hàm xử lý thêm mới
            >
                <CustomText style={[{ fontFamily: 'Inter' }, styles.headTitle]}>Task Details</CustomText>
            </Head>
            {/* Modal thêm task */}

            <View style={styles.header}>
                <CustomText style={[{ fontFamily: 'Inter' }, styles.info]}>{processedTitle}</CustomText>
            </View>
            <View style={styles.dateAndTeam}>
                <View style={styles.date}>
                    <Image
                        source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3b81ac77-79c7-49c3-88db-5758394b8f30" }}
                        style={styles.dateImage}
                    />
                </View>
                <View style={styles.textDate}>
                    <CustomText style={[{ fontFamily: 'InterMedium' }, styles.dueDate]}>Due Date</CustomText>
                    <CustomText style={[{ fontFamily: 'InterSemiBold' }, styles.dateText]}>{processDueDate}</CustomText>
                </View>
                <View style={styles.team}>
                    <Image
                        source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c5881b13-0fbc-44e5-a12f-a9c111c25a1f" }}
                        style={styles.dateImage}
                    />
                </View>
                <View style={styles.textTeam}>
                    <CustomText style={[{ fontFamily: 'InterMedium' }, styles.dueDate]}>Project Team</CustomText>
                    <View style={styles.teamMember}>
                        <View style={styles.teamMemberCircle}>
                            {Array.from({ length: processTeamMember }).map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.circle,
                                        { marginLeft: circles[index].marginLeft, backgroundColor: circles[index].backgroundColor }, // Áp dụng marginLeft từ mảng
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </View >
            <View style={styles.details}>
                <CustomText style={[{ fontFamily: 'InterMedium' }, styles.projectDetails]}>Project Details</CustomText>
                <CustomText style={[{ fontFamily: 'InterReguler' }, styles.textDetails]}>{processProjectDetails}</CustomText>
            </View>
            <View style={styles.progress}>
                <CustomText style={[{ fontFamily: 'InterMedium' }, styles.progressText]}>Project Progress</CustomText>
                <CompletedCircle
                    progress={taskProgress}
                    containerStyle={styles.completed}
                />
            </View>
            <View style={styles.allTask}>
                <CustomText style={[{ fontFamily: 'InterMedium' }, styles.allTaskText]}>All Tasks</CustomText>
            </View>

            <View style={styles.flashList}>
                <FlashList
                    data={tasks}
                    keyExtractor={(_, index) => index.toString()} // Định danh duy nhất
                    estimatedItemSize={50} // Kích thước ước tính của mỗi item để tối ưu hiệu suất
                    renderItem={({ item, index }: { item: { id: string; name: string; deadlineDay: string; deadlineTime: string; status: boolean }; index: number }) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.box, index > 0 && { marginTop: 12 }]}
                            onPress={() => {
                                toggleTaskStatus(index);
                            }}
                            onLongPress={() => {
                                setSelectedTask(item);
                                setNameTask(item.name);
                                setDueDateTask(new Date(item.deadlineDay));
                                setDueTimeTask(new Date(item.deadlineTime));
                                setTaskModalVisible(true);
                            }}
                        >
                            <CustomText style={[{ fontFamily: "InterMedium" }, styles.boxText]}>
                                {item.name}
                            </CustomText>
                            <View style={styles.boxIcon}>
                                <Image
                                    source={{
                                        uri: item.status
                                            ? "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/821e1450-bd52-4d89-8ba1-a77d5137fcbc"
                                            : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8a9772be-257c-46a8-bcd9-2015ab0f44ff",
                                    }}
                                    style={{ width: 24, height: 24 }}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flashListContent}
                />
            </View>
            <TaskModal
                visible={taskModalVisible}
                nameTask={nameTask}
                setNameTask={setNameTask}
                dueDate={dueDateTask}
                dueTime={dueTimeTask}
                showDatePicker={showDatePicker}
                showTimePicker={showTimePicker}
                onClose={() => setTaskModalVisible(false)}
                handleChangeTask={handleChangeTask}
                handleDeleteTask={handleDeleteTask}
                onShowDatePicker={() => setShowDatePicker(true)}
                onShowTimePicker={() => setShowTimePicker(true)}
                timeOnpress={onChangeTime}
                dateOnpress={onChangeDate}
            />
            <View style={styles.addTask}>
                <MyButton
                    onPress={() => setModalAddTaskVisible(true)}
                    style={styles.addTaskButton}
                    title={<CustomText fontFamily="InterSemiBold" fontSize={18} style={{ color: '#000' }}>Add Task</CustomText>
                    } />
            </View>
            <AddTaskModal
                visible={modaAddTasklVisible}
                nameTask={nameTask}
                setNameTask={setNameTask}
                dueDate={dueDateTask}
                dueTime={dueTimeTask}
                showDatePicker={showDatePicker}
                showTimePicker={showTimePicker}
                onClose={() => setModalAddTaskVisible(false)}
                handleAddTask={handleSaveTask}
                onShowDatePicker={() => setShowDatePicker(true)}
                onShowTimePicker={() => setShowTimePicker(true)}
                timeOnpress={onChangeTime}
                dateOnpress={onChangeDate}
            />
        </View>
    );
};

export default TaskDetails;
