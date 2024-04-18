import { createSlice } from "@reduxjs/toolkit";

const loadAuthDataFromLocalStorage = () => {
    const storedAuthData = localStorage.getItem("auth");
    return storedAuthData ? JSON.parse(storedAuthData) : {
        sapid: "",
        userId: "",
        mentorId: null,
        email: "user@example.com",
        isStudent: false,
        isManager: false,
        isMentor: false,
        isCentralTarbiyah: false,
        isLogin: false
    };
};

const initialState = loadAuthDataFromLocalStorage();

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        createAuth: (state, action) => {
            const newState = { ...initialState, userId: action.payload._id , sapid: action.payload.sapid, isStudent: action.payload.isStudent, isManager: action.payload.isManager, isMentor: action.payload.isMentor, isCentralTarbiyah: action.payload.isCentralTarbiyah, email: action.payload.email, mentorId: action.payload.mentorId, isLogin: true };
            localStorage.setItem("auth", JSON.stringify(newState));
            return newState;
        },
        deleteAuth: (state) => {
            const newState = { ...initialState,sapid : "", userId: "", isStudent: false, isManager: false, isMentor: false, isCentralTarbiyah: false, email: "user@example.com", mentorId: null, isLogin: false };
            localStorage.setItem("auth", JSON.stringify(newState));
            return newState;
        }
    }
});

export const { createAuth, deleteAuth } = authSlice.actions;

export default authSlice.reducer;