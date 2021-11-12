import React from 'react';
import {
  Platform, Text, TouchableOpacity, TouchableOpacityProps, 
  StyleSheet, 
} from 'react-native';


interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest } : ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.5}
      {...rest}
    >
      <Text style={styles.buttonText} >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: '#A370F7',
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 7,
    alignItems: 'center',
    marginVertical: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  }

})