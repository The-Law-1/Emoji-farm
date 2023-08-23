import blossom from "@/assets/Plants/blossom.svg";
import { defineStore } from 'pinia';
import { Base64 } from "./utils/base64";

export const useUtilitiesStore = defineStore('utilities', () => {
    const svgDictionary = {
        blossom
    };

    const base64 = Base64;

    return {
        svgDictionary,
        base64
    }
});
