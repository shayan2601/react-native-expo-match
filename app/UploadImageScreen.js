import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const UploadImageScreen = ({}) => {

    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userDataSecond');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    setData(parsedData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const [imageUri, setImageUri] = useState(null);
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const [fileExt, setFileExt] = useState("")
    const [file, setFile] = useState(null);

    const [ doc, setDoc ] = useState();
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
            console.log("RESPONSE:,:",response);
            let { name, size, uri } = response.assets[0];
            setImageUri(uri)
            let nameParts = name.split('.');
            let fileType = nameParts[nameParts.length - 1];
            var fileToUpload = {
                name: name,
                size: size,
                uri: uri,
                type: "application/" + fileType
            };
            console.log(fileToUpload, '...............file')
            setDoc(fileToUpload);
        });
    }

    //     if (Platform.OS !== 'web') {
    //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if (status !== 'granted') {
    //             alert('Sorry, we need camera roll permissions to make this work!');
    //             return;
    //         }
    //     }
    
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     }).then(async(result)=>{
    //         console.log("RESSSS:: ", result)

    //         if (!result.canceled && result.assets && result.assets.length > 0) {
    //             setImageUri(result.assets[0].uri);
    //             setImage(result.assets[0]);
    //             const fileType = result.assets[0].uri.split('.').pop();
    //             console.log("fileType: ", fileType)
    //             setFileExt(fileType)
    //         }
    
    //         const fileBase64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
    //             encoding: FileSystem.EncodingType.Base64,
    //         });
        
    //         const binaryData = `data:${result.assets[0].mimeType};base64,${fileBase64}`;
    
    //         const imageData = {
    //             fileName: result.assets[0].fileName || 'unknown.jpg',
    //             height: result.assets[0].height,
    //             mimeType: result.assets[0].mimeType,
    //             uri: binaryData,
    //             width: result.assets[0].width,
    //         };
        
    //         console.log('Image Data:', imageData);
    //         setImage(imageData);
    //     });
    
    
        
    // };
    const onNextPressed = async () => {

        console.log("data::: ", data)
        try {        
            console.log("file: ", file)
            const fileUri = doc.uri;
            const formData = new FormData();
            formData.append('image', doc);
            
            // Append user data fields directly
            formData.append('email', data?.email);
            formData.append('firstName', data?.firstName);
            formData.append('lastName', data?.lastName);
            formData.append('country', data?.country);
            formData.append('phoneNumber', data?.phoneNumber);
            formData.append('gender', data?.gender);
            formData.append('religion', data?.religion);
            formData.append('cast', data?.cast);
            formData.append('address', data?.address);
            formData.append('nickName', data?.nickName);
            formData.append('password', data?.password);
            formData.append('confirmPassword', data?.confirmPassword);
            formData.append('dob', data?.dob);
            formData.append('sect', data?.sect);
            formData.append('tongue', data?.tongue);
            formData.append('height', data?.height);
            formData.append('education', data?.education);
            formData.append('about', data?.bio);
            formData.append('isAgreedToTermsAndPolicy', data?.isAgreedToTermsAndPolicy);

        
            console.log('formData:', formData);

        
            let response = await axios.post('http://13.60.56.191:3001/api/user/register', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async(res) => {
                console.log('Response:', res?.data);
                await AsyncStorage.removeItem('registerUserData');
                await AsyncStorage.setItem('registerUserData', JSON.stringify(res?.data));

                navigation.navigate('LiveCamera')
                // return res; // Ensure to return the response to assign it to 'response'
            }).catch((err) => {
                console.log('Error:', err);
            });
            
        } catch (error) {
            console.error('Error uploading profile image:', error);
        }
    };
    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickDocument}>
            {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
            <View style={styles.imagePlaceholder}>
                <Text>Select an Image</Text>
            </View>
            )}
        </TouchableOpacity>
        <Button title="Next" onPress={onNextPressed} style={styles.button}>
            Next
        </Button>
        </View>
    );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: 'blue',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 100,
  },
  button: {
    marginTop: 20,
  },
};

export default UploadImageScreen;
