// src/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const [profileData, setProfileData] = useState(null);

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
                setProfileData(response.data?.data);
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

    return (
        <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Image 
            style={styles.profileImage} 
            source={{ uri: 'https://via.placeholder.com/150' }} 
            />
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.age}>{profileData.age} Years</Text>
            <Text style={styles.title}>{profileData.title}</Text>
            <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestButtonText}>Request +</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
            <Text style={styles.profileHeading}>Profile :</Text>
            <Text style={styles.profileText}>{profileData.description}</Text>
        </View>
        <View style={styles.detailsSection}>
            <Text style={styles.detailItem}><Text style={styles.detailHeading}>Cast :</Text> {profileData.cast}</Text>
            <Text style={styles.detailItem}><Text style={styles.detailHeading}>Height :</Text> {profileData.height}</Text>
            <Text style={styles.detailItem}><Text style={styles.detailHeading}>Mother Tongue :</Text> {profileData.motherTongue}</Text>
            <Text style={styles.detailItem}><Text style={styles.detailHeading}>Profession :</Text> {profileData.profession}</Text>
            <Text style={styles.detailItem}><Text style={styles.detailHeading}>Nationality :</Text> {profileData.nationality}</Text>
            <Text style={styles.detailItem}><Text style={styles.detailHeading}>Home Town :</Text> {profileData.homeTown}</Text>
            <Text style={styles.detailItem}><Text style={styles.detailHeading}>Religion :</Text> {profileData.religion}</Text>
            <Text style={styles.detailItem}><Text style={styles.detailHeading}>Education :</Text> {profileData.education}</Text>
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

export default ProfileScreen;
