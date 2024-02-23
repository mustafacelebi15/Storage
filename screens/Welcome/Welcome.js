import React, {useEffect, useState} from 'react';
import { View, Text, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import NetInfo from '@react-native-community/netinfo';

import Button from '../../Components/Button';

const WelcomeScreen = ({ navigation }) => {

  const [isConnected, setIsConnected] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const checkInternetConnection = async () => {
        const netInfoState = await NetInfo.fetch();
        setIsConnected(netInfoState.isConnected);
      };

      await checkInternetConnection();

      setTimeout(() => {
        if (isConnected === true) {
          console.log(isConnected);
          SplashScreen.hide();
        } else if(isConnected === false){
          console.log('Bağlantı:', isConnected);
          showNoInternetAlert();
        }
      }, 2000);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    fetchData();

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const openSettings = () => {
    Linking.openSettings();
  };

  const showNoInternetAlert = () => {
    Alert.alert(
      'Bağlantı Hatası',
      'İnternet bağlantınızı kontrol etmek için ayarlara gidin',
      [
        {
          text: 'Tamam',
          onPress: openSettings,
        },
      ]
    );
  };
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
