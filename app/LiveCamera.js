import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function LiveCamera() {
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageBuffer, setImageBuffer] = useState(null);
  const [ doc, setDoc ] = useState();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
        alert('Camera permission is required to take pictures.');
        return;
    }

    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    }).then(response => {
      console.log("RESPONSE:,:",response);
        let { name, size, uri } = response.assets[0];
        setImageUri(uri)
        let ext = uri.split('.').pop();
        let nameParts = uri.split('/')
        const imageName = nameParts.pop();
        
        console.log("ext: ", ext)
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: imageName,
          size: size,
          uri: uri,
          type: "application/" + ext
        };
        console.log(fileToUpload, '...............file')
        setDoc(fileToUpload);
    })

  };

  const sendImage = async () => {
    setIsLoading(true);
    if (!imageUri) {
        alert('No image selected.');
        return;
    }

    const userDataWithoutParsed = await AsyncStorage.getItem('registerUserData');
    const parsedUserData = JSON.parse(userDataWithoutParsed);
    console.log("parsedUserData: ", parsedUserData)

    let userId = parsedUserData?.data?.id
    console.log("doc: ", doc)
    try {
        const formData = new FormData();
        formData.append('facialImage', doc);
        formData.append("userId", userId)

        console.log("formData: ", formData)

        let response = await axios.post('http://13.60.56.191:3001/api/user/facial-verification', formData, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
        }).then((res)=> {
            console.log("RES:: ", res?.data?.data)
            setIsLoading(false);
            if (res?.data?.data?.samePerson == true) {
              console.log("HEREEEE", res?.data?.data?.samePerson)
              navigation.navigate('ProfileVerifiedScreen');
            } else {
              console.log("SHuld not here")
                setErrorMessage("Face doesn't match, please verify again.");
            }
        }).catch((err)=> {
            setIsLoading(false);
            setErrorMessage("Face doesn't match, please verify again!");
            console.log("ERR: ", err)
        });

        // Add your response handling code here
    } catch (error) {
        console.error('API Call Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take a picture" onPress={pickImage} />
      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <>
              <TouchableOpacity style={styles.loginButton} onPress={sendImage} disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={styles.loginButtonText}>Verify</Text>
                  )}
              </TouchableOpacity>
              {errorMessage ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
              ) : null}
            </>
          )}
        </>
      )}
      <Button title="Go to Register" onPress={() => navigation.navigate('RegisterScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: 'maroon',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal:60
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  errorContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
