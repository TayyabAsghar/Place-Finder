import { z } from "zod";
import { LoadingButton } from "@mui/lab";
import { BiTrash } from "react-icons/bi";
import { UserState } from "../lib/types";
import useAxios from "../hooks/useAxios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toTitleCase } from "../lib/utils";
import ReactError from "../lib/reactError";
import { IoIosImages } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { type ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcceptedImageTypes } from "../lib/constants";
import useNotification from "../hooks/useNotification";
import { AllCategories, Types, Facilities } from "../data/categoriesData";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { CreateListingValidations } from "../lib/validations/ListingValidation";
import { IconButton, InputAdornment, TextField, useMediaQuery, useTheme } from "@mui/material";

const CreateListingPage = () => {
    const theme = useTheme();
    const customAxios = useAxios();
    const navigate = useNavigate();
    const { setNotification } = useNotification();
    const [photos, setPhotos] = useState<File[]>([]);
    const isMobile = useMediaQuery(theme.breakpoints.down("ml"));
    type CreateListingFormType = z.infer<typeof CreateListingValidations>;
    type CreateListingFormKeysType = keyof CreateListingFormType;
    const creatorId = useSelector((state: UserState) => state.user?._id || '');
    const { register, handleSubmit, getValues, setValue, trigger, formState: { errors, isSubmitting } } = useForm<CreateListingFormType>({
        resolver: zodResolver(CreateListingValidations),
        defaultValues: {
            type: '',
            price: 0,
            bedCount: 1,
            category: '',
            amenities: [],
            guestCount: 1,
            bedroomCount: 1,
            bathroomCount: 1,
            creatorId: creatorId
        }
    });

    const setControlValue = (name: CreateListingFormKeysType, value: string) => {
        setValue(name, value);
        trigger(name);
    };

    const decrementCounter = (fieldName: CreateListingFormKeysType) => {
        setValue(fieldName, Number(getValues(fieldName)) - 1);
        trigger(fieldName);
    };

    const incrementCounter = (fieldName: CreateListingFormKeysType) => {
        setValue(fieldName, Number(getValues(fieldName)) + 1);
        trigger(fieldName);
    };

    const selectAmenities = (facility: string) => {
        let currentAmenities = getValues("amenities");
        const index = currentAmenities.indexOf(facility);

        if (index > -1) currentAmenities.splice(index, 1);
        else currentAmenities = [facility, ...Array.from(currentAmenities)];

        setValue("amenities", currentAmenities);
        trigger("amenities");
    };

    const updateListingPhotos = (photosList: File[]) => {
        setPhotos(photosList);
        setValue("listingPhotos", photosList);
        trigger("listingPhotos");
    };

    const handleUploadPhotos = (e: ChangeEvent<HTMLInputElement>) => {
        const newPhotos = e.target.files;

        if (newPhotos) {
            const updatedFiles = [...photos, ...Array.from(newPhotos)];
            updateListingPhotos(updatedFiles);
        }
    };

    const handleRemovePhoto = (deletedIndex: number) => {
        if (photos) {
            const filteredPhotos = photos.filter((_, index) => index !== deletedIndex);
            updateListingPhotos(filteredPhotos);
        }
    };

    const handleFormSubmit = async (formData: CreateListingFormType) => {
        try {
            const listingForm = new FormData();

            listingForm.append("type", formData.type);
            listingForm.append("category", formData.category);
            listingForm.append("creatorId", formData.creatorId);
            listingForm.append("city", toTitleCase(formData.city));
            listingForm.append("price", formData.price.toString());
            listingForm.append("description", formData.description);
            listingForm.append("title", toTitleCase(formData.title));
            listingForm.append("highlightDesc", formData.highlightDesc);
            listingForm.append("country", toTitleCase(formData.country));
            listingForm.append("bedCount", formData.bedCount.toString());
            listingForm.append("aptSuite", toTitleCase(formData.aptSuite));
            listingForm.append("province", toTitleCase(formData.province));
            listingForm.append("guestCount", formData.guestCount.toString());
            listingForm.append("highlight", toTitleCase(formData.highlight));
            listingForm.append("bedroomCount", formData.bedroomCount.toString());
            listingForm.append("bathroomCount", formData.bathroomCount.toString());
            listingForm.append("streetAddress", toTitleCase(formData.streetAddress));
            formData.listingPhotos.forEach(photo => listingForm.append("listingPhotos", photo));
            Array.from(formData.amenities).forEach(amenity => listingForm.append("amenities", amenity));

            const response = await customAxios.post("/listing/create", listingForm, "form");
            if (response.data.errorFiles.length)
                setNotification({ message: "1 or more images faced some issues while uploading.", severity: "error" });
            navigate(`/listing/${response.data.listing._id}`);
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
        }
    };
    return (
        <div className="px-14 pt-10 pb-20 max-ml:pt-6 max-ml:pb-12 max-mm:py-4 max-mm:px-4 max-ms:px-2">
            <h1>Publish Your Place</h1>
            <form className="flex flex-col items-center" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="bg-secondary-100 bg-opacity-25 mt-10 rounded-2xl px-10 py-7 max-ml:mt-5 max-ml:px-6 max-ml:py-5">
                    <h2 className="text-accent">Step 1: Tell us about your place</h2>
                    <hr className="mx-0 my-4 max-ml:my-3" />
                    <h3 className="create-listing-heading">Which of one these categories best describes your place?</h3>
                    <div className="flex justify-center items-center flex-wrap gap-5 px-5 py-0" {...register("category")}>
                        {AllCategories?.slice(1).map((item, index) => (
                            <div className={`create-listing-categories ${getValues("category") === item.label ? "create-listing-selected" : ""}
                                ${!!errors.category ? "!border-error" : ""}`} key={index} onClick={() => setControlValue("category", item.label)}>
                                <div className="text-3xl max-ml:text-2xl">{item.icon}</div>
                                <p className="font-semibold text-center max-ml:font-medium max-mm:text-sm">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="create-listing-heading">What type of place will guests have?</h3>
                    <div className="flex justify-around gap-y-5 flex-wrap" {...register("type")}>
                        {Types?.map((item, index) => (
                            <div className={`create-listing-types ${getValues("type") === item.name ? "create-listing-selected" : ""}
                                ${!!errors.type ? "!border-error" : ""}`}
                                key={index} onClick={() => setControlValue("type", item.name)}>
                                <div className="max-w-[400px] flex flex-col max-ml:h-full max-ml:justify-evenly max-ml:w-full">
                                    <div className="flex justify-between">
                                        <h4 className="mb-1 font-semibold text-lg max-ml:text-base">{item.name}</h4>
                                        <div className="text-3xl ml:hidden">{item.icon}</div>
                                    </div>
                                    <p className="max-ml:text-sm">{item.description}</p>
                                </div>
                                <div className="text-3xl max-ml:hidden">{item.icon}</div>
                            </div>
                        ))}
                    </div>

                    <h3 className="create-listing-heading !mb-0">Where's your place located?</h3>
                    <div className="max-w-[700px]">
                        <TextField
                            size={`${isMobile ? "small" : "medium"}`}
                            className="w-full"
                            label="Street Address"
                            title="Street Address"
                            type="text"
                            margin="normal"
                            {...register("streetAddress")}
                            error={!!errors.streetAddress}
                            helperText={errors.streetAddress?.message}
                        />
                    </div>
                    <div className="max-w-[700px] flex gap-x-10 max-ml:flex-wrap">
                        <TextField
                            size={`${isMobile ? "small" : "medium"}`}
                            className="w-full"
                            label="Apt, Suite, etc."
                            title="Apt, Suite, etc."
                            type="text"
                            margin="normal"
                            {...register("aptSuite")}
                            error={!!errors.aptSuite}
                            helperText={errors.aptSuite?.message}
                        />
                        <TextField
                            size={`${isMobile ? "small" : "medium"}`}
                            className="w-full"
                            label="City"
                            title="City"
                            type="text"
                            margin="normal"
                            {...register("city")}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </div>
                    <div className="max-w-[700px] flex gap-x-10 max-ml:flex-wrap">
                        <TextField
                            size={`${isMobile ? "small" : "medium"}`}
                            className="w-full"
                            label="Province"
                            title="Province"
                            type="text"
                            margin="normal"
                            {...register("province")}
                            error={!!errors.province}
                            helperText={errors.province?.message}
                        />
                        <TextField
                            size={`${isMobile ? "small" : "medium"}`}
                            className="w-full"
                            label="Country"
                            title="Country"
                            type="text"
                            margin="normal"
                            {...register("country")}
                            error={!!errors.country}
                            helperText={errors.country?.message}
                        />
                    </div>

                    <h3 className="create-listing-heading">Share some basics about your place</h3>
                    <div className="flex flex-wrap gap-x-10 gap-y-5 max-tab:justify-between">
                        <div className="counter-buttons">
                            <p className="font-semibold">Guests</p>
                            <div className="flex items-center gap-2 text-xl">
                                <IconButton aria-label="remove guests" color="primary" disabled={getValues("guestCount") === 1}
                                    onClick={() => decrementCounter("guestCount")}>
                                    <RemoveCircleOutline />
                                </IconButton>
                                <input className="max-w-6 bg-transparent focus-visible:outline-none" readOnly {...register("guestCount")} />
                                <IconButton aria-label="add guests" color="primary"
                                    onClick={() => incrementCounter("guestCount")}>
                                    <AddCircleOutline />
                                </IconButton>
                            </div>
                        </div>

                        <div className="counter-buttons">
                            <p className="font-semibold">Bedrooms</p>
                            <div className="flex items-center gap-2 text-xl">
                                <IconButton aria-label="remove bedroom" color="primary" disabled={getValues("bedroomCount") === 1}
                                    onClick={() => decrementCounter("bedroomCount")}>
                                    <RemoveCircleOutline />
                                </IconButton>
                                <input className="max-w-6 bg-transparent focus-visible:outline-none" readOnly {...register("bedroomCount")} />
                                <IconButton aria-label="add bedroom" color="primary"
                                    onClick={() => incrementCounter("bedroomCount")}>
                                    <AddCircleOutline />
                                </IconButton>
                            </div>
                        </div>

                        <div className="counter-buttons">
                            <p className="font-semibold">Beds</p>
                            <div className="flex items-center gap-2 text-xl">
                                <IconButton aria-label="remove bed" color="primary" disabled={getValues("bedCount") === 1}
                                    onClick={() => decrementCounter("bedCount")}>
                                    <RemoveCircleOutline />
                                </IconButton>
                                <input className="max-w-6 bg-transparent focus-visible:outline-none" readOnly {...register("bedCount")} />
                                <IconButton aria-label="add bed" color="primary"
                                    onClick={() => incrementCounter("bedCount")}>
                                    <AddCircleOutline />
                                </IconButton>
                            </div>
                        </div>

                        <div className="counter-buttons">
                            <p className="font-semibold">Bathrooms</p>
                            <div className="flex items-center gap-2 text-xl">
                                <IconButton aria-label="remove bathroom" color="primary" disabled={getValues("bathroomCount") === 1}
                                    onClick={() => decrementCounter("bathroomCount")}>
                                    <RemoveCircleOutline />
                                </IconButton>
                                <input className="max-w-6 bg-transparent focus-visible:outline-none" readOnly {...register("bathroomCount")} />
                                <IconButton aria-label="add bathroom" color="primary"
                                    onClick={() => incrementCounter("bathroomCount")}>
                                    <AddCircleOutline />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-secondary-100 bg-opacity-25 mt-10 rounded-2xl px-10 py-7 max-ml:mt-5 max-ml:px-6 max-ml:py-5">
                    <h2>Step 2: Make your place stand out</h2>
                    <hr className="mx-0 my-4 max-ml:my-3" />
                    <h3 className="create-listing-heading">Tell guests what your place has to offer</h3>
                    <div className="flex justify-center flex-wrap gap-5">
                        {Facilities?.map((item, index) => (
                            <div className={`create-listing-facilities ${getValues("amenities")?.includes(item.name) ? "create-listing-selected" : ""}
                                ${!!errors.amenities ? "!border-error" : ""}`}
                                key={index} onClick={() => selectAmenities(item.name)}>
                                <div className="text-3xl max-ml:text-2xl max-ms:text-xl">{item.icon}</div>
                                <p className="font-semibold max-ml:font-normal max-mm:text-sm">{item.name}</p>
                            </div>
                        ))}
                    </div>
                    {!!errors.amenities && <div className="error-message">{errors.amenities?.message}</div>}

                    <h3 className="create-listing-heading">Add some photos of your place</h3>
                    <div className="flex flex-col flex-wrap gap-4">
                        {photos.length >= 1 &&
                            <div className="flex flex-wrap gap-4 max-ml:justify-center">
                                {photos.map((photo, index) =>
                                    <div className="max-w-64 max-h-44 max-ml:h-36 max-ml:w-60 relative" key={index}>
                                        <img className="w-full h-full object-contain" alt="place"
                                            src={URL.createObjectURL(photo)} />
                                        <div className="absolute top-0 right-0 bg-accent-100">
                                            <IconButton className="!p-0 !text-primary hover:!text-error" type="button"
                                                onClick={() => handleRemovePhoto(index)}>
                                                <BiTrash />
                                            </IconButton>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                        <div className="flex-col items-center justify-center max-ml:flex" {...register("listingPhotos")}>
                            <input id="image" type="file" style={{ display: "none" }} onChange={handleUploadPhotos}
                                accept={AcceptedImageTypes.join(",")} multiple />
                            <label className={`flex flex-col gap-3 w-72 h-44 items-center px-12 py-8 rounded-md border border-dashed cursor-pointer hover:border-foreground max-ml:h-36 max-ml:w-60
                                    ${!!errors.listingPhotos ? "border-error hover:border-error" : ""}`} htmlFor="image">
                                <IoIosImages className="text-6xl" />
                                <p className="font-semibold text-center max-ml:font-normal max-ml:text-sm">Upload from your device</p>
                            </label>
                            {!!errors.listingPhotos && <div className="error-message">{errors.listingPhotos?.message}</div>}
                        </div>
                    </div>

                    <h3 className="create-listing-heading">What make your place attractive and exciting?</h3>
                    <div className="max-w-[700px]">
                        <TextField
                            size={`${isMobile ? "small" : "medium"}`}
                            className="w-full"
                            label="Title"
                            title="Title"
                            type="text"
                            margin="normal"
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        <TextField
                            size={`${isMobile ? "small" : "medium"}`}
                            className="w-full"
                            label='Description'
                            title='Description'
                            margin="normal"
                            multiline
                            maxRows={5}
                            {...register("description")}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        <TextField
                            size={`${isMobile ? "small" : "medium"}`}
                            className="w-full"
                            label='Highlight'
                            title='Highlight'
                            margin="normal"
                            {...register("highlight")}
                            error={!!errors.highlight}
                            helperText={errors.highlight?.message}
                        />
                        <TextField
                            size={`${isMobile ? "small" : "medium"}`}
                            className="w-full"
                            label='Highlight Details'
                            title='Highlight Details'
                            margin="normal"
                            multiline
                            maxRows={5}
                            {...register("highlightDesc")}
                            error={!!errors.highlightDesc}
                            helperText={errors.highlightDesc?.message}
                        />
                        <TextField
                            size={`${isMobile ? "small" : "medium"}`}
                            className="w-1/2"
                            label='Price'
                            title='Price'
                            type="number"
                            margin="normal"
                            InputProps={{
                                inputProps: { min: 0 },
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            {...register("price")}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                    </div>
                </div>

                <LoadingButton className="w-3/4 !mt-16 max-mm:!my-10"
                    sx={{ mt: 2 }} type="submit" variant="contained" loading={isSubmitting} title="Create Listing">
                    Create Your Listing
                </LoadingButton>
            </form>
        </div>
    );
};

export default CreateListingPage;