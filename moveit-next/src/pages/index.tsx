
import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';

import { XpBar } from '../components/XpBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallendes';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext' ;

export default function Home() {
  return (
    <div className={styles.container}>
    <CountdownProvider>
        <Head> <title>Inicio Move It!</title> </Head>

        <XpBar />

        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
    </CountdownProvider>    
    </div>
  )
}
