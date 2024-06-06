import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterScreen" options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterScreenPersonalInfo" options={{ headerShown: false }}/>
      <Stack.Screen name="UploadImageScreen" options={{ headerShown: false }}/>
      <Stack.Screen name="LiveCamera" />
      <Stack.Screen name="ForgotPasswordScreen" />
      <Stack.Screen name="OTPVerification" />
      <Stack.Screen name="ResetPassword" />
      <Stack.Screen name="PasswordChangedSuccess" />
      <Stack.Screen name="EditProfile" options={{ headerShown: false }}/>
      <Stack.Screen name="Dashboard" options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" />
      <Stack.Screen name="Message" />
      <Stack.Screen name="Chat" />
      <Stack.Screen name="ProfileVerifiedScreen" />
      <Stack.Screen name="Matches" />
    </Stack>
  );
}
