import { handleGetSavedInfo } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export type State = {
    loading?: boolean;
};

const initialState: State = {
    loading: false
};

const GlobalSlice = createSlice({
    name: "global",
    initialState: handleGetSavedInfo() ?? initialState,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload;
        }
    }
});

export function useGlobalActions() {
    const dispatch = useDispatch();

    const setLoading = (loading: boolean) => {
        dispatch(GlobalSlice.actions.setLoading(loading));
    }

    return {
        setLoading
    };
}

export default GlobalSlice.reducer;
