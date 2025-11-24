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
import { useForm, Controller } from "react-hook-form";
import * as yup from 'yup';

interface FormData {
    name: string;
    url: string;
}

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
});

export default function Add() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [category, setCategory] = useState('');

    async function handleAdd(data: FormData) {
        const { name, url } = data;
        try {
            if (!category) {
                return Alert.alert('Categoria', 'Selecione uma categoria');
            };

            try {
                await schema.validate({ url });
            } catch (error: any) {
                return Alert.alert('URL inválida', error.message);
            };

            await api.post('/links', {
                name,
                url,
                category
            });

            Alert.alert('Sucesso', 'Link adicionado com sucesso!', [
                { text: 'Ok', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível adicionar o link');
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
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: 'Este campo é obrigatório',
                        maxLength: {
                            value: 120,
                            message: 'A URL deve ter no máximo 20 caracteres'
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                placeholder="Nome"
                                value={value}
                                onChangeText={onChange}
                            />
                            {errors?.name?.type === 'required' && <Text style={styles.textError}>{errors?.name?.message}</Text>}
                        </>
                    )}

                />

                <Controller
                    control={control}
                    name="url"
                    rules={{
                        required: 'Este campo é obrigatório',
                        maxLength: {
                            value: 2000,
                            message: 'A URL deve ter no máximo 20 caracteres'
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                placeholder="URL"
                                value={value}
                                onChangeText={onChange}
                                autoCorrect={false}
                                autoCapitalize="none"
                            />
                            {errors?.url && <Text style={styles.textError}>{errors?.url?.message}</Text>}
                        </>

                    )}
                />




                <Button title="Adicionar" onPress={() => handleSubmit(handleAdd)()} />
            </View>
        </View>
    )
}