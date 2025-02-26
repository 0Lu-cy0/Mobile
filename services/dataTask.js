import { database } from "@/services/firebaseConfig";
import { onValue, remove, ref, set, off, push, get } from "firebase/database";

//Lắng nghe dữ liệu theo thời gian thực của task
const listenToTasks = (type, projectId, setTasks) => {
    if (!["completed", "ongoingProjects"].includes(type)) {
        console.error("❌ Invalid type. Use 'completed' or 'onGoing'.");
        return;
    }

    const taskRef = ref(database, `projects/${type}/${projectId}/allTasks`);

    const unsubscribe = onValue(taskRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const taskList = Object.entries(data).map(([id, task]) => ({
                id,
                ...task,
            }));
            setTasks(taskList);
        } else {
            setTasks([]);
        }
    });

    return unsubscribe; // Trả về để có thể cleanup khi cần
};

//Hàm lưu dữ liệu task lên firebase
const saveTaskToFirebase = async (type, projectId, name, date, time, status) => {
    try {
        if (!["completed", "ongoingProjects"].includes(type)) {
            throw new Error("Invalid type. Use 'completed' or 'onGoing'.");
        }

        const formattedDate = date.toISOString();
        const formattedTime = time.toISOString();
        const taskRef = ref(database, `projects/${type}/${projectId}/allTasks`);

        // 🛠 Lấy danh sách nhiệm vụ hiện có
        const snapshot = await get(taskRef);
        const tasks = snapshot.val();

        let newId = 0; // Mặc định là 0 nếu chưa có task nào

        if (tasks) {
            // 🔥 Chuyển keys thành số, tìm giá trị lớn nhất rồi +1
            const taskIds = Object.keys(tasks).map(id => parseInt(id, 10));
            newId = Math.max(...taskIds) + 1;
        }

        // 📌 Tạo reference với ID mới
        const newTaskRef = ref(database, `projects/${type}/${projectId}/allTasks/${newId}`);

        // 🔥 Lưu task mới vào Firebase
        await set(newTaskRef, {
            name,
            deadlineDay: formattedDate,
            deadlineTime: formattedTime,
            status
        });

        console.log(`✅ Task ID ${newId} đã được lưu vào Firebase!`);
    } catch (error) {
        console.error("❌ Lỗi khi lưu dữ liệu lên Firebase:", error);
    }
};

//Hàm sửa dữ liệu task
const editTaskInFirebase = async (type, projectId, taskId, updatedTask) => {
    try {
        if (!["completed", "onGoing"].includes(type)) {
            throw new Error("❌ Invalid type. Use 'completed' or 'onGoing'.");
        }

        const taskRef = ref(database, `projects/${type}/${projectId}/allTasks/${taskId}`);

        // 🔥 Cập nhật task trên Firebase
        await set(taskRef, updatedTask);

        console.log(`✅ Task ID ${taskId} đã được cập nhật thành công!`);
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật dữ liệu trên Firebase:", error);
    }
};

//Hàm xoá dữ liệu task
const deleteTaskFromFirebase = async (type, projectId, taskId) => {
    try {
        if (!["completed", "onGoing"].includes(type)) {
            throw new Error("❌ Invalid type. Use 'completed' or 'onGoing'.");
        }

        const taskRef = ref(database, `projects/${type}/${projectId}/allTasks/${taskId}`);

        // 🔥 Xoá task trên Firebase
        await remove(taskRef);

        console.log(`✅ Task ID ${taskId} đã bị xoá khỏi Firebase!`);
    } catch (error) {
        console.error("❌ Lỗi khi xoá dữ liệu trên Firebase:", error);
    }
};

export { saveTaskToFirebase, listenToTasks, editTaskInFirebase, deleteTaskFromFirebase }
