import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function App() {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [nickName, setNickName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
  const [dob, setDob] = useState({ value: '', error: '' });
  const [height, setHeight] = useState({ value: '', error: '' });
  const [country, setCountry] = useState({ value: '', error: '' });
  const [gender, setGender] = useState({ value: '', error: '' });
  const [address, setAddress] = useState({ value: '', error: '' });

  const navigation = useNavigation();

  const onNextPressed = async() => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = passwordValidator(confirmPassword.value);
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(lastName.value);
    const nickNameError = nameValidator(nickName.value);
    const phoneNumberError = nameValidator(phoneNumber.value);
    const dobError = nameValidator(dob.value);
    const heightError = nameValidator(height.value);
    const countryError = nameValidator(country.value);
    const genderError = nameValidator(gender.value);
    const addressError = nameValidator(address.value);
    // if (emailError || passwordError || firstNameError || lastNameError || nickNameError) {
    //   setFirstName({ ...firstName, error: firstNameError });
    //   setLastName({ ...lastName, error: lastNameError });
    //   setNickName({ ...nickName, error: nickNameError });
    //   setEmail({ ...email, error: emailError });
    //   setPassword({ ...password, error: passwordError });
    //   return;
    // }
    console.log("emailError: ", emailError)
    if (emailError || passwordError || firstNameError || lastNameError || nickNameError || confirmPasswordError || phoneNumberError || dobError || heightError || countryError || genderError || addressError) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill out all required fields correctly',
        visibilityTime: 4000,
        position: 'top',
        topOffset: 1
      });
      
    }
    await AsyncStorage.setItem('userData', JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      nickName: nickName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      phoneNumber: phoneNumber.value,
      dob: dob.value,
      height: height.value,
      country: country.value,
      gender: gender.value,
      address: address.value
    }));

    navigation.navigate('RegisterScreenPersonalInfo')
  };

  const handleChange = (setter) => (text) => {
    setter({ value: text, error: '' });
  };

  return (
    <SafeAreaView style={styles.containerParent}>
      <ScrollView style={styles.container}>
        <Toast />
        <TouchableOpacity style={styles.backButton}>
          {/* <Ionicons onPress={() => navigation.goBack()} name="chevron-back" size={24} color="black" /> */}
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputHalf}
            placeholder="First Name"
            placeholderTextColor="#000"
            value={firstName.value}
            onChangeText={handleChange(setFirstName)}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Last Name"
            placeholderTextColor="#000"
            value={lastName.value}
            onChangeText={handleChange(setLastName)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nick Name"
          placeholderTextColor="#000"
          value={nickName.value}
          onChangeText={handleChange(setNickName)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000"
          value={email.value}
          onChangeText={handleChange(setEmail)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry
          value={password.value}
          onChangeText={handleChange(setPassword)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#000"
          secureTextEntry
          value={confirmPassword.value}
          onChangeText={handleChange(setConfirmPassword)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          placeholderTextColor="#000"
          keyboardType="phone-pad"
          value={phoneNumber.value}
          onChangeText={handleChange(setPhoneNumber)}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputHalf}
            placeholder="DOB"
            placeholderTextColor="#000"
            value={dob.value}
            onChangeText={handleChange(setDob)}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Height"
            placeholderTextColor="#000"
            value={height.value}
            onChangeText={handleChange(setHeight)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputHalf}
            placeholder="Country"
            placeholderTextColor="#000"
            value={country.value}
            onChangeText={handleChange(setCountry)}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Gender"
            placeholderTextColor="#000"
            value={gender.value}
            onChangeText={handleChange(setGender)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#000"
          value={address.value}
          onChangeText={handleChange(setAddress)}
        />
        <TouchableOpacity onPress={onNextPressed} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerParent: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 54,
    left: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 50,
    alignItems: 'center',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  inputHalf: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '48%',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#800020',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) return 'Invalid email address';
  return '';
};

const passwordValidator = (password) => {
  if (password.length < 6) return 'Password must be at least 6 characters long';
  return '';
};

const nameValidator = (name) => {
  if (!name) return 'Input cannot be empty';
  return '';
};
