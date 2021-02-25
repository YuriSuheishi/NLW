import { createContext, useState, ReactNode } from 'react';
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
}

export function ChallengesProvider({children}){
  const[level, setLevel] = useState(1);
  const[xp, setXp] = useState(0);
  const[challengesCompleted, setChallengesCompleted] = useState(0);
  const[activeChallenge, setActiveChallenge] = useState(null);
  const xpNL = Math.pow((level + 1) * 4,2);

  function levelUp(){
    setLevel(level + 1)
  }

  function newChallenge(){
    console.log('fui chamado!')
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  return(
    <ChallengesContext.Provider 
    value={{level, xp, xpNL, challengesCompleted, levelUp, newChallenge, resetChallenge, activeChallenge }}>
        {children}
    </ChallengesContext.Provider>    
  );
}