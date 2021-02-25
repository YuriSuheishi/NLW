import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegesContext';
import styles from '../styles/components/XpBar.module.css';

export function XpBar(){
    const { xp, xpNL } = useContext(ChallengesContext);
    const percent = Math.round((xp * 100)/xpNL);

    return (
        <header className={styles.xpBar}>
            <span> 0 xp </span>
            <div>
                <div style={{width: `${percent}%`}}/>
                
                <span className={styles.currentXp} style={{ left:  `${percent}%` }}> {xp}xp</span>
            </div>
            <span> {xpNL} xp</span>
        </header>
    );
}