import { create } from 'zustand';
import { UserInterface } from '../../interfaces/user/UserInterface';


interface State {

  //Menu de incio
  isSideMenuOpen: boolean,

  openSideMenu: () => void,
  closeSideMenu: () => void,


  isLoaderHome: boolean,

  finishLoaderHome: () => void,

  //Dashboard admin
  isSidebarDashOpen: boolean,
  openSidebarDash: () => void,
  closeSidebarDash: () => void,
  
  userAutenticado: UserInterface | null;
  setUserAutenticado: (user: UserInterface) => void;


}

export const useUIStore = create<State>((set) => ({
  //Menu Incio
  isSideMenuOpen: false,
  isLoaderHome: false,
  finishLoaderHome: () => set({ isLoaderHome: true }),

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),


  //User autenticado
  userAutenticado: null,
  setUserAutenticado: (user: UserInterface) => set({ userAutenticado: user }),

  //Dashboard Admin
  isSidebarDashOpen: false,
  openSidebarDash: () => set({ isSidebarDashOpen: true }),
  closeSidebarDash: () => set({ isSidebarDashOpen: false }),


}));
