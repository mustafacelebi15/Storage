import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../../android/app/src/lang/_i18n';

import Button from '../../Components/Button';

const Anasayfa = ({ navigation }) => {
  const [storedUsername, setStoredUsername] = useState('');
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const username = await AsyncStorage.getItem('@username');
        setStoredUsername(username);
      } catch (error) {
        console.error('Error checking login information:', error);
      }
    };

    checkLogin();
  }, []);
  const removeLoginInfo = async () => {
    try {
      await AsyncStorage.removeItem('@username');
      await AsyncStorage.removeItem('@password');
      await AsyncStorage.removeItem('@hasLogin');
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error removing login information:', error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:50, color:'black'}}>{I18n.t('welcome')}</Text>
      <Text style={{fontSize:50, color:'black'}}>{storedUsername}</Text>
      <Text style={{fontSize:50, color:'black'}}>{I18n.t('hello')}</Text>
      <Button title={"Çıkış Yap"} onPress={removeLoginInfo}/>
    </View>
  );
};

export default Anasayfa;
