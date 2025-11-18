import { Button } from "@/components/button";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import api from "@/services/api";
import * as yup from 'yup';

const schema = yup.object().shape({
    url: yup
        .string()
        .test('is-url', 'Digite uma URL válida', (value) => {
            try {
                new URL(
                    value?.startsWith('http')
                        ? value
                        : `http://${value}`
                )
                return true
            } catch {
                return false
            }
        })
        .url('Digite uma URL válida')
        .required('A URL é obrigatória'),
})

export default function Add() {
    const [category, setCategory] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    async function handleAdd() {
        console.log('add')
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

            try {
                await schema.validate({ url })
            } catch (error: any) {
                return Alert.alert('URL inválida', error.message)
            }



            await api.post('/links', {
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
                <TouchableOpacity onPress={() => router.navigate('/')}>
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