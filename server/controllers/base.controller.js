import asyncHandler from "../libs/asyncHandler.js";

export const handleRootRequest = asyncHandler(async (_, res) =>
    res.status(200).send('Server is up and running')
);
