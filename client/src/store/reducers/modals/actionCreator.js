// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {setModal} from "./orderSlice";
// import {apiGetDetailEvent} from "$/api";
// import {delay} from "../../../helpers/_functions";

// export const fetchDetailEvent = createAsyncThunk(
//     "modals/fetchDetailEvent",
//     async function (payload, { dispatch, rejectWithValue }) {
//         try {
//
//             const response = delay(300).then(() => apiGetDetailEvent(payload));
//
//             if(response) {
//                 return response
//                 // console.log("dispatch")
//                 // dispatch(setModal({type: "ModalContact", cards: [...response]}))
//             }
//
//         } catch (error) {
//             return rejectWithValue(`Не удалось загрузить информацию по событию. ${error}`)
//         }
//     }
// )
