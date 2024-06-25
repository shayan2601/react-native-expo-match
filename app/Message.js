// src/MessagesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const messages = [
    {
        id: '1',
        name: 'John Doe',
        message: 'How are you doing?',
        time: '16:45',
        isTyping: false,
        isPinned: true,
        profilePic: 'https://via.placeholder.com/50',
    },
    {
        id: '2',
        name: 'Travis Barker',
        message: '... is typing',
        time: '16:45',
        isTyping: true,
        isPinned: false,
        profilePic: 'https://via.placeholder.com/50',
    },
];

const MessagesScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([])
  
  

  useEffect(() => {

    const getUsers = async() => {
    
      let allUsers = await AsyncStorage.getItem('allUsers')
      let parsedUsers = JSON.parse(allUsers)
      console.log("parsedUsers::::: ", parsedUsers)
      setUsers(parsedUsers)
    }

    getUsers()
  }, []);

  const renderItem = ({ item }) => {
    console.log("itms: ", item)
    return(
      <TouchableOpacity
        style={styles.messageItem}
        onPress={async() => {
          let selectedMessageUserId = await AsyncStorage.setItem('selectedMessageUserId', item.id)
          navigation.navigate('Chat', { name: item.firstName, profilePic: item.image })
        }}
      >
        <Image source={{ uri: `http://13.60.56.191:3001/uploads/${item?.image}` }} style={styles.profilePic} />
        <View style={styles.messageInfo}>
          <View style={styles.messageHeader}>
            <Text style={[styles.name, item.isPinned && styles.pinned]}>{item.firstName}</Text>
            <Text style={styles.time}>16:45</Text>
          </View>
          <Text style={[styles.message, false && styles.typing]}>
            Hi?
          </Text>
        </View>
      </TouchableOpacity>
    )};
    console.log("users:::::: ", users)
  return (
    <View style={styles.container}>
      
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141829',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    fontSize: 20,
    color: '#000',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  messageList: {
    paddingVertical: 10,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageInfo: {
    flex: 1,
    marginLeft: 10,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pinned: {
    color: '#FFD700',
  },
  time: {
    fontSize: 14,
    color: '#aaa',
  },
  message: {
    fontSize: 16,
    color: '#000',
  },
  typing: {
    color: 'green',
  },
});

export default MessagesScreen;
