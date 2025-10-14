import { Category } from "@/components/category";
import { categories } from "@/utils/categories";
import { FlatList } from "react-native";
import { styles } from "./style";

export function Categories() {
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.content}
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Category name={item.name} icon={item.icon} isSelected={false} />}
        />
    )
}