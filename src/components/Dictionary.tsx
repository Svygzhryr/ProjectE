import React, { ChangeEventHandler, useEffect, useState } from "react";
import { WordNotFoundResponse, Words } from "../types";
import { Loader } from "./Loader";

export const Dictionary = () => {
  const [data, setData] = useState<Words | WordNotFoundResponse | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchWord = async (currentWord: string | null) => {
    if (!currentWord) return;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    setData(data);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsLoading(true);
    const target = e.target;
    setInputValue(target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      fetchWord(inputValue);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, 500]);

  return (
    <div>
      <input placeholder={"Nightingale"} onChange={handleInputChange} />
      {!isLoading ? (
        (!data && <h3>Type in any word!</h3>) ||
        (data &&
          (Array.isArray(data) ? (
            data.map((foundWord) => {
              return (
                <div>
                  <h3>{foundWord.word}</h3>
                  <h3>({foundWord.phonetic})</h3>
                  {foundWord.meanings.map((meaning) => {
                    return (
                      <ul>
                        <h3>{meaning.partOfSpeech}</h3>
                        {meaning.definitions.map((definitions) => {
                          return <li>{definitions.definition}</li>;
                        })}
                      </ul>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <h3>Word not found</h3>
          )))
      ) : (
        <Loader />
      )}
    </div>
  );
};
