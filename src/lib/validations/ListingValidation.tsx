import { z } from "zod";
import { AcceptedImageTypes } from "../constants";

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
        .refine(files => Array.from(files || []).every(file => AcceptedImageTypes.includes(file.type), "Only .jpeg, .jpg and .png are accepted.")),
    title: z.string().trim().min(1, { message: 'Listing Photos are required.' }).max(30, { message: 'Maximum 30 characters.' }),
    description: z.string().trim().min(1, { message: 'Required field.' }),
    highlight: z.string().trim().min(1, { message: 'Required field.' }).max(30, { message: 'Maximum 30 characters.' }),
    highlightDesc: z.string().trim().min(1, { message: 'Required field.' }),
    price: z.coerce.number().min(1, { message: 'Required field.' })
});