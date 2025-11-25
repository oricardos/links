import { colors } from "@/styles/colors";
import { TextInput, TextInputProps } from "react-native";
import styles from "./styles";


export function Input({ style, ...props }: TextInputProps) {
    return (
        <TextInput
            placeholderTextColor={colors.gray[400]}
            style={[styles.container, style]}
            {...props}
        />
    )
}