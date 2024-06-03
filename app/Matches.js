import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider'; // Slider component
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileCard = ({ profile }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: profile.image }} style={styles.image} />
            <View style={styles.info}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.details}>{profile.age}, {profile.height} '{profile.language},</Text>
            <Text style={styles.details}>{profile.status},</Text>
            <Text style={styles.details}>{profile.city}, {profile.state}</Text>
            </View>
        </View>
    );
};

const App = () => {
    const [search, setSearch] = useState('');
    const [filteredProfiles, setFilteredProfiles] = useState(profiles);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [ageRange, setAgeRange] = useState([18, 29]);
    const [heightRange, setHeightRange] = useState([4, 5.5]);
    const [profiles, setProfiles] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                const userId = await AsyncStorage.getItem('userId');
                await axios.get(`http://13.60.56.191:3001/api/friends/all/${userId}?page=1&pageSize=1`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
                }).then((response)=> {
                    console.log("RES: ", response?.data?.data?.data)
                    const friendsData = response?.data?.data?.data?.map(friend => ({
                        id: friend?._id,
                        name: friend?.name,
                        lastName: friend?.lastName,
                        age: friend?.age,
                        height: friend?.height,
                        language: friend?.language,
                        status: friend?.status,
                        city: friend?.city,
                        state: friend?.state,
                        image: friend?.image, // Ensure the image URL is correctly provided in the API response
                    }));
                    setProfiles(friendsData);
                    setFilteredProfiles(friendsData);
                }).catch((err)=> {
                    console.log("ERR: ", err)
                });
                
                
            } catch (error) {
                console.error('Error fetching friends data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProfiles();
    }, []);

    const handleSearch = (text) => {
        setSearch(text);
        if (text) {
        const newProfiles = profiles.filter(profile => {
            const profileData = `${profile.name.toUpperCase()} ${profile.lastName.toUpperCase()}`;
            const textData = text.toUpperCase();
            return profileData.indexOf(textData) > -1;
        });
        setFilteredProfiles(newProfiles);
        } else {
        setFilteredProfiles(profiles);
        }
    };

    const navigation = useNavigation();

    const handleProfilePress = async (userId) => {
        await AsyncStorage.setItem('selectedUserId', userId);
        navigation.navigate('DetailScreen');
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="arrow-back" type="material" color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Yours Matches</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="search" type="material" color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="white" />
                <TextInput 
                    placeholderTextColor="#000" 
                    style={styles.searchInput} 
                    placeholder="Search for partner" 
                />
                <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                    <FontAwesome name="filter" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <FlatList
                    data={filteredProfiles}
                    renderItem={({ item }) => <ProfileCard profile={item} onPress={() => handleProfilePress(item.id)} />}
                    keyExtractor={item => item.id}
                />
            )}
            
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        padding: 20,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterModalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    iconButton: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        color: '#000',
    },
    filterButton: {
        marginLeft: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    filterText: {
        color: '#000',
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 100,
        borderRadius: 10,
    },
    info: {
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: '#666',
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

export default App;
