import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import CustomText from '@/components/customText';
import styles from './styles/messages';
import responsive from "@/components/reponsive";
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function MessagesScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<'chat' | 'groups'>('chat');
    const [isLoading, setIsLoading] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false); // Tránh spam click khi đang animating
    const rotation = useRef(new Animated.Value(0)).current;

    // Animation cho chuyển tab
    const translateX = useRef(new Animated.Value(responsive.normalizeX(29))).current;
    const boxTranslateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isLoading) {
            Animated.loop(
                Animated.timing(rotation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ).start();
            setTimeout(() => setIsLoading(false), 50);
        }
    }, [isLoading]);

    const switchTab = (tab: 'chat' | 'groups') => {
        if (selected !== tab && !isAnimating) {
            setIsAnimating(true); // Bật trạng thái animation
            const isChat = tab === 'chat';

            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: isChat ? responsive.normalizeX(29) : responsive.normalizeX(224),
                    duration: 250, // Giảm thời gian animation để nhanh hơn
                    useNativeDriver: true,
                }),
                Animated.timing(boxTranslateX, {
                    toValue: isChat ? 0 : -width,
                    duration: 250, // Đồng bộ thời gian với thanh trượt
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setSelected(tab); // Chỉ cập nhật state khi animation hoàn tất
                setIsAnimating(false); // Cho phép nhấn tiếp
            });
        }
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#212832' }}>
            {/* Thanh chọn tab */}
            <View>
                <Animated.View
                    style={[
                        styles.highlightTab,
                        { transform: [{ translateX }] },
                    ]}
                />
                <Pressable
                    style={styles.chatButton}
                    onPress={() => switchTab('chat')}
                    disabled={isAnimating} // Tắt sự kiện nhấn khi đang chạy animation
                >
                    <CustomText fontFamily="InterMedium" fontSize={14} style={selected === 'chat' ? { color: 'black' } : { color: 'white' }}>
                        Chat
                    </CustomText>
                </Pressable>
                <Pressable
                    style={styles.groupsButton}
                    onPress={() => switchTab('groups')}
                    disabled={isAnimating} // Tắt sự kiện nhấn khi đang chạy animation
                >
                    <CustomText fontFamily="InterMedium" fontSize={14} style={selected === 'groups' ? { color: 'black' } : { color: 'white' }}>
                        Groups
                    </CustomText>
                </Pressable>
            </View>

            {/* Nội dung chat & group */}
            <Animated.View style={{ flexDirection: 'row', width: width * 2, transform: [{ translateX: boxTranslateX }] }}>
                <View style={[styles.largeBox, { width }]}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Chat Content</Text>
                    <Pressable style={{ width: 100, height: 100, backgroundColor: 'green' }} onPress={() => router.push('../chat')}>

                    </Pressable>
                </View>
                <View style={[styles.groupBox, { width }]}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Groups Content</Text>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}
