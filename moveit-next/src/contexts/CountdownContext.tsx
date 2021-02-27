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
    timeStop: () => void;
    doubleTime:() => void;
}

export function CountdownProvider({children}:CountdownProviderProps){
    const {newChallenge,useDoubleTime,useFreeze, activeChallenge, counterFreeze, counterDoubleTime} = useContext(ChallengesContext);
    const [time, setTime] = useState(0.1*60);
    const min = Math.floor(time/60);
    const s = time % 60;

    const [hasFinished, setHasFinished] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [Velocidade, setVelocidade] = useState(1000);

    function timeStop(){
        if(counterFreeze> 0){
            clearTimeout(countdownTimeout);
            setIsActive(false);
            setTime(s + (min *60));
            useFreeze();
        }
        else{
            console.log('acabou freeze');
        }
    }

    function doubleTime(){
        if(counterDoubleTime>0){
            setVelocidade(Velocidade/2);
            useDoubleTime();
        }
        else{
            console.log('acabou double time');
        }
    }

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
            setVelocidade(1000);
        }
    },[activeChallenge])

    
    useEffect(()=>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
                console.log(Velocidade)
            }, Velocidade)
        } else if (isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            newChallenge();
        }
    },[isActive, time])

    return(
        <CountdownContext.Provider
        value={{min, s, hasFinished, isActive, timeStop, doubleTime, isTheFinalCountdown, start}}>
            {children}
        </CountdownContext.Provider>

    );
}