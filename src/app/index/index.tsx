import { Categories } from '@/components/categories'
import { Link } from '@/components/link'
import { Option } from '@/components/option'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { useState } from 'react'
import { categories } from '@/utils/categories'

export default function Index() {
    const [category, setCategory] = useState<string>(categories[0].name);
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
                data={['1', '2', '3', '4', '5']}
                keyExtractor={(item) => item}
                renderItem={() => (
                    <Link
                        name='Rocketseat'
                        url='https://rocketseat.com.br/'
                        onDetails={() => console.log(`clicou`)}
                    />
                )}
            />

            <Modal transparent visible={false}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>Curso</Text>
                            <TouchableOpacity>
                                <MaterialIcons name='close' size={20} color={colors.gray[400]} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalLinkName}>
                            RocketSeat
                        </Text>

                        <Text style={styles.modalUrl}>
                            https://www.rocketseat.com.br/
                        </Text>

                        <View style={styles.modalFooter}>
                            <Option name='Excluir' icon='delete' variant='secondary' />
                            <Option name='Abrir' icon='language' />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
