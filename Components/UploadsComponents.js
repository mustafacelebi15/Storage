import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const UploadsComponent = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const formData = new FormData();
      formData.append('file', {
        uri: result.uri,
        type: result.type,
        name: result.name,
      });

      // Perform your file upload using fetch or any other HTTP library for React Native
      // Replace 'YOUR_API_URL' with the actual API endpoint
      fetch('http://mcelebi44-001-site1.btempurl.com/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle successful response
          setMessage('Yükleme Tamamlandı.');
          // Perform any additional actions with the response data
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    } catch (err) {
      // Handle document picking error
      console.error(err);
    }
  };

  return (
    <View>
      <Text>{progress}%</Text>
      <Text>{message}</Text>
      <Button title="Upload File" onPress={uploadFile} />
    </View>
  );
};

export default UploadsComponent;
