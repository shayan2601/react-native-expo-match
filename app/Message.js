// src/MessagesScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => navigation.navigate('Chat', { name: item.name, profilePic: item.profilePic })}
    >
      <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
      <View style={styles.messageInfo}>
        <View style={styles.messageHeader}>
          <Text style={[styles.name, item.isPinned && styles.pinned]}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={[styles.message, item.isTyping && styles.typing]}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <FlatList
        data={messages}
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
