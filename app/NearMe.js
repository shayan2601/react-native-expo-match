import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider'; // Slider component
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { base_url } from '../constants/baseUrl';

const ProfileCard = ({ profile, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Image source={{ uri: `${base_url}/uploads/${profile?.image}` }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.name}>{profile.firstName}</Text>
                    <Text style={styles.nameLight}>{profile.lastName}</Text>
                    <Text style={styles.details}>{Math.floor(profile.age)}, {profile.heightFeet}'{profile.heightInches}, {profile.language}</Text>
                    <Text style={styles.details}>{profile.gender}</Text>
                    <Text style={styles.details}>{profile.address} {profile.state}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const App = () => {
    const [search, setSearch] = useState('');
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [ageRange, setAgeRange] = useState(["18", "40"]);
    const [heightRange, setHeightRange] = useState([6, 6]);
    const [tongue, setTongue] = useState('urdu');
    const [cast, setCast] = useState('siddiqui');
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState(profiles);

    const [loading, setLoading] = useState(true);

    const fetchProfiles = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const userId = await AsyncStorage.getItem('userId');
            let payload = {
                startAge: ageRange[0],
                endAge: ageRange[1],
                religion: 'islam',
                country: 'pakistan',
                gender: 'male',
                sect: 'muslim',
                cast: cast === 'siddiqui' ? "siddiqui" : cast,
                height: `${heightRange[0]}'${heightRange[1]}"`,
                tongue: tongue === 'urdu' ? "urdu" : tongue
            }
            await axios.post(`${base_url}/api/search/profile`, payload, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }).then(async(response)=> {
                const friendsData = response?.data?.data?.profiles?.map(friend => ({
                    id: friend?._id,
                    firstName: friend?.firstName,
                    lastName: friend?.lastName,
                    age: friend?.age,
                    about: friend?.about,
                    heightFeet: friend?.height?.feet,
                    heightInches: friend?.height?.inches,
                    language: friend?.tongue,
                    address: friend?.address,
                    status: friend?.status,
                    city: friend?.city,
                    state: friend?.state,
                    image: friend?.image, 
                }));
                setProfiles(friendsData);
                setFilteredProfiles(friendsData);
                await AsyncStorage.setItem("allUsers", JSON.stringify(friendsData));
            }).catch(async(err)=> {
                if(err?.response?.data?.message == "Invalid/Expired token."){
                    await AsyncStorage.clear()
                    navigation.navigate('LoginScreen')
                }
                console.log("ERR: ", err)
            });
        } catch (error) {
            console.error('Error fetching friends data:', error);
        } finally {
            setLoading(false);
        }
    };
    
    

    useEffect(() => {
        
        fetchProfiles();

       
    }, []);

    

    const navigation = useNavigation();

    const handleProfilePress = async (userId) => {
        await AsyncStorage.setItem('selectedUserId', userId);
        navigation.navigate('DetailScreen');
    };


    return (
        <View style={styles.container}>
            
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

                        <Text style={styles.label}>Tongue</Text>
                        <View style={styles.optionGroup}>
                            {['urdu', 'punjabi', 'pasthon', 'sindhi'].map((item) => (
                                <TouchableOpacity 
                                    key={item} 
                                    style={[styles.optionButton, tongue === item && styles.selectedOptionButton]} 
                                    onPress={() => setTongue(item)}
                                >
                                    <Text style={styles.optionButtonText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.label}>Cast</Text>
                        <View style={styles.optionGroup}>
                            {['siddiqui', 'butt', 'arain', 'mughal'].map((item) => (
                                <TouchableOpacity 
                                    key={item} 
                                    style={[styles.optionButton, cast === item && styles.selectedOptionButton]} 
                                    onPress={() => setCast(item)}
                                >
                                    <Text style={styles.optionButtonText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.discardButton} onPress={() => setFilterModalVisible(false)}>
                                <Text style={styles.discardButtonText}>Discard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.applyButton} onPress={() => {
                                fetchProfiles()
                                setFilterModalVisible(false)
                                }}>
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
    optionGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    optionButton: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        margin: 5,
    },
    selectedOptionButton: {
        backgroundColor: '#9B2242',
    },
    optionButtonText: {
        color: 'white',
    },
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
    nameLight: {
        fontSize: 14,
        color: 'gray'
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
