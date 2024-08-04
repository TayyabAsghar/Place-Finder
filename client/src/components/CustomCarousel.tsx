import Carousel from "react-material-ui-carousel";
import type { CarouselProps } from "react-material-ui-carousel/dist/components/types";

const CustomCarousel = (props: CarouselProps) => {
    return (
        <Carousel indicatorIconButtonProps={{ style: { color: "hsl(295, 22%, 90%)" } }}
            activeIndicatorIconButtonProps={{ style: { color: "#AC86AF" } }}
            navButtonsProps={{ style: { backgroundColor: "hsl(297, 20%, 40%)" } }} {...props}>
            {props.children}
        </Carousel>
    );
};

export default CustomCarousel;