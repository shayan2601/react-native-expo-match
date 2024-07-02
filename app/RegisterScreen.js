import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, StatusBar, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [nickName, setNickName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
  const [dob, setDob] = useState({ value: '', error: '' });
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [height, setHeight] = useState({ value: '', error: '' });
  // const [country, setCountry] = useState({ value: '', error: '' });
  // const [gender, setGender] = useState({ value: '', error: '' });
  const [address, setAddress] = useState({ value: '', error: '' });
  const [city, setCity] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Lahore', value: 'lahore' },
    { label: 'Karachi', value: 'karachi' },
    { label: 'Faisalabad', value: 'faisalabad' },
    { label: 'Islamabad', value: 'islamabad' },
    { label: 'Peshawar', value: 'peshawar' },
    { label: 'Quetta', value: 'quetta' },
    { label: 'Bahawalpur', value: 'bahawalpur' },
    { label: 'Sahiwal', value: 'sahiwal' },
    { label: 'Okara', value: 'okara' }
  ]);


  const [country, setCountry] = useState(null);
  const [openCountry, setOpenCountry] = useState(false);
  const [itemsCountry, setItemsCountry] = useState([
    { label: 'Pakistan', value: 'pakistan' },
    { label: 'India', value: 'india' },
    { label: 'China', value: 'china' },
    { label: 'Bangladesh', value: 'bangladesh' },
    { label: 'Nepal', value: 'nepal' },
  ]);

  const [gender, setGender] = useState(null);
  const [openGender, setOpenGender] = useState(false);
  const [itemsGender, setItemsGender] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);


  const navigation = useNavigation();

  const onNextPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordValidationError = validatePassword(password.value);
    console.log("passwordValidationError: ", passwordValidationError)
    // const passwordError = passwordValidator(password.value);
    // const confirmPasswordError = passwordValidator(confirmPassword.value);
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(lastName.value);
    const nickNameError = nameValidator(nickName.value);
    const phoneNumberError = nameValidator(phoneNumber.value);
    const dobError = nameValidator(dob.value);
    const heightError = nameValidator(height.value);
    const countryError = nameValidator(country);
    const genderError = nameValidator(gender);
    const addressError = nameValidator(address.value);
    const cityError = city ? '' : 'Input cannot be empty';

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      setConfirmPasswordError("");
      return
    } else if (password.value !== confirmPassword.value) {
      setPasswordError("");
      setConfirmPasswordError("Passwords do not match.");
      return
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
      // Proceed with form submission
    }

    if (emailError || passwordError || firstNameError || lastNameError || nickNameError || confirmPasswordError || phoneNumberError || dobError || heightError || countryError || genderError || addressError || cityError) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill out all required fields correctly',
        visibilityTime: 4000,
        position: 'top',
        topOffset: 1
      });
    }
    console.log("city", city)
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
      country: country,
      gender: gender,
      address: address.value,
      city: city
    }));

    navigation.navigate('RegisterScreenPersonalInfo');
  };

  const handleChange = (setter) => (text) => {
    setter({ value: text, error: '' });
  };

  const renderInput = (placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default', error = '') => (
    
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder={placeholder}
          placeholderTextColor="#000"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          
        />
  
  );

  return (
    <SafeAreaView style={styles.containerParent}>
      {/* <FlatList
        data={[]}
        ListHeaderComponent={() => ( */}
          <ScrollView contentContainerStyle={styles.container}>
            <Toast />
            <TouchableOpacity style={styles.backButton}>
              {/* <Ionicons onPress={() => navigation.goBack()} name="chevron-back" size={24} color="black" /> */}
            </TouchableOpacity>
            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.inputHalfContainer}>
              {renderInput("First Name", firstName.value, handleChange(setFirstName))}
              {renderInput("Last Name", lastName.value, handleChange(setLastName))}
            </View>
            
            {renderInput("Nick Name", nickName.value, handleChange(setNickName))}
            {renderInput("Email", email.value, handleChange(setEmail))}
            <DropDownPicker
                open={openGender}
                value={gender}
                items={itemsGender}
                setOpen={setOpenGender}
                setValue={setGender}
                setItems={setItemsGender}
                placeholder="Select your Gender"
                style={styles.picker}
                containerStyle={styles.pickerContainer}
              />
            <View style={styles.inputHalfContainer}>
              {renderInput("Password", password.value, handleChange(setPassword), true, 'default', passwordError)}
              {renderInput("Confirm Password", confirmPassword.value, handleChange(setConfirmPassword), true, 'default', confirmPasswordError)}
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            

            {renderInput("+923227889043", phoneNumber.value, handleChange(setPhoneNumber), false, "phone-pad")}
            <DropDownPicker
                open={openCountry}
                value={country}
                items={itemsCountry}
                setOpen={setOpenCountry}
                setValue={setCountry}
                setItems={setItemsCountry}
                placeholder="Select your Country"
                style={styles.picker}
                containerStyle={styles.pickerContainer}
              />
            <View style={styles.inputHalfContainer}>
              {renderInput("DOB", dob.value, handleChange(setDob))}
              
              {/* {renderInput("Gender", gender.value, handleChange(setGender))} */}
            </View>
            
            <View style={styles.inputHalfContainer}>
            
              {/* {renderInput("Country", country.value, handleChange(setCountry))} */}
              {renderInput("Height", height.value, handleChange(setHeight))}
            </View>
            
            {renderInput("Address", address.value, handleChange(setAddress))}
            
            <DropDownPicker
              open={open}
              value={city}
              items={items}
              setOpen={setOpen}
              setValue={setCity}
              setItems={setItems}
              placeholder="Select your city"
              style={styles.picker}
              containerStyle={styles.pickerContainer}
            />
            <TouchableOpacity onPress={onNextPressed} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        {/* )}
        contentContainerStyle={styles.container}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerParent: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
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
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputHalfContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    marginBottom: 25,
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    width: '100%',
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
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
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


const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!hasNumber) {
    return "Password must contain at least one number.";
  }
  if (!hasSpecialChar) {
    return "Password must contain at least one special character.";
  }

  return "";
};