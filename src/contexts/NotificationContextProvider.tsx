import { ReactNode, useState } from "react";
import { NotificationProps } from "../lib/types";
import { NotificationContext } from "../hooks/useNotification";

const NotificationContextProvider = ({ children }: { children: ReactNode; }) => {
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

export default NotificationContextProvider;