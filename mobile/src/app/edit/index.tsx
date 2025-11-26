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

export default function Edit() {
    const { link } = useLocalSearchParams();
    const parsedLink = JSON.parse(link as string);
    const [category, setCategory] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    async function handleEdit() {
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

            await request.editLink(parsedLink.id, name, url, category)

            Alert.alert('Sucesso', 'Link editado com sucesso!', [
                { text: 'Ok', onPress: () => router.back() }
            ])
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível adicionar o link')
        }
    }

    useEffect(() => {
        if (parsedLink) {
            setName(parsedLink.name);
            setUrl(parsedLink.url);
            setCategory(parsedLink.category);
        }
    }, []);


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

                <Text style={styles.title}>Editar</Text>
            </View>

            <Text style={styles.label}>Selecione uma categoria</Text>
            <Categories onChange={setCategory} selected={parsedLink.category || category} />

            <View style={styles.form}>
                <Input value={name} placeholder="Nome" onChangeText={setName} />
                <Input value={url} placeholder="URL" onChangeText={setUrl} autoCorrect={false} autoCapitalize="none" />
                <Button title="Editar" onPress={handleEdit} />
            </View>
        </View>
    )
}