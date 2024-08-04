import Loader from "./Loader";
import { CiImageOff } from "react-icons/ci";
import { ImgHTMLAttributes, useState } from "react";

const ImageLoader = (props?: ImgHTMLAttributes<HTMLImageElement>) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const stopLoading = () => setLoading(false);
    const onError = () => {
        setError(true);
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center w-full h-full">
            {error ? <div className="flex flex-col gap-1 items-center">
                <CiImageOff />
                <p>{props?.alt}</p>
            </div> :
                <img src={props?.src} className={`${loading ? "hidden" : "block"} w-full h-full ${props?.className}`} onLoad={stopLoading}
                    onError={onError} alt={props?.alt} />
            }
            {!!loading && <Loader />}
        </div>
    );
};

export default ImageLoader;