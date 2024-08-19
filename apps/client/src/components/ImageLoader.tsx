import { ImgHTMLAttributes } from "react";
import CloudinaryGen from "../lib/cloudinaryGen";
import { fit } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage, placeholder, } from "@cloudinary/react";

const ImageLoader = (props?: ImgHTMLAttributes<HTMLImageElement>) => {
    let image = CloudinaryGen.image(props?.src);

    if (props?.width) image = image.resize(fit().height(props?.width));
    if (props?.height) image = image.resize(fit().height(props?.height));

    return (
        <AdvancedImage className={props?.className} cldImg={image} alt={props?.alt}
            plugins={[placeholder({ mode: "blur" })]}>
        </AdvancedImage>
    );
};

export default ImageLoader;