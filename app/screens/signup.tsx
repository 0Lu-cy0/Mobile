import MyButton from '@/components/myButton';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, LayoutAnimation } from 'react-native';
import ResizableLogoBox from '../../components/Logo';
import styleSignUp from '../styles/login_signupStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@/components/customText';
import MyInputField from '@/components/inputButton';
import { registerWithEmail, loginWithGoogle } from "@/services/authService";

const Signup = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isRegisterDisabled = !fullName.trim() || !email.trim() || !password.trim() || !isChecked || isLoading;

    const onRegister = async () => {
        if (!isChecked) {
            alert('You need to agree to the terms and conditions to register.');
            return;
        }
        if (!fullName.trim() || !email.trim() || !password.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        setIsLoading(true);

        try {
            const user = await registerWithEmail(email, password);
            console.log("User registered:", user);
            router.push('/screens/login');
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onGoogleRegister = async () => {
        try {
            const user = await loginWithGoogle();
            console.log("User registered with Google:", user);
            router.push('/screens/login');
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unknown error occurred.');
            }
        }
    };

    const onLogin = () => {
        router.push('/screens/login');
    };

    return (
        <SafeAreaView style={styleSignUp.container}>
            <ResizableLogoBox />

            <CustomText style={styleSignUp.text1}>Create your account</CustomText>

            <CustomText style={styleSignUp.text2}>Full Name</CustomText>
            <MyInputField
                value={fullName}
                onChangeText={setFullName}
                placeholder='Enter your full name'
                leftIcon={<Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3caff157-2efa-4052-95fd-f178e49fd5c9" }} style={{ width: 24, height: 24 }} />}
                style={styleSignUp.inputEmail}
            />

            <CustomText style={styleSignUp.text3}>Email Address</CustomText>
            <MyInputField
                value={email}
                onChangeText={setEmail}
                placeholder='Enter your email'
                leftIcon={<Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/01c3956b-50b9-4793-819f-54b0e1af8a2a" }} style={{ width: 24, height: 24 }} />}
                style={styleSignUp.inputPassword}
            />

            <CustomText style={styleSignUp.text6}>Password</CustomText>
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
                style={styleSignUp.signUpPassword}
            />

            <View style={styleSignUp.termsContainer}>
                <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                    <Image
                        source={{
                            uri: isChecked
                                ? "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6f39f8db-578b-4436-ae45-5103af475330"
                                : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/eb5662b6-1b13-4050-9be8-be99b6ef85cb"
                        }}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
                <View style={styleSignUp.textTermsContainer}>
                    <CustomText style={[styleSignUp.text7]}>
                        I have read & agreed to DayTask{" "}
                        <Text style={{ color: '#FED36A', lineHeight: 17 }}>Privacy Policy,</Text>{"\n"}
                        <Text style={{ color: '#FED36A' }}>Terms & Condition</Text>
                    </CustomText>
                </View>
            </View>

            <MyButton
                title={
                    <CustomText fontFamily="Inter" fontSize={18}>
                        {isLoading ? "Registering..." : "Register"}
                    </CustomText>
                }
                onPress={onRegister}
                disabled={isRegisterDisabled}
                style={[
                    styleSignUp.signnupButton,
                    ...(isRegisterDisabled ? [{ opacity: 0.5 }] : [])
                ]}
            />

            <View style={styleSignUp.line1Sign} />
            <CustomText
                fontFamily='InterMedium'
                fontSize={18}
                style={styleSignUp.text8}
            >Or continue with</CustomText>
            <View style={styleSignUp.line2Sign} />

            <MyButton
                backgroundColor='transparent'
                title={
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={{
                                uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/af3d1608-6525-47dc-9f96-1c952c827e7b",
                            }}
                            style={styleSignUp.googleIconStyle}
                        />
                        <CustomText fontFamily="InterMedium" fontSize={18} style={{ color: '#FFFFFF' }}>Google</CustomText>
                    </View>
                }
                onPress={onGoogleRegister}
                style={styleSignUp.googleButtonSign}
            />

            <View style={styleSignUp.logInPageTransition} >
                <CustomText fontFamily='InterMedium' fontSize={16} style={{ color: '#8CAAB9' }}>Already have an account? </CustomText>
                <TouchableOpacity onPress={onLogin}>
                    <CustomText fontFamily='Inter' fontSize={18} style={{ color: '#FED36A' }}>Log In</CustomText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Signup;
