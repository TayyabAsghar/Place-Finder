import { CarouselProps } from "../lib/types";
import Carousel from "react-material-ui-carousel";

const CustomCarousel = ({ children }: CarouselProps) => {
    return (
        <Carousel indicatorIconButtonProps={{ style: { color: "hsl(159, 20%, 80%)" } }}
            activeIndicatorIconButtonProps={{ style: { color: "#6D9E8D" } }}
            navButtonsProps={{ style: { backgroundColor: "hsl(159, 20%, 40%)" } }} >
            {children}
        </Carousel>
    );
};

export default CustomCarousel;