import blossom from "@/assets/Plants/blossom.svg";
import { defineStore } from 'pinia';

export const useUtilitiesStore = defineStore('utilities', () => {
    const svgDictionary = {
        blossom
    };

    return {
        svgDictionary
    }
});
