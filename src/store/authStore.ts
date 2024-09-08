import { create } from 'zustand'
import { IUser } from '../interfaces/IUser';

type authStoreProps = {
  user: IUser,
  accessToken: string,

  setSignIn: (newUser: IUser, token: string) => void;
  setSignOut: () => void;
}

export const useAuthStore = create<authStoreProps>((set) => ({
  user: null,
  accessToken: "",

  setSignIn: (newUser: IUser, token: string) => set(() => ({
    user: newUser,
    accessToken: token
  })),

  setSignOut: () => set(() => ({
    user: null,
    accessToken: "",
  }))
}));