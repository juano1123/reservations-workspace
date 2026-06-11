"use client";

import { useGlobalActions } from "@/store/slices/GlobalSlice";
import { RootState } from "@/store/store";
import { DEFAULT_SESSION_KEY_DATA } from "@/utils";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useGlobal = () => {
    const globalInfo = useSelector((store: RootState) => store.GlobalSlice);

    const {
        loading
    } = globalInfo;

    const { setLoading } = useGlobalActions();

    useEffect(() => {
        if (globalInfo) {
            sessionStorage.setItem(DEFAULT_SESSION_KEY_DATA, JSON.stringify(globalInfo));
        }
    }, [globalInfo]);

    return {
        loading,
        setLoading
    };
};

export default useGlobal;
