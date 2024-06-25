// src/ChatScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const ChatScreen = ({ route }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const navigation = useNavigation();

  const getChat = async () => {
    let selectedMessageUserId = await AsyncStorage.getItem('selectedMessageUserId');
    const userToken = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.get(
        `http://13.60.56.191:3001/api/chat/getMessages/${userId}/${selectedMessageUserId}`,
        {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const fetchedMessages = response.data.data.map((msg) => ({
        id: msg.id,
        sender: msg.from === userId ? 'me' : 'other',
        text: msg.message,
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));

      setChatMessages(fetchedMessages);
      console.log("RES: ", response.data);

    } catch (err) {
      console.log("ERR: ", err);
      if (err?.response?.data?.message === "Invalid/Expired token.") {
        await AsyncStorage.clear();
        navigation.navigate('LoginScreen');
      }
    }
  };

  useEffect(() => {
    getChat();
    const interval = setInterval(() => {
      getChat();
    }, 3000); // Fetch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    let selectedMessageUserId = await AsyncStorage.getItem('selectedMessageUserId')
    if (!message.trim()) return;
    const userToken = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.post(
        'http://13.60.56.191:3001/api/chat/sendMessage',
        { message: message, from: userId, to: selectedMessageUserId },
        {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        }
      ).then((res)=> {
        console.log("RES: ", res?.data)
        if (res.data.message === "Message sent successfully!") {
          setChatMessages(prevChatMessages => [
            ...prevChatMessages,
            {
              id: (prevChatMessages.length + 1).toString(),
              sender: 'me',
              text: message,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      }).catch(async(err)=> {
        console.log("ERR: ", err)
        if(err?.response?.data?.message == "Invalid/Expired token."){
          await AsyncStorage.clear()
          navigation.navigate('LoginScreen')
        }
      });

      
    } catch (error) {
      console.error('Error sending message:', error);
      if(error?.response?.data?.message == "Invalid/Expired token."){
        await AsyncStorage.clear()
        navigation.navigate('LoginScreen')
      }
    }

    setMessage('');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatMessages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor="#000"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  chatList: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
