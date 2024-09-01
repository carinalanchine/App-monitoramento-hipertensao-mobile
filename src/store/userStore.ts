import { create } from 'zustand'
import { IUser } from '../interfaces/IUser';

type loggedUser = {
  user: IUser
  loggedIn: boolean,
  token: string,

  setLoggedUser: (newUser: IUser, newToken: string) => void;
}

export const useUserStore = create<loggedUser>((set) => ({
  user: null,
  loggedIn: false,
  token: "",

  setLoggedUser: (newUser: IUser, newToken: string) => set(() => ({
    user: newUser,
    loggedIn: true,
    token: newToken,
  }))
}));