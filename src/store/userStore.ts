import { create } from 'zustand'
import { IUser } from '../interfaces/IUser';
import { getObject } from '../util/storage';

type loggedUser = {
  user: IUser
  token: string,
  signedIn: boolean,

  setLoggedUser: (newUser: IUser, newToken: string) => void;
  setLogout: () => void;
}

export const useUserStore = create<loggedUser>((set) => ({
  user: null,
  token: "",
  signedIn: false,

  setLoggedUser: (newUser: IUser, newToken: string) => set(() => ({
    user: newUser,
    token: newToken,
    signedIn: true,
  })),

  setLogout: () => set(() => ({
    user: null,
    token: "",
    signedIn: false,
  }))
}));