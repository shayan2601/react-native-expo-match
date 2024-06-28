import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { base_url } from '../constants/baseUrl';

export default function EditProfileScreen({  }) {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  const [about, setAbout] = useState('')
  const [sect, setSect] = useState('')
  const [tongue, setTongue] = useState('')
  const [religion, setReligion] = useState('')
  const [education, setEducation] = useState('')
  const [cast, setCast] = useState('')


  useEffect(() => {
      const fetchData = async () => {
          try {
              const userId = await AsyncStorage.getItem('userId');
              const userToken = await AsyncStorage.getItem('userToken');

              const response = await axios.get(`${base_url}/api/profile/${userId}`, {
                headers: {
                  'Authorization': `Bearer ${userToken}`,
                  'Content-Type': 'application/json'
                }
              }).then((res)=> {
                console.log("Res: ", res)

                console.log("response: ", res)
                const profileData = res?.data?.data[0];
                console.log("profileData: ", profileData)
                setFirstName(profileData?.firstName || '');
                setLastName(profileData?.lastName || '');
                setEmail(profileData?.email || '');
                setNickName(profileData?.nickName || '');
                setPhoneNumber(profileData?.phoneNumber || '');
                setDob(profileData?.dob || '');
                setHeight(`${profileData?.height.feet}'${profileData?.height.inches}` || '');
                setCountry(profileData?.country || '');
                setGender(profileData?.gender || '');
                setAddress(profileData?.address || '');

                setAbout(profileData?.about || '');
                setSect(profileData?.sect || 'abc');
                setReligion(profileData?.religion || '');
                setCast(profileData?.cast || '');
                setEducation(profileData?.education || '');
                setTongue(profileData?.tongue || '');
                
                // If password and confirmPassword are also part of the fetched data
                setPassword(profileData.password || '');
              }).catch(async(err)=> {
                if(err?.response?.data?.message == "Invalid/Expired token."){
                  await AsyncStorage.clear()
                  navigation.navigate('LoginScreen')
                }
                console.log("ERR: ", err)
              });
              
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
        nickName,
        email,
        sect,
        tongue,
        education,
        religion,
        cast,
        about,
        phoneNumber,
        dob,
        height,
        country,
        gender,
        address
      };
      const userToken = await AsyncStorage.getItem('userToken');

      const response = await axios.put('${base_url}/api/user/profile/update', payload, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
          }
      });
      
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
        placeholder="Nick Name"
        value={nickName}
        onChangeText={setNickName}
        autoCapitalize="none"
      />
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {/* <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      /> */}
      
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Contact Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <View style={styles.inputRow}>
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="DOB"
          value={dob}
          onChangeText={setDob}
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
      <View style={styles.inputRow}>
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="Education"
          value={education}
          onChangeText={setEducation}
        />
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="tongue"
          value={tongue}
          onChangeText={setTongue}
        />
      </View>
      <View style={styles.inputRow}>
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="Religion"
          value={religion}
          onChangeText={setReligion}
        />
        <TextInput
          placeholderTextColor="#000"
          style={styles.inputHalf}
          placeholder="Cast"
          value={cast}
          onChangeText={setCast}
        />
      </View>
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="About"
        value={about}
        onChangeText={setAbout}
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
    marginVertical: 26,
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
