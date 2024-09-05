import { create } from 'zustand'
import { IUser } from '../interfaces/IUser';

type loggedUser = {
  user: IUser,
  signedIn: boolean,
  token: string,

  setLogin: (newUser: IUser, token: string) => void;
  setLogout: () => void;
}

export const useUserStore = create<loggedUser>((set) => ({
  user: null,
  signedIn: false,
  token: "",

  setLogin: (newUser: IUser, token: string) => set(() => ({
    user: newUser,
    signedIn: true,
    token: token
  })),

  setLogout: () => set(() => ({
    user: null,
    signedIn: false,
    token: "",
  }))
}));