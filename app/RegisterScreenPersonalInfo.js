import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';

export default function RegisterScreenPersonalInfo() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    nickName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dob: '',
    height: '',
    country: '',
    gender: '',
    address: '',
    city: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const [religion, setReligion] = useState({ value: '', error: '' });
  // const [cast, setCast] = useState({ value: '', error: '' });
  // const [tongue, setTongue] = useState({ value: '', error: '' });
  const [community, setCommunity] = useState({ value: '', error: '' });
  const [education, setEducation] = useState({ value: '', error: '' });
  const [occupation, setOccupation] = useState({ value: '', error: '' });
  const [bio, setBio] = useState({ value: '', error: '' });
  const [consent, setConsent] = useState(false);
  // const [sect, setSect] = useState({ value: '', error: '' });




  const [cast, setCast] = useState(null);
  const [openCast, setOpenCast] = useState(false);
  const [itemsCast, setItemsCast] = useState([
    { label: 'Sayyid', value: 'sayyid' },
    { label: 'Rajput', value: 'rajput' },
    { label: 'Sheikh', value: 'sheikh' },
    { label: 'Pathan', value: 'pathan' },
    { label: 'Moguls', value: 'moguls' },
    { label: 'Quetta', value: 'quetta' },
  ]);

  const [sect, setSect] = useState(null);
  const [openSect, setOpenSect] = useState(false);
  const [itemsSect, setItemsSect] = useState([
    { label: 'Sunni', value: 'sunni' },
    { label: 'Wahabi', value: 'wahabi' },
    { label: 'Deobandi', value: 'deobandi' },
    { label: 'Shia', value: 'shia' },
  ]);



  const [tongue, setTongue] = useState(null);
  const [openTongue, setOpenTongue] = useState(false);
  const [itemsTongue, setItemsTongue] = useState([
    { label: 'Punjabi', value: 'punjabi' },
    { label: 'Sindhi', value: 'sindhi' },
    { label: 'Hindi', value: 'hindi' },
    { label: 'Urdu', value: 'urdu' },
    { label: 'English', value: 'english' },
  ]);

  const [religion, setReligion] = useState(null);
  const [openReligion, setOpenReligion] = useState(false);
  const [itemsReligion, setItemsReligion] = useState([
    { label: 'Islam', value: 'islam' },
    { label: 'Hinduism', value: 'hinduism' },
    { label: 'Christianity', value: 'christianity' },
    { label: 'Sikhism', value: 'sikhism' },
    { label: 'Jainism', value: 'jainism' },
    { label: 'Buddhist', value: 'buddhist' },
  ]);




  const navigation = useNavigation();

  const handleConsentChange = () => {
    setConsent(!consent);
  };

  const onNextPressed = async() => {
    console.log("First screen user data::: ", userData)

    
    const religionError = nameValidator(religion);
    const castError = nameValidator(cast);
    const tongueError = nameValidator(tongue);
    const communityError = nameValidator(community.value);
    const educationError = nameValidator(education.value);
    const occupationError = nameValidator(occupation.value);
    const bioError = nameValidator(bio.value);
    const sectError = nameValidator(sect);

    if (religionError || castError || tongueError || communityError || educationError || occupationError || bioError || sectError) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill out all required fields correctly',
        visibilityTime: 4000,
        position: 'top',
        topOffset: 1
      });
      
    }
    if (consent) {


      await AsyncStorage.setItem('userDataSecond', JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        nickName: userData.nickName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        phoneNumber: userData.phoneNumber,
        dob: userData.dob,
        height: userData.height,
        country: userData.country,
        address: userData.address,
        gender: userData.gender,
        religion: religion,
        cast: cast,
        sect: sect,
        tongue: tongue,
        community: community.value,
        education: education.value,
        city: userData.city,
        occupation: occupation.value,
        bio: bio.value,
        isAgreedToTermsAndPolicy: 'true'
      }));
  
      navigation.navigate('UploadImageScreen');
    } else {
      Alert.alert('Consent Required', 'Please agree to terms and policy to proceed');
    }
  };

  const handleChange = (setter) => (text) => {
    setter({ value: text, error: '' });
  };

  return (
    <SafeAreaView style={styles.containerParent}>
      <ScrollView style={styles.container}>
      <Toast />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("RegisterScreen")}>
        {/* <Icon name="arrow-back" size={24} color="#000" /> */}
      </TouchableOpacity>
      <Text style={styles.title}>Personal Info</Text>
      <View style={styles.inputContainer}>
        <DropDownPicker
          open={openReligion}
          value={religion}
          items={itemsReligion}
          setOpen={setOpenReligion}
          setValue={setReligion}
          setItems={setItemsReligion}
          placeholder="Select your religion"
          style={styles.pickerReligion}
          containerStyle={styles.pickerContainerReligion}
        />
        <DropDownPicker
          open={openCast}
          value={cast}
          items={itemsCast}
          setOpen={setOpenCast}
          setValue={setCast}
          setItems={setItemsCast}
          placeholder="Select your cast"
          style={styles.pickerCast}
          containerStyle={styles.pickerContainerCast}
        />
        
      </View>
      
      
      
      <TextInput
        style={styles.input}
        placeholder="Community"
        placeholderTextColor="#000"
        value={community.value}
        onChangeText={handleChange(setCommunity)}
      />
      <TextInput
        style={styles.input}
        placeholder="Education"
        placeholderTextColor="#000"
        value={education.value}
        onChangeText={handleChange(setEducation)}
      />
      <DropDownPicker
          open={openSect}
          value={sect}
          items={itemsSect}
          setOpen={setOpenSect}
          setValue={setSect}
          setItems={setItemsSect}
          placeholder="Select your Sect"
          style={styles.picker}
          containerStyle={styles.pickerContainer}
        />
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        placeholderTextColor="#000"
        value={occupation.value}
        onChangeText={handleChange(setOccupation)}
      />
      
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Bio"
        placeholderTextColor="#000"
        value={bio.value}
        onChangeText={handleChange(setBio)}
        multiline
      />
      <DropDownPicker
          open={openTongue}
          value={tongue}
          items={itemsTongue}
          setOpen={setOpenTongue}
          setValue={setTongue}
          setItems={setItemsTongue}
          placeholder="Select your Tongue"
          style={styles.picker}
          containerStyle={styles.pickerContainer}
        />
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={handleConsentChange}>
          {consent ? (
            <Icon name="checkbox" size={24} color="#800020" />
          ) : (
            <Icon name="checkbox-outline" size={24} color="#ccc" />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          By creating an account, you agree to our{' '}
          <Text style={styles.link}>terms</Text> and{' '}
          <Text style={styles.link}>policy</Text>
        </Text>
      </View>
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
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 65,
    left: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    marginTop: 60,
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
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#fff',
    // zIndex: 1
  },
  pickerReligion: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#fff',
    // zIndex: 1
  },
  pickerCast: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#fff',
    zIndex: 1
  },
  pickerContainer: {
    width: '100%',
    zIndex: 1
  },
  pickerContainerReligion: {
    width: '50%',
    // zIndex: 1
  },
  pickerContainerCast: {
    width: '50%',
    zIndex: 1
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
  agreementText: {
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  link: {
    color: '#800020',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxText: {
    marginLeft: 8,
    color: '#000',
  },
});


const nameValidator = (name) => {
  if (!name) return 'Input cannot be empty';
  return '';
};
