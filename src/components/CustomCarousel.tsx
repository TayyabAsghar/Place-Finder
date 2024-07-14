import Carousel from "react-material-ui-carousel";
import { CarouselProps } from "react-material-ui-carousel/dist/components/types";

const CustomCarousel = (props: CarouselProps) => {
    return (
        <Carousel indicatorIconButtonProps={{ style: { color: "hsl(159, 20%, 80%)" } }}
            activeIndicatorIconButtonProps={{ style: { color: "#6D9E8D" } }}
            navButtonsProps={{ style: { backgroundColor: "hsl(159, 20%, 40%)" } }} {...props} >
            {props.children}
        </Carousel>
    );
};

export default CustomCarousel;