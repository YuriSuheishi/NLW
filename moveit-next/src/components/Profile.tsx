import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile(){
        const {level} = useContext(ChallengesContext);

        return (
            <div className={styles.profileContainer}>
                <img src="https://github.com/YuriSuheishi.png" alt="Yuri Suheishi" />
                <div>
                <strong>Yuri Suheishi</strong>
                <p> 
                    <img src="icons/level.svg" alt="level" />
                    Level {level} 
                </p>
                </div>
            </div>
        );
}