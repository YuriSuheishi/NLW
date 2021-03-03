import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';
import {GetServerSideProps} from 'next';
import { ChallengesProvider } from '../contexts/ChallegesContext' ;

import { XpBar } from '../components/XpBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallendes';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext' ;

import { darkMode } from '../pages/api/theme';

interface HomeProps{
  level:number, cc:number, xp:number, counterDoubleTime:number,
  counterDoubleXp:number,counterFreeze:number, user:string, darkMode:boolean,
}

export default function Home(props: HomeProps) {
  console.log(props)
  
  return (
    <div className={(darkMode)? (styles.black):(styles.white)}>
      <div className={styles.container}>
      
    <ChallengesProvider
    level={props.level}
    xp={props.xp}
    challengesCompleted={props.cc}
    counterDoubleXp={props.counterDoubleXp}
    counterFreeze={props.counterFreeze}
    counterDoubleTime={props.counterDoubleTime}
    user={props.user}
    darkMode={props.darkMode}
    >
    <CountdownProvider>
        <Head> <title>Move It!</title> </Head>
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
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const{level, xp, cc, counterFreezeC, counterDoubleXPC, counterDoubleTimeC,darkMode, user}= ctx.req.cookies;

  return {
    props: {
      level: Number(level), xp: Number(xp), cc: Number(cc),counterDoubleTime: Number(counterDoubleTimeC),
      counterDoubleXp: Number(counterDoubleXPC) ,counterFreeze: Number(counterFreezeC), user: user, darkMode:Boolean(darkMode),
    }
  }
}
