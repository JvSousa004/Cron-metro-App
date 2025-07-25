import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);

  const startTimestamp = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      startTimestamp.current = Date.now() - elapsedTime;

      intervalRef.current = setInterval(() => {
        setDisplayTime(Date.now() - startTimestamp.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pause = () => {
    setIsRunning(false);
    setElapsedTime(Date.now() - startTimestamp.current);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setDisplayTime(0);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return (
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0') + ':' +
      String(milliseconds).padStart(2, '0')
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Cronômetro Virtual</Text>
      <Text style={styles.time}>{formatTime(displayTime)}</Text>
      <View style={styles.buttons}>
        <Button title="Iniciar" onPress={start} />
        <Button title="Pausar" onPress={pause} />
        <Button title="Reiniciar" onPress={reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4682B4', // azul personalizado
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 32,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },

  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
});
