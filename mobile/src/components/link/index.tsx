import { colors } from "@/styles/colors"
import { MaterialIcons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { categories } from "@/utils/categories"

type Props = {
    name: string
    url: string
    category: string
    onDetails: () => void
}

export function Link({ name, url, category, onDetails }: Props) {
    const getCategory = categories.find(cat => cat.name === category)

    return (
        <TouchableOpacity style={styles.container} onPress={onDetails}>
            <View style={styles.details}>
                <View style={styles.head}>
                    <MaterialIcons name={getCategory?.icon} size={20} color={colors.green[300]} />
                    <Text style={styles.name} numberOfLines={1}>
                        {name}
                    </Text>
                </View>
                <Text style={styles.url} numberOfLines={1}>
                    {url}
                </Text>
            </View>
            <MaterialIcons name='more-horiz' size={20} color={colors.gray[400]} />
        </TouchableOpacity>
    )
}