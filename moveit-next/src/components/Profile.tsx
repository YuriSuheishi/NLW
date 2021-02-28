import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegesContext';
import styles from '../styles/components/Profile.module.css';
import Link from 'next/link';
import { darkMode } from '../pages/api/theme';

export function Profile(){
        const {level, user, trocaMode} = useContext(ChallengesContext);
        // https://github.com/YuriSuheishi => [ "https:", "YuriSuheishi" ]
        const [link, name] = String(user).split('//github.com/');

        return (
            <div className={styles.profileContainer}>
                <img src={ (name)?(`https://github.com/${name}.png`):("anonimo.jpg")} alt="Yuri Suheishi" />
                <div>
                <div className={styles.botton}>    
                <strong>{(name)?? ("Anônimo")}</strong>
                    <Link href="/">
                    <button className={styles.Sair}>X</button>
                    </Link>
                </div>
                <div className={styles.botton}>     
                <p> 
                    <img src="icons/level.svg" alt="level" />
                    Level {level} 
                </p>
                    
                    {/*<button onClick={trocaMode} className={styles.DarkTheme} > {(darkMode)? (img lua):(img sol)} </button>*/}      
                </div>
                </div>
            </div>
        );
}