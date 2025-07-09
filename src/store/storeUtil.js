import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

export const useRootSelector = useSelector;
export const useAppStore = useStore;
export const useAppDispatch = useDispatch;

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
