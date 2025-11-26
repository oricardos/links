import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        paddingTop: 62
    },
    title: {
        fontSize: 22,
        color: colors.green[900]
    },
    header: {
        paddingHorizontal: 24,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32
    },
    logo: {
        height: 32,
        width: 38
    },
    links: {
        // borderTopWidth: 1,
        // borderTopColor: colors.gray[600]
    },
    linksContent: {
        gap: 20,
        padding: 24,
        paddingBottom: 100
    },
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.gray[900],
        borderTopWidth: 1,
        borderTopColor: colors.green[300],
        paddingBottom: 42,
        padding: 24,

    },
    modalHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32
    },
    modalCategory: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: colors.gray[400]
    },
    modalLinkName: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.gray[200]
    },
    modalUrl: {
        fontSize: 14,
        color: colors.gray[400]
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: colors.gray[600],
        paddingVertical: 14
    },
    listEmpty: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listEmptyText: {
        textAlign: 'center',
        fontSize: 24,
        color: '#747474ff'
    },
    addButton: {
        backgroundColor: colors.green[300],
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 24,
        gap: 8
    },
    addButtonText: {
        fontSize: 18,
        color: colors.gray[950]
    }
})

export default styles