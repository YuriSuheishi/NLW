
import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';

import { XpBar } from '../components/XpBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallendes';
import { Countdown } from '../components/Countdown';

export default function Home() {
  return (
    <div className={styles.container}>
        <Head> <title>Inicio Move It!</title> </Head>

        <XpBar />

        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            
          </div>
        </section>
    </div>
  )
}
