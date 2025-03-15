import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CollectionScreen = () => {
  return (
    
    <View style={styles.container}>
      
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="black" style={styles.icon} />
        <TextInput
          placeholder="BUSCAR PALABRA"
          placeholderTextColor="white"
          style={styles.searchInput}
        />
      </View>

      
      <TouchableOpacity style={styles.categoryButton}>
        <Text style={styles.categoryText}>ALIMENTOS</Text>
        <Ionicons name="chevron-down" size={20} color="white" />
      </TouchableOpacity>

     
      <View style={styles.contentArea}></View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#491778',
    padding: 20,
    
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#572F87',
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
  },
  icon: {
    marginLeft: 5,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    backgroundColor: '#26D5B4',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 20,
  },
  categoryText: {
    color: 'white',
    fontSize: 16,
  },
  contentArea: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#002D5B',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  navButton: {
    padding: 10,
  },
});

export default CollectionScreen;
