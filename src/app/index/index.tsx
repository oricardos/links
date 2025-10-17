import { Categories } from '@/components/categories'
import { Link } from '@/components/link'
import { Option } from '@/components/option'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import { Alert, FlatList, Image, Linking, Modal, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { useCallback, useState } from 'react'
import { categories } from '@/utils/categories'
import { LinkStorage, linkStorage } from '@/storage/link-storage'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

export default function Index() {
    const [category, setCategory] = useState<string>(categories[0].name);
    const [links, setLinks] = useState<LinkStorage[]>([]);
    const [link, setLink] = useState<LinkStorage | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false)

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
        try {
            await linkStorage.remove(link!.id);
            getLinks();
            setShowModal(false);

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível remover o link')
        }
    }

    function handleRemove() {
        console.log('remover')
        Alert.alert('Excluir link', 'Tem certeza que deseja excluir este link?', [
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

    useFocusEffect(useCallback(() => {
        getLinks();
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
            />

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
                            <Option name='Abrir' icon='language' onPress={handleOpenLink} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
