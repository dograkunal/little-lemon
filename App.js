import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import LittleLemonHeader from './src/components/LittleLemonHeader';
import MenuItems from './src/components/MenuItems';
import FeedbackForm from './src/screens/FeedBackFrom';

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <LittleLemonHeader />
        {/* <MenuItems /> */}
        <FeedbackForm />
      </View>
   
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  footerContainer: { backgroundColor: '#333333' },
});