import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../Components/Button';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const username = await AsyncStorage.getItem('@username');
        const password = await AsyncStorage.getItem('@password');
        const hasLogin = await AsyncStorage.getItem('@hasLogin');
        if (username && password && hasLogin === 'true') {
          navigation.navigate('Home');
        }else if (username && password && hasLogin === 'false'){
          navigation.navigate('Login');
        }
        else{
          navigation.navigate('SignUp');
        }
      } catch (error) {
        console.error('Error checking login information:', error);
      }
    };

    checkLogin();
  }, [navigation]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{ fontSize:20, color:'red'}}>Home Screen</Text>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Kayıt Ol"
        onPress={() => navigation.navigate('SignUp')}
      />
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <Button
        title="Giriş yap"
        onPress={() => navigation.navigate('Login')}
      />
      </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
