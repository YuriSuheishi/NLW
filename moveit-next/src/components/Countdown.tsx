import styles from "../styles/components/Countdown.module.css"
import { useState, useEffect } from 'react';

export function Countdown(){
    const [time, setTime] = useState(25*60);
    const min = Math.floor(time/60);
    const s = time % 60;

    const [minL,minR] = String(min).padStart(2, '0').split('');
    const [sL,sR] = String(s).padStart(2, '0').split('');

    
    const [active, setActive] = useState(false);
    function isTheFinalCountdown(){
        setActive(true);
    }

    
    useEffect(()=>{
        if(active && time > 0){
            setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
    },[active, time])
    

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

            <button type="button" className={styles.start} onClick={isTheFinalCountdown}>
                Iniciar um ciclo
            </button>
        </div>
    );
}