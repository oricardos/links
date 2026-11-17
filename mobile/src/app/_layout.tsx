
import { Stack } from 'expo-router';
import { colors } from '../styles/colors';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function RootNavigator() {
    const { isAuthenticated, isLoading } = useAuth();

    const backgroundColor = colors.gray[950];

    // Aguarda a recuperação do token
    if (isLoading) {
        return null;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor,
                },
            }}
        >
            {/* Rotas públicas */}
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="(public)" />
            </Stack.Protected>

            {/* Rotas privadas */}
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(private)" />
            </Stack.Protected>
        </Stack>
    );
}

export default function Layout() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
