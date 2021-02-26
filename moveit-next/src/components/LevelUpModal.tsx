import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal(){
    const {level, closeLevelUpModal} = useContext(ChallengesContext);
    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você subiu de nivel!</p>

                <button type="button">
                    <img src="/icons/close.svg" alt="Fechar modal" onClick={closeLevelUpModal} />
                </button>
            </div>
        </div>
    )
}