import React, { createContext } from 'react';

export type AuthContextType = {
    isLoggedIn: boolean; // Define your Theme type
    setisLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserInfoProps | null;
    setuser: React.Dispatch<React.SetStateAction<UserInfoProps | null>>;
  };

export type UserInfoProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  daily_calories: number;
  activity_level: string;
  goal_weight: number;
  dietary_preferences: string;
  fasting_preference: string;
  favorite_foods: string;
  disliked_foods: string;
  protein: number,
  fat:number,
  carbohydrate:number
  [key: string]: any; 
}

export const AuthContext = createContext<AuthContextType | null>(null);

