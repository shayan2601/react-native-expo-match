import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen({  }) {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');


  useEffect(() => {
      const fetchData = async () => {
          try {
              const userId = await AsyncStorage.getItem('userId');
              const userToken = await AsyncStorage.getItem('userToken');

              const response = await axios.get(`http://13.60.56.191:3001/api/profile/${userId}`, {
                headers: {
                  'Authorization': `Bearer ${userToken}`,
                  'Content-Type': 'application/json'
                }
              });
              const profileData = response.data?.data;

              setFirstName(profileData.firstName || '');
              setLastName(profileData.lastName || '');
              setEmail(profileData.email || '');
              setContactNumber(profileData.contactNumber || '');
              setAge(profileData.age || '');
              setHeight(profileData.height || '');
              setCountry(profileData.country || '');
              setGender(profileData.gender || '');
              setAddress(profileData.address || '');
              
              // If password and confirmPassword are also part of the fetched data
              setPassword(profileData.password || '');
          } catch (error) {
              console.error("Error fetching profile data", error);
          }
      };

      fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const payload = {
        userId,
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        age,
        height,
        country,
        gender,
        address
      };

      const response = await axios.post('http://13.60.56.191:3001/api/user/profile/update', payload);
      
      if (response.data.success) {
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error("Error updating profile", error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Edit</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
      <View style={styles.inputRow}>
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="Height"
          value={height}
          onChangeText={setHeight}
        />
      </View>
      <View style={styles.inputRow}>
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
      </View>
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
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
  inputHalf: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: '48%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: 'maroon',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
