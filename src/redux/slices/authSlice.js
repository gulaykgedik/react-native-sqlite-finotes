import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserFromDb, insertUserIfNotExists, loginFromDb } from "../../utils/db";
import { createUser, loginUser, updateUser } from "../actions/authActions";


const initialState = {
    isLogin: false,
    user: null,
    pendingLogin: false,
    pendingRegister: false,
    pendingUpdate: false,
    error: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state, action) => {
            state.user = null;
            state.isLogin = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // REGISTER DURUMLARI

            // a) yükleniyor
            .addCase(createUser.pending, (state, action) => {
                state.pendingRegister = true;
            })
            // b) reddedilme durumu
            .addCase(createUser.rejected, (state, action) => {
                state.pendingRegister = false;
                state.error = action.payload
            })
            // c) başarılı olma durumu
            .addCase(createUser.fulfilled, (state, action) => {
                state.pendingRegister = false;
                state.user = action.payload.user;
                state.error = null;
                state.isLogin = true;
            })
            // LOGIN DURUMLARI

            //a ) yükleniyor
            .addCase(loginUser.pending, (state) => {
                state.pendingLogin = true;
            })
            // b) reddedilme
            .addCase(loginUser.rejected, (state, action) => {
                state.pendingLogin = false;
                state.user = null;
                state.error = action.payload;
                state.isLogin = false
            })
            // c) başarılı
            .addCase(loginUser.fulfilled, (state, action) => {
                state.pendingLogin = false;
                state.user = action.payload.user; // geçici
                state.error = null;
                state.isLogin = true;
            })

            // Kullanıcı güncelleme durumları

            .addCase(updateUser.pending, (state, action) => {
                state.pendingUpdate = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.pendingUpdate = false;
                state.error = action.payload;
            })
            .addCase(updateUser.fulfilled, (state,action)=>{
                state.pendingUpdate = false;
                state.user = action.payload;
            })
    }
})


export const { logOut } = authSlice.actions;
export default authSlice.reducer