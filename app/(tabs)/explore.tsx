import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatbotScreen() {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>MR. BOT</Text>
      </View>

     
      <View style={styles.content}>
        <Image 
          source={require('@/assets/images/robot.png')} 
          style={styles.robotImage}
        />
      </View>

      
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#FFFFFF"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="play" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#491778',
  },
  header: {
    backgroundColor: '#340856',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  robotImage: {
    width: 150,
    height: 150,
  },
  inputBar: {
    flexDirection: 'row',
    backgroundColor: '#572F87',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#673282',
    borderRadius: 25,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#0056A6',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
