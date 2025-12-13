import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Dimensions,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

const MAX_HEIGHT = Dimensions.get("window").height * 0.65;

export function AccountSwitcherModal() {
    const {
        accounts,
        activeUser,
        switchAccount,
        removeAccount,
        logoutAll,
        isAccountModalOpen,
        closeAccountModal,
        setActiveUser,
        setLoginMode,
    } = useAuth();


    function handleAddAccount() {
        closeAccountModal();
        setLoginMode("add");
        setActiveUser(null);
    };

    const { cardColor, textColor } = useTheme();

    function handleSwitch(userId: number) {
        switchAccount(userId);
        closeAccountModal();
    }

    function handleRemove(userId: number) {
        Alert.alert(
            "Logout",
            "Deseja remover esta conta?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: () => removeAccount(userId),
                },
            ]
        );
    }

    function handleLogoutAll() {
        Alert.alert(
            "Sair",
            "Deseja sair de todas as contas?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: logoutAll,
                },
            ]
        );
    }

    if (!activeUser) return null;

    return (
        <Modal
            visible={isAccountModalOpen}
            transparent
            animationType="slide"
            onRequestClose={closeAccountModal}
        >
            <View style={styles.overlay}>
                <View
                    style={[
                        styles.modal,
                        { backgroundColor: cardColor, maxHeight: MAX_HEIGHT },
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: textColor }]}>
                            Conta ativa
                        </Text>

                        <TouchableOpacity onPress={handleAddAccount}>
                            <Text style={[styles.addText, { color: textColor }]}>Add</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.activeUser, { color: textColor }]}>
                        {activeUser.nickname}
                    </Text>

                    {/* LOGOUT GERAL */}
                    <TouchableOpacity
                        onPress={handleLogoutAll}
                        style={styles.logoutAll}
                    >
                        <Text style={styles.logoutText}>Sair de todas as contas</Text>
                    </TouchableOpacity>

                    <Text style={[styles.subtitle, { color: textColor }]}>
                        Outras contas
                    </Text>

                    <ScrollView>
                        {accounts
                            .filter(u => u.id !== activeUser.id)
                            .map(user => (
                                <View key={user.id} style={styles.accountRow}>
                                    <TouchableOpacity
                                        onPress={() => handleSwitch(user.id)}
                                        style={styles.accountButton}
                                    >
                                        <Text style={{ color: textColor }}>
                                            {user.nickname}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => handleRemove(user.id)}
                                    >
                                        <Text style={styles.remove}>Logout</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                    </ScrollView>

                    <TouchableOpacity onPress={closeAccountModal} style={styles.close}>
                        <Text style={{ color: textColor }}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-start",
    },

    modal: {
        marginTop: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    activeUser: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    subtitle: {
        marginTop: 20,
        marginBottom: 10,
        fontWeight: "bold",
    },
    logoutAll: {
        backgroundColor: "#c0392b",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    logoutText: {
        color: "#fff",
        fontWeight: "bold",
    },
    accountRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    accountButton: {
        flex: 1,
    },
    remove: {
        color: "#e74c3c",
        marginLeft: -50,
    },
    close: {
        alignItems: "center",
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    addText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 3,
        borderRadius: 12,
        borderColor: "#fff",
    },
});
