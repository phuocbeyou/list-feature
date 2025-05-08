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
    addFeature: (state, action: PayloadAction<Feature>) => {
      state.features.push(action.payload)
    },
    updateFeature: (state, action: PayloadAction<Feature>) => {
      const index = state.features.findIndex((feature) => feature.id === action.payload.id)
      if (index !== -1) {
        state.features[index] = action.payload
      }
    },
    deleteFeature: (state, action: PayloadAction<string>) => {
      state.features = state.features.filter((feature) => feature.id !== action.payload)
    },
    importFeatures: (state, action: PayloadAction<Feature[]>) => {
      // Check for duplicates and merge or add as needed
      action.payload.forEach((newFeature) => {
        const existingIndex = state.features.findIndex((feature) => feature.id === newFeature.id)

        if (existingIndex !== -1) {
          // Update existing feature
          state.features[existingIndex] = newFeature
        } else {
          // Add new feature
          state.features.push(newFeature)
        }
      })
    },
  },
})

export const { addFeature, updateFeature, deleteFeature, importFeatures } = featuresSlice.actions

export default featuresSlice.reducer
