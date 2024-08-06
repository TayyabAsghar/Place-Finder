const HeroSection = () => {
    return (
        <div className="h-[85vh] relative text-center w-full">
            <img className="h-full w-full object-cover" src="assets/images/slide.webp" />
            <div className="absolute h-full w-full top-0 bg-gradient-to-r from-black-light to-black-light" />
            <h1 className="absolute top-10 px-5 text-center w-full text-background text-4xl max-ml:text-2xl max-ms:text-xl">
                <p>Welcome Home!</p>
                <p>Anywhere You Roam, <span className="inline-block">Find A Home</span></p>
            </h1>
        </div>
    );
};

export default HeroSection;