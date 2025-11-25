import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        height: 52,
        maxHeight: 52,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[600]
    },
    content: {
        gap: 16,
        paddingHorizontal: 24
    }

})