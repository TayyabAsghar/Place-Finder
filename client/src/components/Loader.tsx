import { CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <div className="flex items-center justify-center w-full h-[90vh]">
            <CircularProgress thickness={4} size={48} />
        </div>
    );
};

export default Loader;