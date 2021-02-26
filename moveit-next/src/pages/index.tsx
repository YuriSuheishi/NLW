import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';
import {GetServerSideProps} from 'next';
import { ChallengesProvider } from '../contexts/ChallegesContext' 

import { XpBar } from '../components/XpBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallendes';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext' ;

interface HomeProps{
  level:number, cc:number, xp:number,
}

export default function Home(props: HomeProps) {
  console.log(props)
  return (
    <div className={styles.container}>
      
    <ChallengesProvider 
    level={props.level}
    xp={props.xp}
    challengesCompleted={props.cc}>
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
    </ChallengesProvider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const{level, xp, cc}= ctx.req.cookies;

  return {
    props: {
      level: Number(level), xp: Number(xp), cc: Number(cc),
    }
  }
}
