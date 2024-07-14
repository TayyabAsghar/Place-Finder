import { CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <div className="flex items-center h-screen">
            <CircularProgress thickness={4} size={48} />
        </div>
    );
};

export default Loader;