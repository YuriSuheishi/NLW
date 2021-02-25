import styles from "../styles/components/Countdown.module.css"
import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from "../contexts/ChallegesContext";

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
    const {newChallenge} = useContext(ChallengesContext);
    const [time, setTime] = useState(0.1*60);
    const min = Math.floor(time/60);
    const s = time % 60;

    const [minL,minR] = String(min).padStart(2, '0').split('');
    const [sL,sR] = String(s).padStart(2, '0').split('');

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
    

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minL}</span>
                    <span>{minR}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{sL}</span>
                    <span>{sR}</span>
                </div>
            </div>    

            { hasFinished ? (
                    <button 
                    disabled
                    className={styles.start} >
                    Ciclo encerrado 
                    </button>
            ):(
                <>
                { isActive? (
                    <button 
                    type="button" 
                    className={`${styles.start} ${styles.active}`}
                    onClick={isTheFinalCountdown}>
                    Abandonar Ciclo 
                    </button>
                ):(
                    <button 
                    type="button" 
                    className={styles.start} 
                    onClick={start}>
                    Iniciar um ciclo 
                    </button>

                ) }

                </>
            )}
        </div>
    );
}