import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { getNotes, saveNotes } from "../storage/notesStorage";
import { getCurrentUser } from "../storage/userStorage";

export default function CreateNoteScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      const newPath = FileSystem.documentDirectory + Date.now() + ".jpg";
      await FileSystem.copyAsync({
        from: result.assets[0].uri,
        to: newPath,
      });
      setImage(newPath);
    }
  };

  const captureImage = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      const newPath = FileSystem.documentDirectory + Date.now() + ".jpg";
      await FileSystem.copyAsync({
        from: result.assets[0].uri,
        to: newPath,
      });
      setImage(newPath);
    }
  };

  const saveNote = async () => {
    const user = await getCurrentUser();
    const notes = await getNotes(user);

    const newNote = {
      id: Date.now(),
      title,
      body,
      image,
      updatedAt: Date.now(),
    };

    await saveNotes(user, [newNote, ...notes]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Note</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={[styles.input, { height: 120 }]}
        multiline
      />

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Capture Image" onPress={captureImage} />

      <Button title="Save Note" onPress={saveNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});
