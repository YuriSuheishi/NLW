import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
export const ChallengesContext = createContext({} as ChallengeContextData);

interface ChallengesProviderProps{
  children: ReactNode;
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
}

export function ChallengesProvider({children}){
  const[level, setLevel] = useState(1);
  const[xp, setXp] = useState(0);
  const[challengesCompleted, setChallengesCompleted] = useState(0);
  const[activeChallenge, setActiveChallenge] = useState(null);
  const xpNL = Math.pow((level + 1) * 4,2);

  useEffect(() => {
    Notification.requestPermission();
  },[])

  function levelUp(){
    setLevel(level + 1)
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
    value={{level, xp, xpNL, challengesCompleted, levelUp, newChallenge, resetChallenge, completeChallenge, failChallenge , activeChallenge }}>
        {children}
    </ChallengesContext.Provider>    
  );
}