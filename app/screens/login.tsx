import React, { useState } from 'react';
import { SafeAreaView, Image, View, TouchableOpacity, Alert, LayoutAnimation } from 'react-native';
import { useRouter } from 'expo-router';
import ResizableLogoBox from '../../components/Logo';
import CustomText from '@/components/customText';
import MyButton from '@/components/myButton';
import MyInputField from '@/components/inputButton';
import stylesLogin from '../styles/login_signupStyle';
import { loginWithEmail, loginWithGoogle } from '@/services/authService';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }
        setIsLoading(true);
        try {
            await loginWithEmail(email, password);

            router.push('/screens/home/(tab)');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Login Failed', error.message);
            } else {
                Alert.alert('Login Failed', 'An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const isLoginDisabled = !email.trim() || !password.trim() || isLoading;

    const onGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            router.push('/screens/home/(tab)');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Google Login Failed', error.message);
            }
            else {
                Alert.alert('Google Login Failed', 'An unknown error occurred.');
            }

        }
    };

    const onSignUp = () => {
        router.push('/screens/signup');
    };

    return (
        <SafeAreaView style={stylesLogin.container}>
            <ResizableLogoBox />
            <CustomText style={stylesLogin.text1}>Welcome Back!</CustomText>
            <CustomText style={stylesLogin.text2}>Email Address</CustomText>
            <MyInputField
                value={email}
                onChangeText={setEmail}
                placeholder='Enter your email'
                leftIcon={<Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/01c3956b-50b9-4793-819f-54b0e1af8a2a" }} style={{ width: 24, height: 24 }} />}
                style={stylesLogin.inputEmail}
            />

            <CustomText style={stylesLogin.text3}>Password</CustomText>
            <MyInputField
                value={password}
                onChangeText={setPassword}
                placeholder='Enter your password'
                leftIcon={<Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/484553ed-cffc-478e-8665-5a9353dafde4" }} style={{ width: 24, height: 24 }} />}
                rightIcon={
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={{
                                uri: showPassword
                                    ? "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dc42c0ed-eae3-440a-8b19-f9b5842a5869"
                                    : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e8912b8a-d4c8-456b-90fd-f8ebae2af43d"
                            }}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                }
                secureTextEntry={!showPassword}
                style={stylesLogin.inputPassword}
            />

            <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Reset password feature coming soon!')}>
                <CustomText style={stylesLogin.text4}>Forgot Password?</CustomText>
            </TouchableOpacity>

            <MyButton
                title={<CustomText fontFamily="Inter" fontSize={18}>{isLoading ? 'Logging in...' : 'Login'}</CustomText>}
                onPress={onLogin}
                disabled={isLoginDisabled}
                style={[
                    stylesLogin.loginButton,
                    ...(isLoginDisabled ? [{ opacity: 0.5 }] : [])
                ]}
            />

            <View style={stylesLogin.line1} />
            <CustomText fontFamily='InterMedium' fontSize={18} style={stylesLogin.text5}>Or continue with</CustomText>
            <View style={stylesLogin.line2} />

            <MyButton
                backgroundColor='transparent'
                title={
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={{
                                uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/af3d1608-6525-47dc-9f96-1c952c827e7b",
                            }}
                            style={stylesLogin.googleIconStyle}
                        />
                        <CustomText fontFamily="InterMedium" fontSize={18} style={{ color: '#FFFFFF' }}>Google</CustomText>
                    </View>
                }
                onPress={onGoogleLogin}
                style={stylesLogin.googleButton}
            />

            <View style={stylesLogin.signUpPageTransition}>
                <CustomText fontFamily='InterMedium' fontSize={16} style={{ color: '#8CAAB9' }}>Don't have an account? </CustomText>
                <TouchableOpacity onPress={onSignUp}>
                    <CustomText fontFamily='Inter' fontSize={18} style={{ color: '#FED36A' }}>Sign Up</CustomText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Login;
