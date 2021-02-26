import styles from "../styles/components/Countdown.module.css";
import { useState, useEffect, useContext } from 'react';
import { CountdownContext } from "../contexts/CountdownContext";

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
    const {min, s, hasFinished, isActive, isTheFinalCountdown, start} = useContext(CountdownContext);

    const [minL,minR] = String(min).padStart(2, '0').split('');
    const [sL,sR] = String(s).padStart(2, '0').split('');
    
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