import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const {activeChallenge, completeChallenge, failChallenge } = useContext(ChallengesContext);
    return (
        <div className={styles.container}>

            { activeChallenge ? (
            <div className={styles.active}>
                <header>Ganhe {activeChallenge.amount} XP</header>
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
            <div className={styles.notActive}>
                <strong> Finalize um ciclo para receber um desafio </strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de level completando desafios
                </p>
            </div>

            )}
            
        </div>
    )
}