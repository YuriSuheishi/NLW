import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { darkMode } from '../pages/api/theme';
export const ChallengesContext = createContext({} as ChallengeContextData);

interface ChallengesProviderProps{
  children: ReactNode;
  level:number;
  challengesCompleted:number;
  xp:number;
  counterDoubleXp: number;
  counterFreeze: number;
  counterDoubleTime: number;
  darkMode:boolean;
  user:string;
  }


interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {

  user: string;
  level: number;
  xp: number;
  xpNL:number;
  challengesCompleted: number,
  activeChallenge: Challenge ;
  darkMode: boolean;

  levelUp: () => void;
  newChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  failChallenge:() => void;
  closeLevelUpModal: () => void;
  trocaMode: () => void;

  doubleXpOn: () => void;
  doubleXP: boolean;
  counterDoubleXp:number;
  counterFreeze: number;
  counterDoubleTime: number;
  darkModeAux: boolean;

  useFreeze:()=> void;
  useDoubleTime:()=> void;
  useDoubleXp:()=> void;
}

export function ChallengesProvider({children, ...rest }:ChallengesProviderProps){
  const user = (rest.user ?? null);
  const[darkMode, setDarkMode] = useState(rest.darkMode ?? true);
  const[level, setLevel] = useState(rest.level ?? 1);
  const[xp, setXp] = useState(rest.xp ?? 0);
  const[challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const[activeChallenge, setActiveChallenge] = useState(null);
  const[LevelUpModalOpen, setLevelUpModalOpen] = useState(false);
  const[doubleXP, setDoubleXP] = useState(false);
  const[counterDoubleTime, setCounterDoubleTime] = useState(rest.counterDoubleTime ?? 0);
  const[counterFreeze, setCounterFreeze] = useState(rest.counterFreeze ?? 0);
  const[counterDoubleXp, setCounterDoubleXp] = useState(rest.counterDoubleXp ?? 0);
  const[darkModeAux, setDarkModeAux] = useState(darkMode);

  const xpNL = Math.pow((level + 1) * 4,2);

  function trocaMode(){
    if(darkMode){
      setDarkMode(false);
    }
    else{
      setDarkMode(true);
    }
    setDarkModeAux(darkMode);
  }

  function useFreeze(){
    setCounterFreeze(counterFreeze - 1);
  }

  function useDoubleXp(){
    setCounterDoubleXp(counterDoubleXp -1);
  }

  function useDoubleTime(){
    setCounterDoubleTime(counterDoubleTime - 1);
  }

  useEffect(( )=> {
    Cookies.set('level', String(level));
    Cookies.set('xp', String(xp));
    Cookies.set('cc', String(challengesCompleted));
    Cookies.set('counterFreezeC', String(counterFreeze));
    Cookies.set('counterDoubleXPC', String(counterDoubleXp));
    Cookies.set('counterDoubleTimeC', String(counterDoubleTime));
    Cookies.set('darkMode', String(darkMode));
  },[level, xp, challengesCompleted, counterDoubleTime,counterFreeze,counterDoubleXp, darkMode])

  useEffect(() => {
    Notification.requestPermission();
  },[])

  function levelUp(){
    setCounterDoubleTime(counterDoubleTime + 1);
    setCounterDoubleXp(counterDoubleXp + 1);
    setCounterFreeze(counterFreeze + 1);

    setLevel(level + 1);
    setLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setLevelUpModalOpen(false);
  }

  function newChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    new Audio('/notification.mp3').play();

    if (Notification.permission == 'granted'){
      new Notification('Novo desafio',{
        body: `Valendo ${challenge.amount}xp!`
      })
    }

    setActiveChallenge(challenge);
  }

  function resetChallenge(){
    setDoubleXP(false);
    setActiveChallenge(null);
  }

  function failChallenge(){
    resetChallenge();
  }

  function doubleXpOn(){
    if(counterDoubleXp >0){
      if(doubleXP){
        console.log('doubleXp ja foi ativado')
      }
      else{
        setDoubleXP(true);
        useDoubleXp();
      }
    }
    else{
      console.log('acabou o double xp');
    }
  }

  function completeChallenge(){
    const xpTotal = xp + activeChallenge.amount;
    setChallengesCompleted(challengesCompleted + 1);
    resetChallenge();
    if (xpTotal >= xpNL){
      levelUp();
      setXp(xpTotal - xpNL);
    }
    else{
      setXp(xpTotal);
    }
  }

  return(
    <ChallengesContext.Provider 
    value={{level, xp, xpNL, challengesCompleted,doubleXP,counterDoubleXp,counterFreeze,darkModeAux,
      counterDoubleTime, user, doubleXpOn, levelUp, newChallenge, resetChallenge, completeChallenge, 
      failChallenge ,closeLevelUpModal, activeChallenge, useFreeze, useDoubleTime, useDoubleXp,trocaMode, darkMode }}>
        {children}
        { LevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>    
  );
}

export default darkMode;