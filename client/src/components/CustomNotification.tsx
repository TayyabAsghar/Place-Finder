import { useState } from "react";
import type { NotificationProps } from "../lib/types";
import { Alert, AlertTitle, Snackbar, type SnackbarOrigin } from "@mui/material";

const CustomNotification = ({ message, severity, duration = 8000, showNotification = true }: NotificationProps) => {
    const fontWeight = 700;
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const origin: SnackbarOrigin = { horizontal: "right", vertical: "top" };

    return (
        showNotification ?
            <Snackbar anchorOrigin={origin} open={open} autoHideDuration={duration} onClose={handleClose}>
                <Alert className="!w-96 max-ml:!w-64" severity={severity} onClose={handleClose}>
                    {severity === "error" &&
                        <AlertTitle sx={{ fontWeight: fontWeight }}>Error</AlertTitle>
                    }
                    {severity === "info" &&
                        <AlertTitle sx={{ fontWeight: fontWeight }}>Info</AlertTitle>
                    }
                    {severity === "success" &&
                        <AlertTitle sx={{ fontWeight: fontWeight }}>Success</AlertTitle>
                    }
                    {severity === "warning" &&
                        <AlertTitle sx={{ fontWeight: fontWeight }}>Warning</AlertTitle>
                    }
                    {message}
                </Alert>
            </Snackbar > :
            <></>
    );
};

export default CustomNotification;