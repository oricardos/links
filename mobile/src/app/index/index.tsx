import { Categories } from '@/components/categories'
import { Link } from '@/components/link'
import { Option } from '@/components/option'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import { Alert, FlatList, Image, Linking, Modal, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import styles from './styles'
import { useCallback, useState, useEffect } from 'react'
import { categories } from '@/utils/categories'
import { request } from '@/services/links'
import { getCategory } from '@/utils/getCategory'
import { set } from 'react-hook-form'

export interface Link {
    id: number;
    name: string;
    url: string;
    category: string;
}

export default function Index() {
    const [category, setCategory] = useState<string>(categories[0].name);
    const [links, setLinks] = useState<Link[]>([]);
    const [allLinks, setAllLinks] = useState<Link[]>([]);
    const [link, setLink] = useState<Link | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 10

    async function loadPage(currentPage = 1) {
        if (loading) return;

        setLoading(true);

        const response = await request.listPaged(currentPage, PAGE_SIZE);

        setLinks(response.data);
        setPage(response.page)
        setTotalPages(response.totalPages)

        setLoading(false)
    }

    async function getAllLinks() {
        setLoading(true);
        try {
            const response = await request.listLinks();
            setLinks(response)
            setAllLinks(response)
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    function handleDetails(selected: Link) {
        setShowModal(true)
        setLink(selected)
    }

    async function removeLink() {
        try {
            await request.removeLink(link?.id!)
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

    function filterCategories(category: string) {
        if (category === 'Todas') {
            getAllLinks();
        }
        const filtered = allLinks.filter(link => link.category === category);
        setLinks(filtered);
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
                Alert.alert('Erro', 'Este link não existe mais.')
            }

            router.navigate({
                pathname: '/edit',
                params: { link: JSON.stringify(link) }
            })
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro')
        }
    }

    // useFocusEffect(useCallback(() => {
    //     getAllLinks();
    // }, [category]));

    useEffect(() => {
        loadPage(1);
    }, []);

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

            <Categories onChange={(category) => {
                filterCategories(category);
                setCategory(category);
            }} selected={category} />

            {loading ?
                <View
                    style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.green[300]} />
                </View> :

                <>

                    <FlatList
                        style={styles.links}
                        contentContainerStyle={styles.linksContent}
                        showsVerticalScrollIndicator={false}
                        data={links}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <Link
                                name={item.name}
                                url={item.url}
                                category={item.category}
                                onDetails={() => handleDetails(item)}
                            />
                        )}
                        refreshing={loading}
                        onRefresh={() => loadPage(1)}
                        ListEmptyComponent={
                            <View style={styles.listEmpty}>
                                <Text style={styles.listEmptyText}>Nenhum Link Encontrado</Text>
                                <TouchableOpacity style={styles.addButton} onPress={() => router.navigate("/add")}>
                                    <MaterialIcons
                                        name='add'
                                        size={32}
                                        color={colors.gray[950]}
                                    />
                                    <Text style={styles.addButtonText}>Adicionar link</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        onEndReachedThreshold={0.3}
                        ListFooterComponent={
                            loading ? <ActivityIndicator size="small" /> : null
                        }
                    />
                    <View style={styles.pagination}>
                        <TouchableOpacity
                            disabled={page === 1}
                            style={[
                                styles.pageButton,
                                page === 1 && styles.disabled
                            ]}
                            onPress={() => loadPage(page - 1)}
                        >
                            <Text>Anterior</Text>
                        </TouchableOpacity>

                        <Text style={styles.pageInfo}>
                            {page} / {totalPages}
                        </Text>

                        <TouchableOpacity
                            disabled={page === totalPages}
                            style={[
                                styles.pageButton,
                                page === totalPages && styles.disabled
                            ]}
                            onPress={() => loadPage(page + 1)}
                        >
                            <Text>Próxima</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }

            <Modal transparent visible={showModal} animationType='slide'>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <View style={styles.headerCategory}>
                                <MaterialIcons name={getCategory(category)?.icon} size={20} color={colors.green[300]} />
                                <Text style={styles.modalCategory}>{link?.category}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setShowModal(false)} style={{ width: 'auto' }}>
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
