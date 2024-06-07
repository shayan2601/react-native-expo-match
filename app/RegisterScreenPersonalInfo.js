import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
    address: ''
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

  const [religion, setReligion] = useState({ value: '', error: '' });
  const [cast, setCast] = useState({ value: '', error: '' });
  const [tongue, setTongue] = useState({ value: '', error: '' });
  const [community, setCommunity] = useState({ value: '', error: '' });
  const [education, setEducation] = useState({ value: '', error: '' });
  const [occupation, setOccupation] = useState({ value: '', error: '' });
  const [bio, setBio] = useState({ value: '', error: '' });
  const [consent, setConsent] = useState(false);
  const [sect, setSect] = useState({ value: '', error: '' });


  const navigation = useNavigation();

  const handleConsentChange = () => {
    setConsent(!consent);
  };

  const onNextPressed = async() => {
    console.log("First screen user data::: ", userData)
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
        religion: religion.value,
        cast: cast.value,
        sect: sect.value,
        tongue: tongue.value,
        community: community.value,
        education: education.value,
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Personal Info</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputHalf}
          placeholder="Religion"
          placeholderTextColor="#000"
          value={religion.value}
          onChangeText={handleChange(setReligion)}
        />
        <TextInput
          style={styles.inputHalf}
          placeholder="Cast"
          placeholderTextColor="#000"
          value={cast.value}
          onChangeText={handleChange(setCast)}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Sect"
        placeholderTextColor="#000"
        value={sect.value}
        onChangeText={handleChange(setSect)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tongue"
        placeholderTextColor="#000"
        value={tongue.value}
        onChangeText={handleChange(setTongue)}
      />
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
    top: 5,
    left: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
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
