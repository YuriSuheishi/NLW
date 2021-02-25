import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegesContext';
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges(){
    const {challengesCompleted} = useContext(ChallengesContext) ;

    return(
        <div className={styles.completedChallengesConteiner}>
            <span>Desafios Concluidos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}