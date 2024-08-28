import { z } from "zod";
import { AcceptedImageTypes, UploadImagesSizeLimit } from "../constants";

export const CreateListingValidations = z.object({
    creatorId: z.string().trim().min(1, { message: 'Required field.' }),
    category: z.string().trim().min(1, { message: 'Required field.' }),
    type: z.string().trim().min(1, { message: 'Required field.' }),
    streetAddress: z.string().trim().min(1, { message: 'Required field.' }),
    aptSuite: z.string().trim().min(1, { message: 'Required field.' }),
    city: z.string().trim().min(1, { message: 'Required field.' }),
    province: z.string().trim().min(1, { message: 'Required field.' }),
    country: z.string().trim().min(1, { message: 'Required field.' }),
    guestCount: z.number().min(1),
    bedroomCount: z.number().min(1),
    bedCount: z.number().min(1),
    bathroomCount: z.number().min(1),
    amenities: z.string().array().nonempty('Select at least 1 option.'),
    listingPhotos: z.custom<File[]>()
        .refine(files => files?.length !== 0, "Image is required")
        .refine(files => Array.from(files || []).every(file => AcceptedImageTypes.includes(file.type)), "Only .jpeg, .jpg, webp and .png are accepted.")
        .refine(files => Array.from(files || []).reduce((totalSize, file) => totalSize + file.size, 0) < UploadImagesSizeLimit, `Image/s total size should be smaller than ${UploadImagesSizeLimit / (2 ** 20)} Mb's.`)
        .refine(async files => {
            const promises = Array.from(files || [])?.map(async file => {
                const bitmap = await createImageBitmap(file);
                const { width, height } = bitmap;
                if (width < 400 || height < 400) return false;
                return true;
            });
            const results = await Promise.all(promises);
            return results?.every(result => result);
        }, 'All images should be more than 400 X 400 Dimensions.'),
    title: z.string().trim().min(1, { message: 'Listing Photos are required.' }).max(30, { message: 'Maximum 30 characters.' }),
    description: z.string().trim().min(1, { message: 'Required field.' }).max(800, { message: 'Maximum 800 characters.' }),
    highlight: z.string().trim().min(1, { message: 'Required field.' }).max(50, { message: 'Maximum 50 characters.' }),
    highlightDesc: z.string().trim().min(1, { message: 'Required field.' }).max(800, { message: 'Maximum 800 characters.' }),
    price: z.coerce.number().min(1, { message: 'Required field.' })
});