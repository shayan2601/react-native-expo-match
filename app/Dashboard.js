import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, Modal, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider'; // Slider component
import { FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';

export default function DashboardScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [ageRange, setAgeRange] = useState([18, 29]);
    const [heightRange, setHeightRange] = useState([4, 5.5]);
    const navigation = useNavigation();
    const { width: viewportWidth } = Dimensions.get('window');

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

    // const boy = Asset.fromModule(require('../assets/boy.png')).uri;
    const girl = Asset.fromModule(require('../assets/girl.png')).uri;
    const dashboardBg = Asset.fromModule(require('../assets/dash-bg.png')).uri;
    const mubeen = Asset.fromModule(require('../assets/mubeen.jpeg')).uri;
    const aleezy = Asset.fromModule(require('../assets/aleezy.jpeg')).uri;

    return (
        <View style={styles.container}>
            <Image source={{uri: dashboardBg}} style={styles.dashboardBg} />
            <View style={styles.overlay} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
            <View style={styles.greeting}>
                {/* <Image source={{uri: dashboardBg}} style={styles.greetingImage} /> */}
                <Text style={styles.greetingText}>Hello, Salman!</Text>
            </View>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="black" />
                <TextInput 
                    placeholderTextColor="#000" 
                    style={styles.searchInput} 
                    placeholder="Search for partner" 
                />
                <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                    {/* <FontAwesome name="filter" size={24} color="black" /> */}
                </TouchableOpacity>
            </View>
            <View style={styles.nearYouHeader}>
                <Text style={styles.nearYou}>Near You</Text>
                <Text onPress={() => navigation.navigate('Matches')} style={styles.viewAll}>View all</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.card}>
                    <Image style={styles.profileImage} source={{ uri: aleezy }} />
                    <View style={styles.textOverlay}>
                        <Text style={styles.name}>Aleezy Shah</Text>
                        <Text style={styles.location}>Pakistan, Lahore</Text>
                        <Text style={styles.occupation}>Actress</Text>
                    </View>
                </View>
                {/* Add more cards here if needed */}
            </ScrollView>
            <View style={styles.footer}>
                <Ionicons name="home" size={30} color="maroon" />
                <Ionicons name="heart" size={30} color="maroon" />
                <Ionicons onPress={() => navigation.navigate('Chat')} name="chatbubbles-outline" size={30} color="black" />
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
        backgroundColor: 'white',
    },
    dashboardBg: {
        position: 'absolute',
        width: '100%',
        height: '40%',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '40%',
        // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity as needed
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: 'transparent',
    },
    greeting: {
        alignItems: 'center',
        marginVertical: 20,
        marginTop: 216
    },
    greetingImage: {
        width: 400,
        height: 330,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 30,
        padding: 10,
        backgroundColor: '#F2F2F2',
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchInput: {
        marginLeft: 10,
        fontSize: 16,
        flex: 1,
    },
    nearYouHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    nearYou: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    viewAll: {
        fontSize: 14,
        color: '#9B2242',
    },
    scrollView: {
        marginBottom: 20,
        paddingHorizontal: 5,
    },
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 20,
        position: 'relative', // Added for positioning text overlay
    },
    profileImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        resizeMode: 'cover', // Ensures the image covers the entire area
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity to your preference
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    location: {
        fontSize: 14,
        color: 'white',
    },
    occupation: {
        fontSize: 14,
        color: 'white',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalOption: {
        marginVertical: 10,
    },
    modalText: {
        fontSize: 18,
        color: 'black',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterModalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    discardButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    discardButtonText: {
        color: 'black',
        fontSize: 16,
    },
    applyButton: {
        backgroundColor: '#9B2242',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
