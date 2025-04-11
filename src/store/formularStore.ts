import { create } from "zustand";
import { Suggestion } from "../types";

type Token = string | { tag: Suggestion };

type FormulaState = {
  tokens: Token[];
  addToken: (token: Token) => void;
  deleteLastToken: () => void;
  clear: () => void;
};

export const useFormulaStore = create<FormulaState>((set) => ({
  tokens: [],
  addToken: (token) => set((state) => ({ tokens: [...state.tokens, token] })),
  deleteLastToken: () =>
    set((state) => ({
      tokens: state.tokens.slice(0, -1),
    })),
  clear: () => set({ tokens: [] }),
}));
