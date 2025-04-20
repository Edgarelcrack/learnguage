import React, { useReducer } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';

const initialState = {
  currentIndex: 0,
  correctStreak: 0,
  completed: false,
  feedback: "",
  fadeAnim: new Animated.Value(1),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ANSWER':
      return {
        ...state,
        feedback: action.payload.feedback,
        correctStreak: action.payload.isCorrect ? state.correctStreak + 1 : 0,
        completed: state.correctStreak + 1 >= 5,
      };
    case 'NEXT':
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        feedback: "",
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const WordFillExercise = () => {
  const { params } = useRoute();
  const exercises = params?.data ?? [];

  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentIndex, correctStreak, completed, feedback, fadeAnim } = state;
  const current = exercises[currentIndex];

  const handleAnswer = (selected) => {
    const isCorrect = selected === current.correctWord;
    dispatch({
      type: 'ANSWER',
      payload: {
        feedback: isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto",
        isCorrect,
      },
    });

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        dispatch({ type: 'NEXT' });
      });
    });
  };

  if (completed) {
    return (
      <View style={styles.container}>
      <Text style={styles.completedText}>🎉 ¡Ejercicio completado!</Text>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => dispatch({ type: 'RESET' })}
      >
        <Text style={styles.resetButtonText}>🔁 Reiniciar</Text>
      </TouchableOpacity>
      </View>
    );
  }

  if (!current) {
    return (
      <View style={styles.container}>
        <Text style={styles.completedText}>😢 ¡cometiste algun error!</Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => dispatch({ type: 'RESET' })}
        >
          <Text style={styles.resetButtonText}>🔁 Reiniciar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Pregunta {currentIndex + 1} de {exercises.length}
      </Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.sentence}>
          {current.sentence.replace("___", "______")}
        </Text>

        {current.options.map((option, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleAnswer(option)}
            style={styles.optionButton}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#491778', 
    justifyContent: 'center',
  },
  progress: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#F5F5F5',
  },
  sentence: {
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  optionButton: {
    backgroundColor: '#E78935', 
    padding: 14,
    borderRadius: 14,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  feedback: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  completedText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#2A5EA5',
    padding: 14,
    borderRadius: 12,
    alignSelf: 'center',
  },
  resetButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
});

export default WordFillExercise;