import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { getDatabase, ref, set, push, update } from "firebase/database";
import { database } from "@/services/firebaseConfig";


// Danh sách nhiệm vụ đã hoàn thành
const completedProjects = [
    {
        id: 0,
        title: 'Real Estate\nWebsite\nDesign',
        teamMember: [
            { name: 'John Doe', email: 'aaa@gmail.com', image: '' },
        ],
        dueDate: '21 March',
        projectDetails: 'This project involves developing a new app for task management.',
        allTasks: [
            { name: "Task 1", status: true, deadlineDay: "21 March", deadlineTime: "10:00" },
            { name: "Task 2", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 3", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 4", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 5", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
        ],
    },
    {
        id: 1,
        title: 'Finance\nMobile App\nDesign',
        teamMember: 6,
        dueDate: '22 March',
        projectDetails: 'This project involves developing a new app for task management.',
        allTasks: [
            { name: "Task 1", status: true, deadlineDay: "21 March", deadlineTime: "10:00" },
            { name: "Task 2", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 3", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 4", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 5", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
        ],
    },
    {
        id: 2,
        title: 'Wallet\nMobile App\nDesign',
        teamMember: 5,
        dueDate: '23 March',
        projectDetails: 'This project involves developing a new app for task management.',
        allTasks: [
            { name: "Task 1", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 2", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 3", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 4", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 5", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
        ],
    },
]

// Danh sách dự án đang thực hiện
const ongoingProjects = [
    {
        id: 0,
        title: 'Mobile App Wireframe',
        teamMember: 'John, Sarah, Alex',
        dueDate: '21 March',
        projectDetails: 'This project involves developing a new app for task management.',
        allTasks: [
            { name: "Task 1", status: false, deadlineDay: "21 March", deadlineTime: "10:00" },
            { name: "Task 2", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 3", status: false, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 4", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 5", status: false, deadlineDay: "22 March", deadlineTime: "10:00" },
        ],
    },
    {
        id: 1,
        title: 'Real Estate App Design',
        teamMember: 'Lisa, Mike',
        dueDate: '20 June',
        projectDetails: 'A marketing campaign for the new product launch.',
        allTasks: [
            { name: "Task 1", status: false, deadlineDay: "21 March", deadlineTime: "10:00" },
            { name: "Task 2", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 3", status: false, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 4", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 5", status: false, deadlineDay: "22 March", deadlineTime: "10:00" },
        ],
    },
    {
        id: 2,
        title: 'Dashboard & App Design',
        teamMember: 'Emma, Jack',
        dueDate: '04 August',
        projectDetails: 'Development of a backend API for client management.',
        allTasks: [
            { name: "Task 1", status: false, deadlineDay: "20 June", deadlineTime: "10:00" },
            { name: "Task 2", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 3", status: false, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 4", status: true, deadlineDay: "22 March", deadlineTime: "10:00" },
            { name: "Task 5", status: false, deadlineDay: "22 March", deadlineTime: "10:00" },
        ],
    },
]
// Hàm cập nhật toàn bộ dữ liệu trên Firebase
const updateProjectData = async (type: string, data: any[]) => {
    try {
        if (!type || !data || !Array.isArray(data)) {
            console.error("Error: Invalid project type or data.");
            return false;
        }

        // Chuyển mảng thành object với key là id của từng project
        const formattedData = data.reduce((acc, project) => {
            acc[project.id] = project;
            return acc;
        }, {} as Record<string, any>);

        const projectRef = ref(database, `projects/${type}`);
        await update(projectRef, formattedData);

        console.log(`✅ Dữ liệu ${type} đã cập nhật thành công!`);
        return true;
    } catch (error) {
        console.error(`❌ Lỗi cập nhật dữ liệu ${type}:`, error);
        return false;
    }
};


// Component chính
const Notification = () => {
    const [isUploading, setIsUploading] = useState(false);

    const handleUploadData = async () => {
        setIsUploading(true);
        try {
            const completedUpdate = await updateProjectData("completed", completedProjects);
            const ongoingUpdate = await updateProjectData("ongoingProjects", ongoingProjects);

            if (completedUpdate && ongoingUpdate) {
                Alert.alert("✅ Thành công", "Dữ liệu của tất cả dự án đã được cập nhật trên Firebase!");
            } else {
                Alert.alert("⚠ Thất bại", "Không thể cập nhật dữ liệu dự án.");
            }
        } catch (error) {
            Alert.alert("❌ Lỗi", "Không thể tải dữ liệu lên Firebase!");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quản lý Dự án & Nhiệm vụ</Text>
            <Text style={styles.description}>Nhấn nút bên dưới để tải dữ liệu lên Firebase</Text>
            {isUploading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : (
                <Button title="📤 Tải dữ liệu lên Firebase" onPress={handleUploadData} />
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#555",
        marginBottom: 20,
        textAlign: "center",
    },
});

export default Notification;

// import React, { useState, useEffect } from "react";
// import { View, Text, Alert, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
// import { getDatabase, ref, get } from "firebase/database";
// import { database } from "@/services/firebaseConfig";
// import AddTaskModal from "@/components/addTaskModal";

// const Notification = () => {
//     const [isUploading, setIsUploading] = useState(false);
//     const [projectsData, setProjectsData] = useState<any>({ completed: [], ongoing: [] });
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedProject, setSelectedProject] = useState<any>(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [taskName, setTaskName] = useState("");
//     const [dueDate, setDueDate] = useState<string | undefined>(undefined);
//     const [dueTime, setDueTime] = useState<string | undefined>(undefined);

//     const convertToDate = (timestamp: any) => {
//         if (typeof timestamp === "string" || typeof timestamp === "number") {
//             return new Date(timestamp);
//         }
//         return new Date();
//     };

//     const fetchProjectData = async () => {
//         setIsLoading(true);
//         try {
//             const completedRef = ref(database, "projects/completed");
//             const ongoingRef = ref(database, "projects/ongoingProjects");

//             const completedSnapshot = await get(completedRef);
//             const ongoingSnapshot = await get(ongoingRef);

//             if (completedSnapshot.exists() && ongoingSnapshot.exists()) {
//                 const completedData = Object.values(completedSnapshot.val());
//                 const ongoingData = Object.values(ongoingSnapshot.val());

//                 console.log("🔥 Completed Projects:", completedData);
//                 console.log("🔥 Ongoing Projects:", ongoingData);

//                 setProjectsData({
//                     completed: completedData,
//                     ongoing: ongoingData,
//                 });
//             } else {
//                 Alert.alert("⚠ Dữ liệu không tồn tại", "Không có dữ liệu từ Firebase.");
//             }
//         } catch (error) {
//             Alert.alert("❌ Lỗi", "Không thể tải dữ liệu từ Firebase!");
//             console.error(error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProjectData();
//     }, []);

//     const handleProjectSelect = (project: any) => {
//         setSelectedProject(project);
//     };

//     const handleLongPressTask = (task: any) => {
//         console.log("📌 Task được chọn:", task);
//         setTaskName(task.name);

//         const convertedDueDate = convertToDate(task.dueDate);
//         console.log("📅 Due Date trước khi chuyển đổi:", task.dueDate);
//         console.log("📅 Due Date sau khi chuyển đổi:", convertedDueDate);
//         setDueDate(convertedDueDate.toISOString().split('T')[0]);

//         const convertedDueTime = new Date(task.dueTime);
//         console.log("⏰ Due Time trước khi chuyển đổi:", task.dueTime);
//         console.log("⏰ Due Time sau khi chuyển đổi:", convertedDueTime);
//         setDueTime(convertedDueTime.toTimeString().split(' ')[0]);

//         setIsModalVisible(true);
//     };

//     const handleModalClose = () => {
//         setIsModalVisible(false);
//     };

//     const handleAddTask = () => {
//         console.log(`Task Added: ${taskName}`);
//         handleModalClose();
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Quản lý Dự án & Nhiệm vụ</Text>
//             {isLoading ? (
//                 <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
//             ) : (
//                 <ScrollView style={styles.scrollView}>
//                     <Text style={styles.subTitle}>Dự án hoàn thành:</Text>
//                     {projectsData.completed.map((project: any, index: number) => (
//                         <View key={index} style={styles.projectCard}>
//                             <TouchableOpacity onPress={() => handleProjectSelect(project)}>
//                                 <Text style={styles.projectTitle}>{project.title}</Text>
//                                 <Text>{project.projectDetails}</Text>
//                                 <Text>Hạn hoàn thành: {project.dueDate}</Text>
//                                 <Text>Thành viên: {project.teamMember}</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ))}
//                     <Text style={styles.subTitle}>Dự án đang thực hiện:</Text>
//                     {projectsData.ongoing.map((project: any, index: number) => (
//                         <View key={index} style={styles.projectCard}>
//                             <TouchableOpacity onPress={() => handleProjectSelect(project)}>
//                                 <Text style={styles.projectTitle}>{project.title}</Text>
//                                 <Text>{project.projectDetails}</Text>
//                                 <Text>Hạn hoàn thành: {project.dueDate}</Text>
//                                 <Text>Thành viên: {project.teamMember}</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ))}
//                 </ScrollView>
//             )}

//             {selectedProject && (
//                 <View style={styles.taskListContainer}>
//                     <Text style={styles.subTitle}>Danh sách nhiệm vụ:</Text>
//                     {selectedProject.allTasks.map((task: any, index: number) => (
//                         <TouchableOpacity key={index} style={styles.taskCard} onLongPress={() => handleLongPressTask(task)}>
//                             <Text style={styles.taskTitle}>{task.name}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             )}

//             <AddTaskModal
//                 visible={isModalVisible}
//                 onClose={handleModalClose}
//                 nameTask={taskName}
//                 setNameTask={setTaskName}
//                 handleAddTask={handleAddTask}
//                 timeOnpress={(event, selectedTime) => console.log(selectedTime)}
//                 dateOnpress={(event, selectedDate) => console.log(selectedDate)}
//                 dueDate={dueDate}
//                 dueTime={dueTime}
//             />
//         </View>
//     );
// };

// // Styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f5f5f5",
//         padding: 20,
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: "bold",
//         marginBottom: 10,
//     },
//     subTitle: {
//         fontSize: 18,
//         fontWeight: "bold",
//         marginVertical: 10,
//     },
//     scrollView: {
//         marginTop: 20,
//         width: "100%",
//     },
//     projectCard: {
//         backgroundColor: "#fff",
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: "#ccc",
//     },
//     projectTitle: {
//         fontSize: 16,
//         fontWeight: "bold",
//         marginBottom: 5,
//     },
//     taskListContainer: {
//         marginTop: 20,
//         padding: 10,
//         backgroundColor: "#fff",
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: "#ccc",
//         width: "100%",
//     },
//     taskCard: {
//         backgroundColor: "#f9f9f9",
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: "#ddd",
//     },
//     taskTitle: {
//         fontSize: 16,
//         fontWeight: "bold",
//     },
// });

// export default Notification;
