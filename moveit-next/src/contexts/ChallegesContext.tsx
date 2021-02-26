import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
export const ChallengesContext = createContext({} as ChallengeContextData);

interface ChallengesProviderProps{
  children: ReactNode;
  level:number;
  challengesCompleted:number;
  xp:number;
  }


interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  xp: number;
  xpNL:number;
  challengesCompleted: number,
  activeChallenge: Challenge ;
  levelUp: () => void;
  newChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  failChallenge:() => void;
  closeLevelUpModal: () => void;
}

export function ChallengesProvider({children, ...rest }:ChallengesProviderProps){
  const[level, setLevel] = useState(rest.level ?? 1);
  const[xp, setXp] = useState(rest.xp ?? 0);
  const[challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const[activeChallenge, setActiveChallenge] = useState(null);
  const[LevelUpModalOpen, setLevelUpModalOpen] = useState(false);
  const xpNL = Math.pow((level + 1) * 4,2);



  useEffect(( )=> {
    Cookies.set('level', String(level));
    Cookies.set('xp', String(xp));
    Cookies.set('cc', String(challengesCompleted));
  },[level, xp, challengesCompleted])

  useEffect(() => {
    Notification.requestPermission();
  },[])

  function levelUp(){
    setLevel(level + 1);
    setLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setLevelUpModalOpen(false);
  }

  function newChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex]

    new Audio('/notification.mp3').play();

    if (Notification.permission == 'granted'){
      new Notification('Novo desafio',{
        body: `Valendo ${challenge.amount}xp!`
      })
    }

    setActiveChallenge(challenge);
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function failChallenge(){
    resetChallenge();
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
    value={{level, xp, xpNL, challengesCompleted, levelUp, newChallenge, resetChallenge, completeChallenge, failChallenge ,closeLevelUpModal, activeChallenge }}>
        {children}
        { LevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>    
  );
}