import React from "react";
import DeadLetters from "./DeadLetters";
import theWord from "./TheWord"
export const handleGuess = (ltr, word, revealed) => {
    if (word.includes(ltr)) {
        revealed[word.indexOf(ltr)] = ltr;
    } else {
        DeadLetters.push(ltr);
    }
}

