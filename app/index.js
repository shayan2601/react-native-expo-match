import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native'

export default function StartScreen() {

  const navigation = useNavigation();

  return (
    <Background>
      <Logo />
      <Header>Rishta.com</Header>
        <Paragraph>
          A simple React Native Expo Login template app.
        </Paragraph>
      <Button
        mode="contained"
        style={styles.loginButton}
        labelStyle={styles.loginButtonText}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Log in
      </Button>
      <Button
        mode="outlined"
        style={styles.createAccountButton}
        labelStyle={styles.createAccountButtonText}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Create an account
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#f1f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10, // Optional: adds space between buttons
  },
  loginButtonText: {
    color: '#000000',
  },
  createAccountButton: {
    backgroundColor: '#800020',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  createAccountButtonText: {
    color: '#FFFFFF',
  },
})
