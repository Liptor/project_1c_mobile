export type OrderSyncStatus = 'pending' | 'syncing' | 'synced' | 'error';

export interface OfflineOrder {
    localId: string;
    item: {
        name: string;
        article: string
    },
    status: OrderSyncStatus;
    errorMessage?: string;
}