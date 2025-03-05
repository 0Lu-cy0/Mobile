import { useRouter } from "expo-router";
import { SafeAreaView, View, Image } from "react-native";
import MyButton from "@/components/myButton";
import ResizableLogoBox from "../components/Logo";
import React from "react";
import styles from "./styles/splashStyle";
import CustomText from "@/components/customText";  // Import CustomText

export default function Index() {
  const router = useRouter();

  const onContinue = () => {
    router.push("/screens/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ResizableLogoBox />
      <View style={styles.viewImage}>
        <Image source={require('@/assets/images/pana.png')} style={styles.image} />
      </View>
      <View style={styles.viewText}>
        <CustomText fontFamily="InterMedium" fontSize={60} style={styles.text}>
          Manage {"\n"}
          your {"\n"}
          Task with {"\n"}
          <CustomText fontFamily="InterMedium" fontSize={60} style={{ ...styles.text, color: '#FED36A' }}>DayTask</CustomText>
        </CustomText>
      </View>
      <MyButton
        title={<CustomText fontFamily="Inter" fontSize={18}>Let's Start</CustomText>}  // Wrap CustomText in curly braces
        onPress={onContinue}
        style={styles.letStartBox}
      />
    </SafeAreaView>
  );
}
