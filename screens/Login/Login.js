import React, {useState} from 'react';
import { Text, SafeAreaView, View, TextInput, Alert, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./Login.style";
import Button from "../../Components/Button";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const checkLogin = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('@username');
      const storedPassword = await AsyncStorage.getItem('@password');

      if (username === storedUsername && password === storedPassword) {
        Alert.alert('Success', 'Login successful!');
        await AsyncStorage.setItem('@hasLogin', 'true');
        navigation.navigate('Home')
      } else {
        Alert.alert('Error', 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error checking login information:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login  Screen</Text>
      <View style={styles.contentContainer}>
      <TextInput style={styles.input} placeholder="Adınızı giriniz" value={username} onChangeText={(text) => setUsername(text)} />
      <TextInput style={styles.input} placeholder="Şifrenizi giriniz" value={password} onChangeText={(text) => setPassword(text)} />
      </View>
      <View style={styles.ButtonContainer}>
      <Button style={styles.button}
        title="Giriş Yap"
        onPress={checkLogin}
      />
      </View>
    </View>
  );
};

export default Login;