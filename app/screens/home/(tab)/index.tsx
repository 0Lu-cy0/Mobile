import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import CustomText from '@/components/customText';
import { useRouter } from 'expo-router';
import styles from './styles/home';
import CompletedCircle from '@/components/completedCircle';
import MyInputField from '@/components/inputButton';
import { listenToProjectsRealtime } from "@/services/data";
import reponsive from '@/components/reponsive';
import CompletedLine from '@/components/completedLine';

const HomeScreen: React.FC = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
    const [ongoingProjects, setOngoingProjects] = useState<Project[]>([]);

    interface Task {
        name: string;
        status: boolean;
    }

    interface Project {
        id: string;
        title: string;
        dueDate: string;
        allTasks?: Task[];
        projectDetails: string;
        teamMember: number;
    }

    const calculateCompletionPercentage = (tasks: Task[] = []): number => {
        const completedTasks = tasks.filter(task => task.status).length;
        return tasks.length > 0 ? parseFloat(((completedTasks / tasks.length) * 100).toFixed(2)) : 0;
    };

    useEffect(() => {
        setLoading(true);
        const unsubscribe = listenToProjectsRealtime((data: any) => {
            if (data) {
                let completed: Project[] = [];
                let ongoing: Project[] = [];

                Object.entries(data).forEach(([category, projectList]) => {
                    if (typeof projectList === 'object') {
                        projectList && Object.entries(projectList).forEach(([key, project]: [string, any]) => {
                            const formattedProject: Project = {
                                id: key,
                                title: project.title || 'Untitled Project',
                                dueDate: project.dueDate || 'No due date',
                                projectDetails: project.projectDetails || 'No details available',
                                allTasks: Array.isArray(project.allTasks) ? project.allTasks : [],
                                teamMember: project.teamMember || 0,
                            };
                            if (category === 'completed') {
                                completed.push(formattedProject);
                            } else if (category === 'ongoingProjects') {
                                ongoing.push(formattedProject);
                            }
                        });
                    }
                });
                setCompletedProjects(completed);
                setOngoingProjects(ongoing);
                setLoading(false);
            } else {
                setCompletedProjects([]);
                setOngoingProjects([]);
                setLoading(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleTaskPress = (task: typeof completedProjects[0]) => {
        try {
            router.push({
                pathname: '/screens/home/taskDetails',
                params: {
                    ...task,
                    allTasks: JSON.stringify(task.allTasks),
                    type: "completed",
                },
            });
        } catch (error) {
            console.error("Error navigating to Task Details:", error);
        }
    };

    const handleProjectPress = (project: typeof ongoingProjects[0]) => {
        try {
            router.push({
                pathname: './taskDetails',
                params: {
                    ...project,
                    allTasks: JSON.stringify(project.allTasks),
                    type: "ongoingProjects",
                },
            });
        } catch (error) {
            console.error("Error navigating to Project Details:", error);
        }
    };

    return (
        <View style={styles.container}>
            <MyInputField
                style={styles.search}
                value={search}
                onChangeText={setSearch}
                placeholder='Seach tasks'
                leftIcon={<Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1ab553fe-9ea6-4310-9f20-a52edc715356" }} style={{ width: 24, height: 24 }} />}
            />
            <View style={styles.setting}>
                <Image
                    source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/29d5bfb0-2b66-4e13-84c3-b9d2014ebb74" }}
                    style={styles.settingImage}
                />
            </View>

            <CustomText fontFamily="Inter" style={styles.title1}>Completed Tasks</CustomText>
            <CustomText fontFamily='Inter' style={styles.title2}>See all</CustomText>
            <CustomText fontFamily='Inter' style={styles.title4}>See all</CustomText>
            {loading ? (
                <ActivityIndicator size="large" color="#FED36A" style={{ top: reponsive.normalizeY(120) }} />
            ) : (<ScrollView
                horizontal
                style={{ flex: 1 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {completedProjects.map((task, index) => (
                    <TouchableOpacity
                        key={task.id}
                        style={[
                            styles.box,
                            index > 0 && { marginLeft: 7 }, // Chỉ áp dụng marginLeft cho các hộp từ hộp thứ hai
                        ]}
                        onPress={() => handleTaskPress(task)} // Gắn sự kiện onPress
                    >
                        <CustomText fontFamily="Inter" style={styles.titleBoxSelectedBox}>
                            {task.title}
                        </CustomText>
                        <View style={styles.teamMemberConntainer}>
                            <CustomText fontFamily="InterReguler" fontSize={13.25} style={{ color: '#212832' }}>
                                Team members
                            </CustomText>
                            <View style={styles.teamMember}>
                                <View style={styles.circle1} />
                                <View style={styles.circle2} />
                                <View style={styles.circle3} />
                                <View style={styles.circle4} />
                                <View style={styles.circle5} />
                            </View>
                        </View>
                        <View style={styles.progressBox}>
                            <CustomText fontFamily="InterReguler" style={{ fontSize: 13.25, color: '#212832' }}>
                                Completed
                            </CustomText>
                            <CustomText fontFamily="Inter" style={{ fontSize: 13.25, color: '#212832' }}>
                                {calculateCompletionPercentage(task.allTasks)}%
                            </CustomText>
                        </View>
                        <CompletedLine
                            progress={calculateCompletionPercentage(task.allTasks)}
                            containerStyle={{ marginTop: 10 }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>)}
            {/* Ongoing Projects */}
            <CustomText fontFamily="Inter" style={styles.title3}>Ongoing Projects</CustomText>
            {loading ? (
                <ActivityIndicator size="large" color="#FED36A" style={{ top: reponsive.normalizeY(360) }} />
            ) : (<ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContentVertically}
            >
                {ongoingProjects.map((project, index) => (
                    <TouchableOpacity
                        key={project.id}
                        style={[
                            styles.box1,
                            index > 0 && { marginTop: 15 }, // Chỉ áp dụng marginTop cho các hộp từ hộp thứ hai
                        ]}
                        onPress={() => handleProjectPress(project)}
                    >
                        <CustomText fontFamily="Inter" style={styles.titleBoxUnSelected}>
                            {project.title}
                        </CustomText>
                        <View style={styles.box2}>
                            <View style={styles.teamMemberProject}>
                                <CustomText fontFamily="InterReguler" style={{ fontSize: 13.25, color: '#FFFFFF', }}>
                                    Team members
                                </CustomText>
                                <View>
                                    <View style={styles.circle1} />
                                    <View style={styles.circle2} />
                                    <View style={styles.circle3} />
                                </View>
                            </View>
                            <View>
                                <CustomText fontFamily='Inter' style={{ lineHeight: 25, width: 113, fontSize: 13.25, color: '#FFFFFF' }}>
                                    Due on: {new Date(project.dueDate).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                    })}
                                </CustomText>
                            </View>
                            <CompletedCircle
                                progress={calculateCompletionPercentage(project.allTasks)}
                                containerStyle={styles.completed}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>)}
        </View>
    );
};

export default HomeScreen;
