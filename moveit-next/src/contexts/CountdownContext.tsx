import { createContext, ReactNode } from "react";
export const CountdownContext = createContext({} as CountdownContextData);

import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from "../contexts/ChallegesContext";

let countdownTimeout: NodeJS.Timeout;

interface CountdownProviderProps{
    children: ReactNode;
}

interface CountdownContextData{
    min: number;
    s: number;
    isActive: boolean;
    hasFinished: boolean;
    isTheFinalCountdown: () => void;
    start: () => void;
}

export function CountdownProvider({children}){
    const {newChallenge, activeChallenge} = useContext(ChallengesContext);
    const [time, setTime] = useState(0.1*60);
    const min = Math.floor(time/60);
    const s = time % 60;

    const [hasFinished, setHasFinished] = useState(false);
    const [isActive, setIsActive] = useState(false);

    function isTheFinalCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1*60);
    }

    function start(){
        setIsActive(true);
    }

    useEffect(() =>{
        if(!activeChallenge){
            isTheFinalCountdown();
            setHasFinished(false);
        }
    },[activeChallenge])

    
    useEffect(()=>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            newChallenge();
        }
    },[isActive, time])

    return(
        <CountdownContext.Provider
        value={{min, s, hasFinished, isActive, isTheFinalCountdown, start}}>
            {children}
        </CountdownContext.Provider>

    );
}