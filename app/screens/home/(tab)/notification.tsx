import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { ref, get } from "firebase/database";
import { database } from "@/services/firebaseConfig";
import { format } from "date-fns";

// Hàm lấy dữ liệu từ Firebase
const fetchProjectsData = async (type: string) => {
    try {
        const projectRef = ref(database, `projects/${type}`);
        const snapshot = await get(projectRef);

        if (snapshot.exists()) {
            return Object.entries(snapshot.val()).map(([key, value]) => ({
                id: `${type}-${key}`, // Thêm type vào id để tránh trùng lặp
                type,
                ...(value as any),
            }));
        } else {
            console.warn(`⚠ Không có dữ liệu cho ${type}`);
            return [];
        }
    } catch (error) {
        console.error(`❌ Lỗi khi lấy dữ liệu ${type}:`, error);
        return [];
    }
};

const ProjectList = () => {
    const [completedProjects, setCompletedProjects] = useState<any[]>([]);
    const [ongoingProjects, setOngoingProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [taskModalVisible, setTaskModalVisible] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const completed = await fetchProjectsData("completed");
            const ongoing = await fetchProjectsData("ongoingProjects"); // Sửa thành "onGoing" cho đúng với cấu trúc Firebase

            setCompletedProjects(completed);
            setOngoingProjects(ongoing);
            setLoading(false);
        };
        loadData();
    }, []);

    const formatFirebaseDateTime = (firebaseDate: string) => {
        const date = new Date(firebaseDate);
        const formattedDate = format(date, "d MMMM yyyy"); // 2 April 2025
        const formattedTime = format(date, "HH:mm"); // 15:00
        return { formattedDate, formattedTime };
    };

    const handleProjectPress = (project: any) => {
        setSelectedProject(project);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📊 Danh sách Dự án</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : (
                <>
                    <Text style={styles.sectionTitle}>✅ Đã Hoàn Thành</Text>
                    <FlatList
                        data={completedProjects}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleProjectPress(item)}>
                                <View style={styles.card}>
                                    <Text style={styles.projectTitle}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false}
                    />

                    <Text style={styles.sectionTitle}>⏳ Đang Thực Hiện</Text>
                    <FlatList
                        data={ongoingProjects}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleProjectPress(item)}>
                                <View style={styles.card}>
                                    <Text style={styles.projectTitle}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                </>
            )}

            {/* Modal hiển thị danh sách tasks */}
            <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{selectedProject?.title}</Text>

                    <FlatList
                        data={Object.entries(selectedProject?.allTasks || {})}
                        keyExtractor={([key]) => key}
                        renderItem={({ item }) => {
                            const [taskId, task] = item as [string, { deadlineDay: string, deadlineTime: string, name: string, status: string }];
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedTask(task);
                                        setTaskModalVisible(true);
                                    }}
                                >
                                    <View style={styles.taskCard}>
                                        <Text>📝 {task.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />

                    <Text style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        Đóng
                    </Text>
                </View>
            </Modal>

            {/* Modal hiển thị chi tiết task */}
            <Modal visible={taskModalVisible} animationType="slide" onRequestClose={() => setTaskModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Chi tiết nhiệm vụ</Text>
                    {selectedTask && (
                        <>
                            <Text>📝 {selectedTask.name}</Text>
                            <Text>📅 Ngày hết hạn: {formatFirebaseDateTime(selectedTask.deadlineDay).formattedDate}</Text>
                            <Text>⏰ Giờ hết hạn: {formatFirebaseDateTime(selectedTask.deadlineTime).formattedTime}</Text>

                            <Text>📌 Trạng thái: {selectedTask.status}</Text>
                        </>
                    )}
                    <Text style={styles.closeButton} onPress={() => setTaskModalVisible(false)}>
                        Đóng
                    </Text>
                </View>
            </Modal>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 20,
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginRight: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    projectTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    closeButton: {
        textAlign: "center",
        color: "#007AFF",
        fontSize: 18,
        marginTop: 20,
    },
    taskCard: {
        backgroundColor: "#E3F2FD",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default ProjectList;
