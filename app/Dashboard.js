import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider'; // Slider component
import { FontAwesome } from '@expo/vector-icons';

export default function DashboardScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [ageRange, setAgeRange] = useState([18, 29]);
    const [heightRange, setHeightRange] = useState([4, 5.5]);
    const navigation = useNavigation();
    
    const handleLogout = async () => {
        await AsyncStorage.clear();
        setModalVisible(false);
        navigation.navigate('LoginScreen');
        Alert.alert('Logged out', 'You have been logged out successfully.');
    };

    const handleEditProfile = () => {
        setModalVisible(false);
        navigation.navigate('EditProfile');
    };
    const goToMatches = () => {
        setModalVisible(false);
        navigation.navigate('Matches');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Welcome</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
            <View style={styles.greeting}>
                <Text style={styles.greetingText}>Hello, Ayesha!</Text>
            </View>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="black" />
                <TextInput 
                    placeholderTextColor="#000" 
                    style={styles.searchInput} 
                    placeholder="Search for partner" 
                />
                <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                    <FontAwesome name="filter" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.nearYou}>Near You</Text>
            <ScrollView horizontal={true} style={styles.scrollView}>
                <View style={styles.card}>
                    <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/150' }} />
                    <Text style={styles.name}>Rana Mubeen</Text>
                    <Text style={styles.location}>Pakistan, Lahore</Text>
                    <Text style={styles.occupation}>Game Designer</Text>
                </View>
                {/* Add more cards here if needed */}
            </ScrollView>
            <View style={styles.footer}>
                <Ionicons name="home" size={30} color="maroon" />
                <Ionicons name="search" size={30} color="black" />
                <Ionicons onPress={() => navigation.navigate('Message')} name="chatbubbles-outline" size={30} color="black" />
                <Ionicons onPress={() => navigation.navigate('Profile')} name="person-outline" size={30} color="black" />
            </View>

            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalOption} onPress={handleLogout}>
                            <Text style={styles.modalText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={handleEditProfile}>
                            <Text style={styles.modalText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={goToMatches}>
                            <Text style={styles.modalText}>Your matches</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                animationType="slide"
                visible={filterModalVisible}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.filterModalView}>
                        <Text style={styles.filterModalTitle}>Filters</Text>

                        <Text style={styles.label}>Age range</Text>
                        <MultiSlider
                            values={ageRange}
                            sliderLength={280}
                            onValuesChange={setAgeRange}
                            min={18}
                            max={40}
                            step={1}
                        />

                        <Text style={styles.label}>Height</Text>
                        <MultiSlider
                            values={heightRange}
                            sliderLength={280}
                            onValuesChange={setHeightRange}
                            min={4}
                            max={7}
                            step={0.1}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.discardButton} onPress={() => setFilterModalVisible(false)}>
                                <Text style={styles.discardButtonText}>Discard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.applyButton} onPress={() => setFilterModalVisible(false)}>
                                <Text style={styles.applyButtonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // padding: 20,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    greeting: {
        alignItems: 'center',
        marginVertical: 20,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    searchInput: {
        marginLeft: 10,
        fontSize: 16,
        flex: 1,
    },
    nearYou: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    scrollView: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        width: 150,
    },
    profileImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    location: {
        fontSize: 14,
    },
    occupation: {
        fontSize: 14,
        color: 'gray',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalOption: {
        padding: 10,
        width: '100%',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterModalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    filterModalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    discardButton: {
        backgroundColor: 'white',
        borderColor: '#9B2242',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    discardButtonText: {
        color: '#9B2242',
        fontSize: 16,
    },
    applyButton: {
        backgroundColor: '#9B2242',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
