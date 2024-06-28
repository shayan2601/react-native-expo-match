import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async() => {
    setIsLoading(true);
    
    // return navigation.navigate('Dashboard');
    await axios.post('http://13.60.56.191:3001/api/user/login', {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async(res)=>{
        console.log("RES: ", res.data.data)
        try {
          await AsyncStorage.setItem('userToken', res.data.data.token);
          await AsyncStorage.setItem('userId', res.data.data.userId);
          await AsyncStorage.setItem('userEmail', res.data.data.email);
          setIsLoading(false);
          return navigation.navigate('Dashboard');
        } catch (error) {
          console.error('Error parsing JSON:', error);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }).catch((error) => {
        setIsLoading(false);
        console.log("ERR: ", error)
      });
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.welcomeText}>Welcome back! Glad to see you, Again!</Text>
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity>
        <Text onPress={() => navigation.navigate('ForgotPasswordScreen')} style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Don’t have an account? <Text onPress={() => navigation.navigate('RegisterScreen')} style={styles.registerNow}>Register Now</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: 'grey',
  },
  loginButton: {
    backgroundColor: 'maroon',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerText: {
    textAlign: 'center',
    color: 'grey',
  },
  registerNow: {
    color: 'maroon',
    fontWeight: 'bold',
  },
});
