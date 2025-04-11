import React, { useState } from "react";

import { useFormulaStore } from "../store/formularStore";
import { useSuggestions } from "../api/useSuggestions";
import { Suggestion } from "../types";

const OPERATORS = ["+", "-", "*", "/", "^", "(", ")"];

export const FormulaInput = () => {
  const { evaluateFormula } = useFormulaStore();
  const { tokens, addToken, deleteLastToken } = useFormulaStore();
  const { data: suggestions = [] } = useSuggestions();
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState<Suggestion[]>([]);
  const [result, setResult] = useState<number | string | null>(null);
  const [justSelected, setJustSelected] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const val = e.target.value;
  //     const lastChar = val.slice(-1);

  //     // If user types an operator
  //     if (OPERATORS.includes(lastChar)) {
  //       if (val.length > 1) {
  //         const beforeOp = val.slice(0, -1).trim();
  //         if (beforeOp) addToken(beforeOp);
  //       }
  //       addToken(lastChar);
  //       setInput("");
  //       setFiltered([]);
  //       return;
  //     }

  //     // If user types a space after a suggestion
  //     if (val.endsWith(" ")) {
  //       const match = suggestions.find(
  //         (s) => s.name.toLowerCase() === val.trim().toLowerCase()
  //       );
  //       if (match) {
  //         addToken({ tag: match });
  //         setInput("");
  //         setFiltered([]);
  //         return;
  //       }
  //     }

  //     setInput(val);
  //     if (val.length > 0) {
  //       const lowercase = val.toLowerCase();
  //       setFiltered(
  //         suggestions.filter((s) => s.name.toLowerCase().includes(lowercase))
  //       );
  //     } else {
  //       setFiltered([]);
  //     }
  //   };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setResult(null); // Clear previous result when typing starts
    setJustSelected(false);

    const lastChar = val.slice(-1);

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

    if (val.endsWith(" ")) {
      const match = suggestions.find(
        (s) => s.name.toLowerCase() === val.trim().toLowerCase()
      );
      if (match) {
        insertSuggestion(match);
        return;
      }
    }

    if (val.length > 0) {
      const lowercase = val.toLowerCase();
      const matches = suggestions.filter((s) =>
        s.name.toLowerCase().includes(lowercase)
      );
      setFiltered(matches);
      setHighlightedIndex(0); // reset highlight on new input
    } else {
      setFiltered([]);
    }
  };

  //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (input === "" && e.key === "Backspace") {
  //       deleteLastToken();
  //     }

  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       if (input.trim() !== "") {
  //         // If user is typing a raw value and presses enter, treat as token
  //         addToken(input.trim());
  //         setInput("");
  //       }
  //       if (tokens.length > 0 || justSelected) {
  //         setResult(evaluateFormula());
  //       }
  //       setJustSelected(false);
  //     }
  //   };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (input === "" && e.key === "Backspace") {
      deleteLastToken();
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (filtered.length > 0 && input !== "") {
        insertSuggestion(filtered[highlightedIndex]);
        return;
      }

      if (input.trim() !== "") {
        addToken(input.trim());
        setInput("");
      }

      if (tokens.length > 0 || justSelected) {
        setResult(evaluateFormula());
      }

      setJustSelected(false);
    }
  };

  const insertSuggestion = (s: Suggestion) => {
    addToken({ tag: s });
    setInput("");
    setFiltered([]);
    setJustSelected(true);
  };

  return (
    <>
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
            onKeyDown={handleKeyDown}
            // placeholder="Type formula here..."
          />
        </div>

        {filtered.length > 0 && (
          <div className="border mt-1 rounded bg-white shadow-md max-h-48 overflow-auto">
            {filtered.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => insertSuggestion(s)}
                className={`px-4 py-2 cursor-pointer ${
                  idx === highlightedIndex ? "bg-blue-100" : "hover:bg-blue-50"
                }`}
              >
                {s.name}{" "}
                <span className="text-xs text-gray-500">({s.category})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional button can stay or be removed */}
      {/* <button
        onClick={() => setResult(evaluateFormula())}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Evaluate Formula
      </button> */}

      {result !== null && (
        <div className="mt-2 text-lg font-semibold">
          Result: <span className="text-green-700">{result}</span>
        </div>
      )}
    </>
  );
};
