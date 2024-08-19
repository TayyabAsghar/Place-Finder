import { ReactNode, useState } from "react";
import type { NotificationProps } from "../lib/types";
import { NotificationContext } from "../hooks/useNotification";

const NotificationProvider = ({ children }: { children: ReactNode; }) => {
    const [notification, setNotification] = useState<NotificationProps>({
        message: "",
        severity: "error",
        showNotification: false
    });

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;