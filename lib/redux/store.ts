"use client"

import { configureStore } from "@reduxjs/toolkit"
import featuresReducer from "./features/featuresSlice"

export const store = configureStore({
  reducer: {
    features: featuresReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
