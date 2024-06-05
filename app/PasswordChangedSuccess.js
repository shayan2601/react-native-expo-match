// PasswordChangedScreen.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PasswordChangedSuccess = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100x100.png?text=Success' }} 
          style={styles.icon} 
        />
      </View>
      <Text style={styles.title}>Password Changed!</Text>
      <Text style={styles.subtitle}>Your password has been changed successfully.</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b6b6b',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PasswordChangedSuccess;
