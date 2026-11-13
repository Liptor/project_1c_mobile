import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createItem } from "../api/api";

export default function ItemScreen() {
    const [name, setName] = useState('')
    const [article, setArticle] = useState('')
    const navigation = useNavigation()

    const onNewItemCreateCallback = useCallback(() => {
        createItem({ name, article })
    }, [])

    return <View style={styles.container}>
        <View style={styles.formTable}>
            <TextInput style={styles.inputStyle}
                placeholder="Введите наименование номенклатуры"
                onChangeText={setName}
            />
            <TextInput style={styles.inputStyle}
                placeholder="Введите артикул номенклатуры"
                onChangeText={setArticle}
            />
        </View>

        <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonStyle} onPress={() => {
                onNewItemCreateCallback()
                navigation.goBack()
            }}>
                <Text style={styles.textButtonStyle}>Создать номенклатуру</Text>
            </Pressable>
        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputStyle: {
        borderWidth: 2,
    },
    formTable: {
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
    text: {
        textAlign: 'left',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
