import React, {createContext, useContext, useReducer} from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value = {useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider> 
    );
    //3:07 in video

export const useStateValue = () => useContext(StateContext)