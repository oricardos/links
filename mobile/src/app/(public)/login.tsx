import React from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Button
} from 'react-native';
import * as Yup from 'yup';


import { colors } from '../../styles/colors';

export const useValidation = () => {
    return Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        senha: Yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória')
    })
}

export default function Login() {
    const yupSchema = useValidation();
    const [sucesso, setSucesso] = React.useState('');
    const [formData, setFormData] = React.useState({
        email: '',
        senha: '',
    });
    const [errors, setErrors] = React.useState({
        email: '',
        senha: '',
    });

    const handleLogin = async (event) => {
        console.log("entrei aqui")
        event.preventDefault();
        setErrors({
            email: '',
            senha: '',
        });


        try {
            await yupSchema.validate(formData, {
                abortEarly: false,
            })

            setSucesso('Cadastro enviado!')
            console.log("Sucesso: ", sucesso)
        } catch (error) {
            console.error(error);
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach(validationFailed => {
                    console.log('Erro de validação:', validationFailed.path, validationFailed.message);
                    setErrors(prevErrors => {
                        return {
                            ...prevErrors,
                            [validationFailed.path]: validationFailed.message
                        }
                    })
                })
            } else {
                console.error('Erro desconhecido:', error);
            }
        }

        console.log("Validando dados: ", formData)
    }

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
                        {errors.email ? <Text style={{ color: 'red' }}>{errors.email}</Text> : null}
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
                        {errors.senha ? <Text style={{ color: 'red' }}>{errors.senha}</Text> : null}
                    </View>

                    <Button
                        onPress={handleLogin}
                        title="Entrar"
                    />

                    {/* <Button style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>
                            Entrar
                        </Text>
                    </Button> */}
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