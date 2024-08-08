import { parse, join } from "path";
import asyncHandler from "../libs/asyncHandler.js";

export const handleRootRequest = asyncHandler(async (_, res) =>
    res.status(200).send('Server is up and running')
);

export const handleFaviconRequest = asyncHandler(async (_, res) => {
    const __dirname = parse(import.meta.dirname).dir;
    const fileDirectory = join(__dirname, "public");

    res.sendFile("favicon.ico", { root: fileDirectory }, err => {
        console.log(fileDirectory);
        res.end();
        if (err) throw err;
    });
});
