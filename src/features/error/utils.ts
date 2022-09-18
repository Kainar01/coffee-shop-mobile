import { Alert } from 'react-native';

export const errorHandler = (err: any) => Alert.alert(err.error || err.message || err.data?.message || 'Произошла ошибка попробуйте позже');
