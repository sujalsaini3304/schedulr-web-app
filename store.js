import { create } from "zustand";

const useStore = create((set)=>(
    {
        userEmail : "" ,
        isModifyButtonPressed : false ,
        isLoggedIn : false ,
        isSidebarOpen : false ,
        setIsLoggedIn : (value)=>set(()=>({isLoggedIn : value})),
        setIsSidebarOpen : (value)=>set(()=>({isSidebarOpen : value})),
        setUserEmail : (value)=>set(()=>({userEmail : value})),
        setIsModifyButtonPressed : ()=>set((state)=>({isModifyButtonPressed : !state.isModifyButtonPressed })),
        setIsModifyButtonPressedManually : (value)=>set(()=>({isModifyButtonPressed : value})),

    }
))

export default useStore ; 