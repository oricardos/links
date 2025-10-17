import { Button } from "@/components/button";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import { linkStorage } from "@/storage/link-storage";

export default function Add() {
    const [category, setCategory] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    async function handleAdd() {
        try {
            if (!category) {
                return Alert.alert('Categoria', 'Selecione uma categoria')
            }

            if (!name.trim()) {
                return Alert.alert('Nome', 'Preencha o nome')
            }

            if (!url.trim()) {
                return Alert.alert('URL', 'Preencha a URL')
            }

            await linkStorage.save({
                id: new Date().getTime().toString(),
                name,
                url,
                category
            })

            Alert.alert('Sucesso', 'Link adicionado com sucesso!', [
                { text: 'Ok', onPress: () => router.back() }
            ])
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível adicionar o link')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons
                        name="arrow-back"
                        size={32}
                        color={colors.gray[200]}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Novo</Text>
            </View>

            <Text style={styles.label}>Selecione uma categoria</Text>
            <Categories onChange={setCategory} selected={category} />

            <View style={styles.form}>
                <Input placeholder="Nome" onChangeText={setName} />
                <Input placeholder="URL" onChangeText={setUrl} autoCorrect={false} autoCapitalize="none" />
                <Button title="Adicionar" onPress={handleAdd} />
            </View>
        </View>
    )
}