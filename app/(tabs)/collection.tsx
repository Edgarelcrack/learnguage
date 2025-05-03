import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseconfig';

type Category = 'COLORES' | 'DULCES' | 'COMIDA' | 'PALABRAS ELEMENTALES';

const categoryMap: Record<Category, string[]> = {
  'COLORES': ['blue', 'green', 'red', 'white', 'orange'],
  'DULCES': ['chocolate', 'gum', 'lollipop', 'marzipan', 'gummies', 'Cheesecake', 'Candy cane', 'Marshmallows', 'Sprinkles', 'Pies'],
  'COMIDA': ['burger', 'pizza', 'hot dog', 'taco', 'fries', 'vegetables', 'smoothies', 'chicken', 'avocados', 'oatmeal'],
  'PALABRAS ELEMENTALES': ['pencil', 'baby', 'backpack', 'towel', 'ball', 'door', 'TV', 'bed', 'light', 'bike'],
};

type LearnedWords = {
  [key: string]: boolean;
};

const CollectionScreen = () => {
  const [learnedWords, setLearnedWords] = useState<LearnedWords>({});
  const [expandedCategory, setExpandedCategory] = useState<Category | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error('No user is currently logged in.');
      return;
    }

    const userId = currentUser.uid;
    const docRef = doc(db, 'users', userId);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setLearnedWords(docSnap.data().learnedWords || {});
      } else {
        console.log('No se encontró el usuario');
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleCategory = (category: Category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const renderLearnedWords = (category: Category) => {
    const words = categoryMap[category];
    const filtered = words.filter(
      (word) =>
        learnedWords[word] &&
        word.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <View style={styles.wordList}>
        {filtered.map((word, index) => (
          <Text key={index} style={styles.wordText}>• {word}</Text>
        ))}
        {filtered.length === 0 && (
          <Text style={styles.wordText}>No se encontraron palabras aprendidas con este filtro.</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="white" style={styles.icon} />
        <TextInput
          placeholder="BUSCAR PALABRA"
          placeholderTextColor="white"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {(Object.keys(categoryMap) as Category[]).map((category) => (
        <View key={category}>
          <TouchableOpacity style={styles.categoryButton} onPress={() => toggleCategory(category)}>
            <Text style={styles.categoryText}>{category}</Text>
            <Ionicons
              name={expandedCategory === category ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
          {expandedCategory === category && renderLearnedWords(category)}
        </View>
      ))}

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
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  categoryText: {
    color: 'white',
    fontSize: 16,
  },
  wordList: {
    backgroundColor: '#572F87',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  wordText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  contentArea: {
    flex: 1,
  },
});

export default CollectionScreen;
