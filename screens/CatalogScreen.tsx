import { useCallback, useState } from "react";
import { Text, FlatList, StyleSheet, View, ActivityIndicator, Pressable } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getCatalog } from "../api/api";


export default function CatalogScreen() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const navigation = useNavigation()

    const onItemsCallback = useCallback(async () => {
        setLoading(true)
        try {
            const result = await getCatalog();
            setData(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }, [])

    useFocusEffect(
        useCallback(() => {
            onItemsCallback();
        }, [onItemsCallback])
    )

    return (
        <View style={styles.container}>
            {isLoading && data.length === 0 ? (
                <ActivityIndicator size="large" style={styles.loader} />
            ) : <FlatList
                data={data}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) =>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>{item.name}. {item.article}</Text>
                    </View>
                }
            />}
            <View style={styles.buttonContainer}>
                <Pressable style={styles.buttonStyle} onPress={onItemsCallback}>
                    <Text style={styles.textButtonStyle}>Обновить каталог</Text>
                </Pressable>
                <Pressable style={styles.buttonStyle} onPress={() => navigation.navigate('ItemScreen')}>
                    <Text style={styles.textButtonStyle}>Создать номенклатуру</Text>
                </Pressable>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        gap: 13,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    itemContainer: {
        borderWidth: 2,
        padding: 10,
        textAlign: 'center',
        alignItems: 'flex-start'
    },
    loader: {

        marginTop: 40,
    },
    title: {
        fontSize: 23,
        fontWeight: "bold"
    },
    text: {
        textAlign: 'left',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25
    },
    buttonStyle: {
        backgroundColor: '#2196F3',
        padding: 20,
        borderRadius: 8,
    },
    textButtonStyle: {
        fontFamily: '',
    }
});
