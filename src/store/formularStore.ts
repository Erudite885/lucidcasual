import { create } from "zustand";
import { Suggestion } from "../types";

type Token = string | { tag: Suggestion };

type FormulaState = {
  tokens: Token[];
  addToken: (token: Token) => void;
  deleteLastToken: () => void;
  clear: () => void;
  evaluateFormula: () => number | string;
};

export const useFormulaStore = create<FormulaState>((set, get) => ({
  tokens: [],
  addToken: (token) => set((state) => ({ tokens: [...state.tokens, token] })),
  deleteLastToken: () =>
    set((state) => ({
      tokens: state.tokens.slice(0, -1),
    })),
  clear: () => set({ tokens: [] }),
  evaluateFormula: () => {
    const formula = get()
      .tokens.map((t) => {
        if (typeof t === "string") return t;
        const value = t.tag.value;
        return typeof value === "number" || !isNaN(Number(value)) ? value : "0";
      })
      .join(" ");
    try {
      // Evaluate formula safely (ideally use a parser in production)
      // eslint-disable-next-line no-eval
      const result = eval(formula);
      return result;
    } catch (e) {
      return "Invalid expression";
    }
  },
}));

