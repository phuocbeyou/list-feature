"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Feature } from "@/lib/types"

interface FeaturesState {
  features: Feature[]
}

const initialState: FeaturesState = {
  features: [],
}

export const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    importFeatures: (state, action: PayloadAction<Feature[]>) => {
      state.features = action.payload
    },
    addFeature: (state, action: PayloadAction<Feature>) => {
      state.features.push(action.payload)
    },
    updateFeature: (state, action: PayloadAction<Feature>) => {
      const index = state.features.findIndex((feature) => feature.id === action.payload.id)
      if (index !== -1) {
        state.features[index] = action.payload
      }
    },
  },
})

export const { importFeatures, addFeature, updateFeature } = featuresSlice.actions

export default featuresSlice.reducer
