import { createContext, useContext } from 'react';
import type { NotificationContextType } from '../lib/types';

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const useNotification = () => {
    const notification = useContext(NotificationContext);

    if (!notification)
        throw new Error('useNotification must be used with a NotificationContextProvider');

    return notification;
};

export default useNotification;
