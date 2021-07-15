/* eslint-disable */
import axios from "axios";
// request hub -> rh
export const rh = axios.create({
    baseURL: "https://hub.rss3.io/"
})
