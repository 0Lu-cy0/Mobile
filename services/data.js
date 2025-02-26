import { database } from "./firebaseConfig";
import { ref, set, get, update, remove, push, onValue, off } from "firebase/database";

// 🆕 Thêm một task mới
const addTaskToFirebase = async (newProject, type = "ongoingProjects") => {
    try {
        const projectRef = ref(database, `projects/${type}/${projectId}/allTasks`);
        const newProjectRef = push(projectRef); // Firebase tự tạo ID duy nhất
        await set(newProjectRef, newProject);
        console.log("✅ Nhiệm vụ mới đã được thêm!", newProject);
    } catch (error) {
        console.error("❌ Lỗi khi thêm nhiệm vụ mới:", error);
    }
};

// 🔄 Lấy dữ liệu một lần từ Firebase
const getProjectsFromFirebase = async () => {
    try {
        const projectsRef = ref(database, "projects");
        const snapshot = await get(projectsRef);
        if (snapshot.exists()) {
            console.log("📥 Dữ liệu dự án:", snapshot.val());
            return snapshot.val();
        } else {
            console.log("⚠️ Không có dữ liệu!");
            return null;
        }
    } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu:", error);
        return null;
    }
};

// 🟢 Lắng nghe dữ liệu thời gian thực
const listenToProjectsRealtime = (callback) => {
    const projectsRef = ref(database, "projects");

    const listener = onValue(projectsRef, (snapshot) => {
        if (snapshot.exists()) {
            console.log("🔄 Dữ liệu cập nhật:", snapshot.val());
            callback(snapshot.val());
        } else {
            console.log("⚠️ Không có dữ liệu!");
            callback(null);
        }
    });
    return () => off(projectsRef, "value", listener);
};


// 🗑 Xóa dự án
const deleteProjectFromFirebase = async (projectId, type = "ongoingProjects") => {
    try {
        await remove(ref(database, `projects/${type}/${projectId}`));
        console.log(`🗑 Dự án ${projectId} đã bị xóa!`);
    } catch (error) {
        console.error(`❌ Lỗi khi xóa dự án ${projectId}:`, error);
    }
};

const handleDeleteTask = async (taskId) => {
    try {
        await firestore().collection('tasks').doc(taskId).delete();
        console.log(`🗑 Task Deleted: ${taskId}`);
        onClose(); // Đóng modal sau khi xóa
    } catch (error) {
        console.error('❌ Error deleting task:', error);
    }
};

const fetchProjectData = () => {
    setIsLoading(true);

    try {
        const completedRef = ref(database, "projects/completed");
        const ongoingRef = ref(database, "projects/ongoingProjects");

        // Lắng nghe dữ liệu thay đổi theo thời gian thực
        const unsubscribeCompleted = onValue(completedRef, (snapshot) => {
            if (snapshot.exists()) {
                const completedData = Object.values(snapshot.val());
                console.log("🔥 Completed Projects (Realtime):", completedData);
                setProjectsData((prevData) => ({
                    ...prevData,
                    completed: completedData,
                }));
            }
        });

        const unsubscribeOngoing = onValue(ongoingRef, (snapshot) => {
            if (snapshot.exists()) {
                const ongoingData = Object.values(snapshot.val());
                console.log("🔥 Ongoing Projects (Realtime):", ongoingData);
                setProjectsData((prevData) => ({
                    ...prevData,
                    ongoing: ongoingData,
                }));
            }
        });

        setIsLoading(false);

        // Cleanup listener khi component unmount
        return () => {
            unsubscribeCompleted();
            unsubscribeOngoing();
        };
    } catch (error) {
        Alert.alert("❌ Lỗi", "Không thể tải dữ liệu từ Firebase!");
        console.error(error);
        setIsLoading(false);
    }
};

const updateTaskStatus = async (projectId, taskIndex, newStatus, type) => {
    try {
        if (!type) {
            console.error("Error: Project type is required.");
            return false;
        }

        const projectRef = ref(database, `projects/${type}/${projectId}/allTasks`);
        const snapshot = await get(projectRef);

        if (!snapshot.exists()) return false;

        const allTasks = snapshot.val();
        if (taskIndex < 0 || taskIndex >= allTasks.length) return false;

        allTasks[taskIndex].status = newStatus;
        await set(projectRef, allTasks);

        return true;
    } catch (error) {
        console.error("Error updating task status:", error);
        return false;
    }
};


export {
    addTaskToFirebase,
    getProjectsFromFirebase,
    listenToProjectsRealtime,
    updateTaskStatus,
    deleteProjectFromFirebase,
    fetchProjectData
};
