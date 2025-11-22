import { Categories } from '@/components/categories'
import { Link } from '@/components/link'
import { Option } from '@/components/option'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import { Alert, FlatList, Image, Linking, Modal, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { useCallback, useEffect, useState } from 'react'
import { categories } from '@/utils/categories'
import { LinkStorage, linkStorage } from '@/storage/link-storage'
import api from '@/services/api'

export interface Link {
    id: number;
    name: string;
    url: string;
    category: string;
}

export default function Index() {
    const [category, setCategory] = useState<string>(categories[0].name);
    const [links, setLinks] = useState<LinkStorage[] | Link[]>([]);
    const [link, setLink] = useState<LinkStorage | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    async function getAllLinks() {
        setLoading(true);
        try {
            const response = await api.get<Link[]>('/links');
            setLinks(response?.data?.data)
            console.log('response', response)
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function getLinks() {
        try {
            const response = await linkStorage.get();

            const filteredLinks = response.filter(link => link.category === category)

            setLinks(filteredLinks)
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível carregar os links')
        }
    }

    function handleDetails(selected: LinkStorage) {
        setShowModal(true)
        setLink(selected)
    }

    async function removeLink() {
        console.log(link?.id)
        try {
            await api.delete(`/links/${link?.id}`)
            getAllLinks();
            setShowModal(false);

        } catch (error) {
            Alert.alert('Erro', `Não foi possível remover o link. ${error}`)
        }
    }

    function handleRemove() {
        Alert.alert('Excluir link', `Tem certeza que deseja excluir o link ${link?.name}?`, [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: () => removeLink() }
        ])
    }

    async function handleOpenLink() {
        try {
            await Linking.openURL(link!.url)
            setShowModal(false)
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível abrir o link')
        }
    }

    function edit() {
        setShowModal(false)
        try {
            if (!link) {
                console.log('não existe link')
            }

            console.log('LINK: ', { link })

            router.navigate({
                pathname: '/edit',
                params: { link: JSON.stringify(link) }
            })
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro')
        }
    }

    useFocusEffect(useCallback(() => {
        getAllLinks();
    }, [category]))

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} src='https://raw.githubusercontent.com/rocketseat-education/react-native-intro-course-links/refs/heads/main/src/assets/logo.png' />

                <TouchableOpacity onPress={() => router.navigate("/add")}>
                    <MaterialIcons
                        name='add'
                        size={32}
                        color={colors.green[300]}
                    />
                </TouchableOpacity>
            </View>

            <Categories onChange={setCategory} selected={category} />

            {loading ? <Text>Carregando</Text> :

                <FlatList
                    style={styles.links}
                    contentContainerStyle={styles.linksContent}
                    showsVerticalScrollIndicator={false}
                    data={links}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Link
                            name={item.name}
                            url={item.url}
                            onDetails={() => handleDetails(item)}
                        />
                    )}
                    refreshing={loading}
                    onRefresh={getAllLinks}
                />
            }

            <Modal transparent visible={showModal} animationType='slide'>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>{link?.category}</Text>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <MaterialIcons name='close' size={20} color={colors.gray[400]} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalLinkName}>
                            {link?.name}
                        </Text>

                        <Text style={styles.modalUrl}>
                            {link?.url}
                        </Text>

                        <View style={styles.modalFooter}>
                            <Option name='Excluir' icon='delete' variant='secondary' onPress={handleRemove} />
                            <Option name='Editar' icon='edit' variant='secondary' onPress={edit} />
                            <Option name='Abrir' icon='language' onPress={handleOpenLink} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
