import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

const RootLayout = () => {
  useEffect(() => {
    // Ẩn thanh điều hướng khi ứng dụng được tải
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  return (
    <>
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="screens/login" />
        <Stack.Screen name="screens/signup" />
        <Stack.Screen name="screens/home/(tab)" />
      </Stack>
      <StatusBar backgroundColor='white' style='dark' />
    </>
  );
};

const styles = StyleSheet.create({});

export default RootLayout;
