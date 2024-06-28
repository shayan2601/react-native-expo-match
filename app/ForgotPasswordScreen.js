import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base_url } from '../constants/baseUrl';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const sendCode = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      const response = await axios.post(`${base_url}/api/user/forgot-password`, {
        email: email,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async(res)=> {
        console.log("RES: ", res)
        await AsyncStorage.setItem("forgotPasswordEmail", email)
        navigation.navigate('OTPVerification')
      }).catch((err)=> {
        console.log("ERRL: ", err)
      });

     
    } catch (error) {
      console.error('API Call Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity> */}
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Don't worry! It occurs. Please enter the email address linked with your account.</Text>
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity onPress={sendCode} style={styles.button}>
        <Text style={styles.buttonText}>Send Code</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
        <Text style={styles.loginLinkText}>Remember Password? <Text style={styles.loginText}>Login</Text></Text>
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
    marginTop: 90,
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
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'maroon',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    color: '#666',
    fontSize: 16,
  },
  loginText: {
    color: '#b71c1c',
    fontWeight: 'bold',
  },
});
