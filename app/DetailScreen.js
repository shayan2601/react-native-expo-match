import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

const DetailScreen = ({ navigation }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                const selectedUserId = await AsyncStorage.getItem('selectedUserId');
                await axios.get(`http://13.60.56.191:3001/api/profile/${selectedUserId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }).then((res)=> {
                    console.log("RES: ", res?.data?.data);
                    setProfile(response?.data?.data);
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" type="material" color="#000" />
        </TouchableOpacity>
        {loading ? (
            <ActivityIndicator size="large" color="#fff" />
        ) : (
            profile && (
            <View style={styles.profileContainer}>
                <Image source={{ uri: profile.image }} style={styles.profileImage} />
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileDetails}>{profile.age} Years</Text>
                <Text style={styles.profileDetails}>{profile.profession}</Text>
                <Text style={styles.profileDescription}>{profile.description}</Text>
                <Text style={styles.profileDetails}>Cast: {profile.cast}</Text>
                <Text style={styles.profileDetails}>Height: {profile.height}</Text>
                <Text style={styles.profileDetails}>Mother Tongue: {profile.motherTongue}</Text>
                <Text style={styles.profileDetails}>Nationality: {profile.nationality}</Text>
                <Text style={styles.profileDetails}>Home Town: {profile.homeTown}</Text>
                <Text style={styles.profileDetails}>Religion: {profile.religion}</Text>
                <Text style={styles.profileDetails}>Education: {profile.education}</Text>
            </View>
            )
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        padding: 20,
    },
    iconButton: {
        padding: 10,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    profileDetails: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 5,
    },
    profileDescription: {
        fontSize: 14,
        color: '#fff',
        marginVertical: 10,
    },
});

export default DetailScreen;
