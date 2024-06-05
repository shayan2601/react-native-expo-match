import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const verifyOtp = async () => {
    const email = await AsyncStorage.getItem("forgotPasswordEmail")
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }
    console.log("otpCode: ", otpCode)
    try {
      const response = await axios.post('http://13.60.56.191:3001/api/user/verify-otp', {
        otp: otpCode,
        email: email,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res)=> {
        console.log("res: ", res)
        navigation.navigate('ResetPassword')
      });

      
    } catch (error) {
      console.error('API Call Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the verification code we just sent on your email address.</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            placeholderTextColor="#000"
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(index, value)}
          />
        ))}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity onPress={verifyOtp} style={styles.button}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { /* Handle resend code logic here */ }} style={styles.resendLink}>
        <Text style={styles.resendLinkText}>Didn't receive code? <Text style={styles.resendText}>Resend</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 30,
    color: '#333',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#b71c1c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  resendLink: {
    marginTop: 20,
  },
  resendLinkText: {
    color: '#666',
    fontSize: 16,
  },
  resendText: {
    color: '#b71c1c',
    fontWeight: 'bold',
  },
});
