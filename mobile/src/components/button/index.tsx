import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styles from "./styles";

type Props = TouchableOpacityProps & {
    title: string
}

export function Button({ title, ...props }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...props}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}