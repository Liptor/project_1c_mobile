import { useCallback, useState } from "react";
import { API_URL } from '@env';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, Switch } from "react-native";
import uuid from 'react-native-uuid';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function ItemScreen() {
    const [isOffline, setOffline] = useState(false)
    const [offlineQueue, setOfflineQueue] = useState<any[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [name, setName] = useState('')
    const [article, setArticle] = useState('')
    const navigation = useNavigation()

    const onNewItemCreateCallback = async () => {
        // const storage = createAsyncStorage('catalog');
        const OfflineOrder = {
            status: 'pending',
            localId: uuid.v4(),
            item: {
                name,
                article
            }
        }

        if (isOffline) {
            setOfflineQueue((prev) => [...prev, OfflineOrder])
            return
        }
        // const json = JSON.stringify(OfflineOrder);

        // await storage.setItem('@offline_orders_queue', json)
        const response = await axios.post(`${API_URL}/ut_api/hs/v1/orders`, OfflineOrder)

        if (response.status != 200) {
            throw new Error('Не удалось загрузить товары');
        }

        navigation.goBack()
        Alert.alert('Успех', 'Заказ сразу отправлен в 1С / сервер');
        return response.data
    }

    const handleSyncQueue = async () => {
        if (offlineQueue.length === 0) return
        setIsSending(true)

        for (const order of offlineQueue) {
            const response = await axios.post(`${API_URL}/ut_api/hs/v1/orders`, order)
            if (response.status !== 200) throw new Error('Ошибка при синхронизации');
        }

        setOfflineQueue([]);
        navigation.goBack()
        
        Alert.alert('Синхронизировано', 'Все офлайн-заказы доставлены!');
        setIsSending(false);
    }

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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>Симуляция Offline (без сети):</Text>
                <Switch value={isOffline} onValueChange={setOffline} />
            </View>
        </View>



        <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonStyle} onPress={() => {
                onNewItemCreateCallback()
                
            }}>
                <Text style={styles.textButtonStyle}>Создать номенклатуру</Text>
            </Pressable>
        </View>

        {offlineQueue.length > 0 && <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonStyle} disabled={isSending || isOffline} onPress={() => {
                handleSyncQueue()
            }}>
                <Text style={styles.textButtonStyle}>{isSending ? 'Отправка' : `Отправить офлайн-заказы (${offlineQueue.length}`}</Text>
            </Pressable>
        </View>
        }

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
