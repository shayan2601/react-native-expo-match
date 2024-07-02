import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { base_url } from '../constants/baseUrl';

const ProfileScreen = ({ navigation }) => {
    const [profileData, setProfileData] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const fetchData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const userToken = await AsyncStorage.getItem('userToken');

            const response = await axios.get(`${base_url}/api/profile/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                setProfileData(res.data?.data[0]);
            }).catch(async (err) => {
                if (err?.response?.data?.message == "Invalid/Expired token.") {
                    await AsyncStorage.clear();
                    navigation.navigate('LoginScreen');
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

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    if (!profileData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#d9534f" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                    {!imageLoaded && (
                        <ActivityIndicator style={styles.imageLoader} size="large" color="#d9534f" />
                    )}
                    <Image
                        style={styles.profileImage}
                        source={{ uri: `${base_url}/uploads/${profileData?.image}` }}
                        onLoad={() => setImageLoaded(true)}
                    />
                </View>
                <Text style={styles.name}>{profileData?.firstName}</Text>
                <Text style={styles.age}>{Math.floor(profileData?.age)} Years</Text>
                <Text style={styles.title}>{profileData?.title}</Text>
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
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1c1f2e',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileImageContainer: {
        position: 'relative',
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
    },
    imageLoader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -12 }, { translateY: -12 }],
    },
    profileImage: {
        width: '100%',
        height: '100%',
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
    profileSection: {
        padding: 20,
        backgroundColor: '#fff',
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    profileHeading: {
        fontSize: 18,
        color: '#d9534f',
        fontWeight: 'bold',
    },
    profileText: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
    detailsSection: {
        padding: 20,
        backgroundColor: '#fff',
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    detailItem: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
    },
    detailHeading: {
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
