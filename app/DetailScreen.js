// src/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = () => {
    const [profileData, setProfileData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('selectedUserId');
                const userToken = await AsyncStorage.getItem('userToken');

                const response = await axios.get(`http://13.60.56.191:3001/api/profile/${userId}`, {
                    headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                    }
                }).then((res)=> {
                
                    setProfileData(res.data?.data[0]);
                }).catch(async(err)=> {
                    if(err?.response?.data?.message == "Invalid/Expired token."){
                        await AsyncStorage.clear()
                        navigation.navigate('LoginScreen')
                    }
                });
            } catch (error) {
                console.error("Error fetching profile data", error);
                // Set dummy data when request fails
                setProfileData({
                    name: "John Doe",
                    age: "25",
                    title: "Junior Game Designer",
                    description: "A passionate game designer with a love for creating engaging experiences.",
                    cast: "Unknown",
                    height: "5.8 Feet",
                    motherTongue: "English",
                    profession: "Game Designer",
                    nationality: "Unknown",
                    homeTown: "Unknown",
                    religion: "Unknown",
                    education: "Undergraduate"
                });
            }
        };

        fetchData();
    }, []);

    if (!profileData) {
        return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
        );
    }

    const requestAPI = async() => {
        try{
            const userId = await AsyncStorage.getItem('userId');
            const selectedUserId = await AsyncStorage.getItem('selectedUserId');
            const userToken = await AsyncStorage.getItem('userToken');

            let payload = {
                from: userId,
                to: selectedUserId
            }
            const response = await axios.post(`http://13.60.56.191:3001/api/friend-request/send`, payload, {
                    headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                    }
                }).then((res)=> {
                
                    console.log("REQUEST: ", res?.data)
                    Alert.alert("Request Sent Successfully")
                }).catch(async(err)=> {
                    if(err?.response?.data?.message == "Invalid/Expired token."){
                        await AsyncStorage.clear()
                        navigation.navigate('LoginScreen')
                    }
                });
        }catch(err){
            console.log("ERR: ", err)
        }
    }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Image 
            style={styles.profileImage} 
            source={{ uri: `http://13.60.56.191:3001/uploads/${profileData?.image}` }} 
            />
            <Text style={styles.name}>{profileData?.firstName}</Text>
            <Text style={styles.age}>{Math.floor(profileData?.age)} Years</Text>
            <Text style={styles.title}>{profileData?.title}</Text>
            <TouchableOpacity style={styles.requestButton}>
            <Text onPress={requestAPI} style={styles.requestButtonText}>Request +</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
            <Text style={styles.profileHeading}>Profile :</Text>
            <Text style={styles.profileText}>{profileData?.description}</Text>
        </View>
        <View style={styles.detailsSection}>
            <Text style={styles.detailItem}>
                <Text style={styles.detailHeading}>Cast :</Text> {profileData?.cast || 'Unknown'}
            </Text>
            <Text style={styles.detailItem}>
                <Text style={styles.detailHeading}>Height :</Text> 
                {profileData?.height?.feet || '0'}' {profileData?.height?.inches || '0'}
            </Text>
            <Text style={styles.detailItem}>
                <Text style={styles.detailHeading}>Mother Tongue :</Text> {profileData?.tongue || 'Unknown'}
            </Text>
            <Text style={styles.detailItem}>
                <Text style={styles.detailHeading}>Profession :</Text> {profileData?.profession || 'Computer Science'}
            </Text>
            <Text style={styles.detailItem}>
                <Text style={styles.detailHeading}>Nationality :</Text> {profileData?.nationality || 'Pakistan'}
            </Text>
            <Text style={styles.detailItem}>
                <Text style={styles.detailHeading}>Home Town :</Text> {profileData?.homeTown || 'Lahore'}
            </Text>
            <Text style={styles.detailItem}>
                <Text style={styles.detailHeading}>Religion :</Text> {profileData?.religion || 'Unknown'}
            </Text>
            <Text style={styles.detailItem}>
                <Text style={styles.detailHeading}>Education :</Text> {profileData?.education || 'Unknown'}
            </Text>
        </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141829',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1c1f2e',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    age: {
        fontSize: 18,
        color: '#fff',
        marginTop: 5,
    },
    title: {
        fontSize: 18,
        color: '#aaa',
        marginTop: 5,
    },
    requestButton: {
        backgroundColor: '#d9534f',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    requestButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    profileSection: {
        padding: 20,
    },
    profileHeading: {
        fontSize: 18,
        color: '#d9534f',
    },
    profileText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
    detailsSection: {
        padding: 20,
    },
    detailItem: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10,
    },
    detailHeading: {
        fontWeight: 'bold',
    },
});

export default DetailScreen;
