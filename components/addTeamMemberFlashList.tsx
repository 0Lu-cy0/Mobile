import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import reponsive from "./reponsive";

interface HorizontalListProps {
    data: string[];
}

const AddTeamMemberFlashList: React.FC<HorizontalListProps> = ({ data }) => {
    return (
        <FlashList
            data={data}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            estimatedItemSize={150}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <View
                    style={[
                        styles.box,
                        index > 0 && { marginLeft: reponsive.normalizeX(9) }, // Chỉ hộp thứ 2 trở đi mới có marginLeft
                    ]}
                >
                    <Text style={styles.text}>{item}</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    box: {
        width: reponsive.normalizeWidth(150),
        height: reponsive.normalizeHeight(41),
        backgroundColor: "#455A64",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddTeamMemberFlashList;
