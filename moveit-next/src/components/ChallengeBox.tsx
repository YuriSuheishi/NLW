import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';
import { darkMode } from '../pages/api/theme';

export function ChallengeBox(){
    const {activeChallenge, completeChallenge, failChallenge, doubleXpOn, doubleXP, counterDoubleTime,counterFreeze,counterDoubleXp } = useContext(ChallengesContext);
    const {timeStop, doubleTime,} = useContext(CountdownContext);

    return (
        <div className={(darkMode)? (styles.blackContainer):(styles.container)}>

            { activeChallenge ? (
            <div className={(darkMode)? (styles.blackActive):(styles.active)}>
                <header>Ganhe {doubleXP? (<span>{activeChallenge.amount * 2}</span>): activeChallenge.amount } XP </header>
                <main>
                    <img src={`icons/${activeChallenge.type}.svg`} />
                    <strong>Novo desafio</strong>
                    <p>{activeChallenge.description}</p>
                </main>
                <footer>
                    <button 
                    type="button"
                    className={styles.failed}
                    onClick={failChallenge}
                    >Falhei
                    </button>
                    <button
                    type="button"
                    className={styles.completed}
                    onClick={completeChallenge}
                    >Completei
                    </button>
                </footer>
            </div>
            ) : (
            <div className={(darkMode)? (styles.blackNotActive):(styles.notActive)}>
                <strong> Finalize um ciclo para receber um desafio </strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de level para receber mais poderes
                </p>

                <div className={styles.power}>
                    <button onClick={timeStop} className={styles.buttonFreeze} title="Congela o timer!"> {(counterFreeze>0)?counterFreeze:null} </button>
                    <button onClick={doubleTime} className={styles.buttonDoubleTime} title="Dobra a velocidade do timer!"> {(counterDoubleTime>0)? counterDoubleTime:null}</button>
                    <button onClick={doubleXpOn} className={styles.buttonXp} title="Garante dobro de experiencia no próximo desafio!"> {(counterDoubleXp>0)? counterDoubleXp: null}</button>
                </div>
            </div>

            )}
            
        </div>
    )
}