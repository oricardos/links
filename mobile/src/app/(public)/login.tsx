import {
    View,
    Text,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
} from 'react-native';

import { colors } from '../../styles/colors';

export default function Login() {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: 'https://raw.githubusercontent.com/rocketseat-education/react-native-intro-course-links/refs/heads/main/src/assets/logo.png',
                        }}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.header}>
                    <Text style={styles.title}>
                        Bem-vindo de volta!
                    </Text>

                    <Text style={styles.subtitle}>
                        Entre na sua conta para acessar seus links.
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>E-mail</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu e-mail"
                            placeholderTextColor={colors.gray[500]}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Senha</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua senha"
                            placeholderTextColor={colors.gray[500]}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>
                            Entrar
                        </Text>
                    </View>
                </View>

                <Text style={styles.footer}>
                    Organize seus links em um só lugar.
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[950],
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 56,
    },
    logo: {
        width: 48,
        height: 42,
    },
    header: {
        marginBottom: 36,
        gap: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: colors.gray[100],
    },
    subtitle: {
        fontSize: 15,
        color: colors.gray[400],
        lineHeight: 22,
    },
    form: {
        gap: 24,
    },
    inputGroup: {
        gap: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.gray[200],
    },
    input: {
        height: 52,
        backgroundColor: colors.gray[900],
        borderWidth: 1,
        borderColor: colors.gray[600],
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 15,
        color: colors.gray[100],
    },
    loginButton: {
        height: 52,
        backgroundColor: colors.green[300],
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray[950],
    },
    footer: {
        marginTop: 56,
        textAlign: 'center',
        fontSize: 13,
        color: colors.gray[500],
    },
});