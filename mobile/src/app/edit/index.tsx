import { Button } from "@/components/button";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import { request } from "@/services/links";
import { Controller, useForm } from "react-hook-form";

interface FormData {
    name: string;
    url: string;
}

export default function Edit() {
    const { link } = useLocalSearchParams();
    const parsedLink = JSON.parse(link as string);
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: parsedLink.name,
            url: parsedLink.url
        }
    })
    const [category, setCategory] = useState(parsedLink.category);

    async function handleEdit(data: FormData) {
        const { name, url } = data;
        try {
            if (!category) {
                return Alert.alert('Categoria', 'Selecione uma categoria')
            }

            await request.editLink(parsedLink.id, name, url, category)

            Alert.alert('Sucesso', 'Link editado com sucesso!', [
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

                <Text style={styles.title}>Editar</Text>
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
                            message: 'O Nome deve ter no máximo 120 caracteres'
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                placeholder="Nome"
                                value={value}
                                onChangeText={onChange}
                                style={errors?.name && styles.inputError}
                            />
                            {errors?.name && <Text style={styles.textError}>{errors?.name?.message}</Text>}
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
                            message: 'A URL deve ter no máximo 2000 caracteres'
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                value={value}
                                placeholder="URL"
                                onChangeText={onChange}
                                autoCorrect={false}
                                autoCapitalize="none"
                                style={errors?.url && styles.inputError}
                            />
                            {errors?.url && <Text style={styles.textError}>{errors?.url?.message}</Text>}
                        </>
                    )}
                />

                <Button title="Editar" onPress={() => handleSubmit(handleEdit)()} />
            </View>
        </View>
    )
}