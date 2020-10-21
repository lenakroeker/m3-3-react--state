import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import words from "../data/words.json";
// import GameOverModal from "./GameOverModal";
import { colors, contentWidth } from "./GlobalStyles";


const initialGameState = { started: false, over: false, win: false };

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "" });
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);

  const handleStart = () => {
    setGame({ ...game, started: !game.started });

    if (word.str === "") {
      getNewWord();
    }
  };

  const handleReset = () => {
    setWrongGuesses([]);
    setUsedLetters([]);
    getNewWord();
  }

  const handleGuess = (ltr) => {
    let matchIndexes = [];
    if (word.str.includes(ltr)) {
      for (let i = 0; i < word.str.length; i++) {
        if (word.str[i] === ltr) {
          matchIndexes.push(i)
        }
      }
      for (let j = 0; j < word.revealed.length; j++) {
        if (matchIndexes.includes(j)) {
          word.revealed[j] = ltr
        }
      }
    } else {
      setWrongGuesses([...wrongGuesses, ltr]);
    }
    setUsedLetters([...usedLetters, ltr])

    if (wrongGuesses.length === 10) {
      handleGameEnd(false);
    } else if (!word.revealed.includes("")) {
      handleGameEnd(true);
    }
  }

  const handleGameEnd = (win) => {
    setGame({ ...game, over: true });
    setGame({ ...game, win: win });
    if (!win) {
      setGame({ ...game, started: !game.started });
    }
    handleReset();
    alert(`Game Over! You ${win ? "win!" : "lose"}`);
    btnLabel(true);
  }

  const getNewWord = () => {
    let newWord = words[Math.floor(Math.random() * words.length)];
    setWord({ revealed: new Array(newWord.length).fill(""), str: newWord });
  }

  const btnLabel = (strt) => {
    let label = '';
    if (word.str === "") {
      label = "start";
    } else if (word.str !== "" && !game.started) {
      label = "continue";
    } else if (word.str !== "" && game.started) {
      label = "pause";
    }
    return label;
  }


  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{btnLabel()}</Button>
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {game.started && (
        <>
          <Container>
            <Deadman />
            <RightColumn>
              <DeadLetters guess={wrongGuesses} />
              <TheWord word={word} />
            </RightColumn>
          </Container>
          <Keyboard usedLetters={usedLetters} word={word} wrongGuesses={wrongGuesses}
            handler={handleGuess}
          />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
