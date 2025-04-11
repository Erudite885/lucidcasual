import React, { useState } from "react";

import { useFormulaStore } from "../store/formularStore";
import { useSuggestions } from "../api/useSuggestions";
import { Suggestion } from "../types";

const OPERATORS = ["+", "-", "*", "/", "^", "(", ")"];

export const FormulaInput = () => {
  const { tokens, addToken, deleteLastToken } = useFormulaStore();
  const { data: suggestions = [] } = useSuggestions();
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState<Suggestion[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const lastChar = val.slice(-1);

    // If user types an operator
    if (OPERATORS.includes(lastChar)) {
      if (val.length > 1) {
        const beforeOp = val.slice(0, -1).trim();
        if (beforeOp) addToken(beforeOp);
      }
      addToken(lastChar);
      setInput("");
      setFiltered([]);
      return;
    }

    // If user types a space after a suggestion
    if (val.endsWith(" ")) {
      const match = suggestions.find(
        (s) => s.name.toLowerCase() === val.trim().toLowerCase()
      );
      if (match) {
        addToken({ tag: match });
        setInput("");
        setFiltered([]);
        return;
      }
    }

    setInput(val);
    if (val.length > 0) {
      const lowercase = val.toLowerCase();
      setFiltered(
        suggestions.filter((s) => s.name.toLowerCase().includes(lowercase))
      );
    } else {
      setFiltered([]);
    }
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (input === "" && e.key === "Backspace") {
      deleteLastToken();
    }
  };

  const insertSuggestion = (s: Suggestion) => {
    addToken({ tag: s });
    setInput("");
    setFiltered([]);
  };

  return (
    <div className="border p-4 rounded-lg w-full max-w-3xl bg-white shadow-md space-y-2">
      <div className="flex flex-wrap items-center gap-2 min-h-[50px]">
        {tokens.map((token, idx) =>
          typeof token === "string" ? (
            <span key={idx} className="text-xl">
              {token}
            </span>
          ) : (
            <div
              key={idx}
              className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
              {token.tag.name}
              {/* Attached Dropdown */}
              <select className="ml-2 bg-blue-200 text-sm rounded">
                <option>{token.tag.category}</option>
                <option>Details</option>
              </select>
            </div>
          )
        )}
        <input
          className="flex-1 text-xl outline-none"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleBackspace}
          placeholder="Type formula here..."
        />
      </div>

      {filtered.length > 0 && (
        <div className="border mt-1 rounded bg-white shadow-md max-h-48 overflow-auto">
          {filtered.map((s) => (
            <div
              key={s.id}
              onClick={() => insertSuggestion(s)}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
            >
              {s.name}{" "}
              <span className="text-xs text-gray-500">({s.category})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
