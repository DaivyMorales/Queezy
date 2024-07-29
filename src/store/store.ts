import { create } from "zustand";
import { simpleQueez } from "@/utils/simpleQueez";


export interface DataQueez {
  question: string;
  options: string[];
  answer: string;
}

export interface QueezStore {
  dataQueez: DataQueez[];
  setDataQueez: (values: DataQueez[]) => void;
}

export const useQueezStore = create<QueezStore>((set) => ({
  dataQueez: simpleQueez,
  setDataQueez: (values: DataQueez[]) => {
    set(() => ({ dataQueez: values }));
  },
}));
