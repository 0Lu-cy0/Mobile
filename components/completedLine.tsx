import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import responsive from "@/components/reponsive";

interface CompletedLineProps {
    progress: number; // Giá trị phần trăm từ 0 đến 100
    containerStyle?: ViewStyle; // Style tùy chỉnh
}

const CompletedLine: React.FC<CompletedLineProps> = ({ progress, containerStyle }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.percentLineSelected, { width: `${progress}%` }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: responsive.normalizeWidth(163),
        height: responsive.normalizeHeight(6),
        backgroundColor: "#FFFFFF", // Màu nền của progress bar
        borderRadius: 8,
        overflow: "hidden", // Đảm bảo không bị tràn ra ngoài
    },
    percentLineSelected: {
        height: "100%",
        backgroundColor: "#212832",
        borderRadius: 8,
    },
});

export default CompletedLine;
