import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const pinkBackground = Asset.fromModule(require('../assets/bg-landing-page.png')).uri;
  const brideGroomImage = Asset.fromModule(require('../assets/bride-groom.png')).uri;
  const bottomFlowers = Asset.fromModule(require('../assets/fl-1.png')).uri;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: pinkBackground }} style={styles.backgroundImage}>
        <Text style={styles.headerText}>Welcome</Text>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: brideGroomImage }} style={styles.brideGroomImage} />
            <Text style={styles.overlayText}>Rishta.com</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: bottomFlowers }} style={styles.bottomFlowers} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40, // Adjusted for better alignment
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50, // Adjusted for better alignment
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
    width: 300,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brideGroomImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  overlayText: {
    position: 'absolute',
    top: 10,
    left: '25%',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{ rotate: '-0deg' }],
  },
  loginButton: {
    backgroundColor: '#C2185B',
    paddingVertical: 16,
    paddingHorizontal: 130,
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems: 'center', // Center align text
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'white',
    borderColor: '#C2185B',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 115,
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems: 'center', // Center align text
  },
  registerButtonText: {
    color: '#C2185B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomFlowers: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
  },
});
