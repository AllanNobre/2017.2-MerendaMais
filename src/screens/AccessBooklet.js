import React from 'react';
import { View, Linking } from 'react-native';
import Header from '../components/Header';
import styles from '../Styles';
import Button from '../components/Button';

const AccessBooklet = () => ({
  render() {
    return (
      <View style={styles.basicScreen}>
        <Header />
        <Button
          text="Capítulo Um"
          key="chapterOneButton"
          enabled
          onPress={() => { Linking.openURL('https://drive.google.com/open?id=0B17H-b_myW1ScC1LLTBxLU5wUVU'); }}
        />
      </View>
    );
  },
});

export default AccessBooklet;
