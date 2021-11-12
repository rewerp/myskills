import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Platform,
  ScrollView, FlatList, GestureResponderEvent,
} from 'react-native';

import { Button } from './components/Button';
import { SkillCard } from './components/SkillCard';


interface SkillData {
  id: string;
  name: string;
  date?: Date; // "?" para tornar o atributo como opcional
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    }

    console.log("New Skill", data);

    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Good morning');
    }
    else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon');
    }
    else {
      setGreeting('Good night');
    }

  }, []);

  return (
    <View style={styles.container} >

      <Text style={styles.title} >
        Welcome, Rewer!
      </Text>

      <Text style={styles.greeting} >
        {greeting}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#505050"
        onChangeText={setNewSkill}
      />

      <Button 
        title="Add"
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginTop: 20, marginBottom: 10 }]} >
        My Skills
      </Text>

      {/* <ScrollView showsVerticalScrollIndicator="false" >
        {
          mySkills.map(skill => (
            <SkillCard 
              key={skill} 
              skill={skill} 
            />
          ))
        }
      </ScrollView> */}

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard 
            skill={item.name} 
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#1f1e25',
    color: '#FFFFFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },

  greeting: {
    color: '#FFFFFF',
  }


})