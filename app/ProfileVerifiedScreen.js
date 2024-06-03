import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const ProfileVerifiedScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <FontAwesome name="check-circle" size={80} color="#F28E8E" />
            </View>
            <Text style={styles.title}>Profile Verified</Text>
            <Text style={styles.message}>Your profile has been verified successfully.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#9B2242',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfileVerifiedScreen;
