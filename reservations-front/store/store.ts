import GlobalSlice from "@/store/slices/GlobalSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        GlobalSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: {} }),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export default store;
