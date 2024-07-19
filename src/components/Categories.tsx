import { Link } from "react-router-dom";
import { AllCategories } from "../data/categoriesData";

const Categories = () => {
    return (
        <div className="flex flex-col items-center text-center px-14 py-12 w-full">
            <h1 className="font-extrabold mb-4 text-4xl">
                Explore Categories
            </h1>
            <p className="text-xl max-w-3xl">
                Explore our wide range of vacation rentals that cater to all types of travelers. Immerse yourself in the
                local culture, enjoy the comforts of home, and create unforgettable memories in your dream destination.
            </p>

            <div className="flex flex-wrap justify-center gap-5 py-12">
                {AllCategories.map((category, index) => (
                    <Link to={`/listing/category/${category.label.toLowerCase()}`} key={index}>
                        <div className="flex justify-center items-center w-60 h-52 relative parent">
                            <img className="absolute w-full h-full" src={category.img} alt={category.label} />
                            <div className="absolute w-full h-full bg-black bg-opacity-65 transition duration-300 ease-in-out child">
                            </div>
                            <div className="flex flex-col items-center relative text-primary gap-3">
                                <div className="text-5xl">{category.icon}</div>
                                <p className="text-xl font-semibold">{category.label}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;