import { ImgHTMLAttributes } from "react";
import CloudinaryCloud from "../lib/cloudinaryCloud";
import { AdvancedImage, placeholder, } from "@cloudinary/react";
import { fit } from "@cloudinary/url-gen/actions/resize";

const ImageLoader = (props?: ImgHTMLAttributes<HTMLImageElement>) => {
    let image = CloudinaryCloud.image(props?.src);

    if (props?.height) image = image.resize(fit().height(props?.height));
    if (props?.width) image = image.resize(fit().height(props?.width));

    return (
        <AdvancedImage className={props?.className} cldImg={image} alt={props?.alt}
            plugins={[placeholder({ mode: "blur" })]}>
        </AdvancedImage>
    );
};

export default ImageLoader;