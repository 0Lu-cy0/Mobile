import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Animated, Dimensions } from 'react-native';
import CustomText from '@/components/customText';
import styles from './styles/messages';
import responsive from "@/components/reponsive";

const { width } = Dimensions.get('window');

export default function MessagesScreen() {
    const [selected, setSelected] = useState<'chat' | 'groups'>('chat');
    const [isLoading, setIsLoading] = useState(true);
    const rotation = useState(new Animated.Value(0))[0];

    // Animation cho chuyển tab
    const translateX = useState(new Animated.Value(responsive.normalizeX(29)))[0]; // Vị trí thanh trượt
    const boxTranslateX = useState(new Animated.Value(0))[0];

    useEffect(() => {
        // Xoay khi loading
        if (isLoading) {
            Animated.loop(
                Animated.timing(rotation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ).start();
            // Giả lập tải dữ liệu xong sau 50ms
            setTimeout(() => setIsLoading(false), 50);
        }
    }, [isLoading, rotation]);

    const switchTab = (tab: 'chat' | 'groups') => {
        setSelected(tab);
        const isChat = tab === 'chat';

        // Di chuyển thanh chọn tab
        Animated.timing(translateX, {
            toValue: isChat ? responsive.normalizeX(29) : responsive.normalizeX(224),
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Di chuyển nội dung trang
        Animated.timing(boxTranslateX, {
            toValue: isChat ? 0 : -width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Animated.View
                    style={[
                        styles.spinner,
                        {
                            transform: [
                                {
                                    rotate: rotation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg'],
                                    }),
                                },
                            ],
                        },
                    ]}
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#212832' }}>
            {/* Thanh chọn tab */}
            <View>
                <Animated.View
                    style={[
                        styles.highlightTab,
                        { transform: [{ translateX }] }, // Animation cho thanh trượt
                    ]}
                />
                <Pressable style={styles.chatButton} onPress={() => switchTab('chat')}>
                    <CustomText fontFamily="InterMedium" fontSize={14} style={selected === 'chat' ? { color: 'black' } : { color: 'white' }}>
                        Chat
                    </CustomText>
                </Pressable>
                <Pressable style={styles.groupsButton} onPress={() => switchTab('groups')}>
                    <CustomText fontFamily="InterMedium" fontSize={14} style={selected === 'groups' ? { color: 'black' } : { color: 'white' }}>
                        Groups
                    </CustomText>
                </Pressable>
            </View>

            {/* Nội dung chat & group */}
            <Animated.View style={{ flexDirection: 'row', width: width * 2, transform: [{ translateX: boxTranslateX }] }}>
                <View style={[styles.largeBox, { width }]}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Chat Content</Text>
                </View>
                <View style={[styles.groupBox, { width }]}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Groups Content</Text>
                </View>
            </Animated.View>
        </View>
    );
}
