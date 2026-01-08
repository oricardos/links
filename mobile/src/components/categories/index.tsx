import { Category } from "@/components/category";
import { categories } from "@/utils/categories";
import { FlatList } from "react-native";
import { styles } from "./style";

type Props = {
    selected: string;
    onChange: (category: string) => void;
    addScreen?: boolean;
}

export function Categories({ selected, onChange, addScreen = false }: Props) {
    const filteredCategories = addScreen ? categories.filter(category => category.name !== 'Todas') : categories;

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.content}
            data={filteredCategories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Category
                    name={item.name}
                    icon={item.icon}
                    isSelected={item.name === selected}
                    onPress={() => onChange(item.name)}
                />)
            }
        />
    )
}