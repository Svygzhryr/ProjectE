import React, { ChangeEventHandler, useEffect, useState } from "react";
import { WordNotFoundData, Words } from "../types";
import { debounce } from "../utils";

export const App = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [data, setData] = useState<Words | WordNotFoundData | null>(null);

  const fetchWord = async (currentWord: string) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setData(data);
  };

  const debouncedFetch = debounce(fetchWord, 1000);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    debouncedFetch(target.value);
  };

  return (
    <div>
      <input onChange={handleInputChange} />
      {data &&
        !data.title &&
        data.map((foundWord) => {
          return (
            <div>
              <h2>{foundWord.word}</h2>
              <h2>{foundWord.phonetic}</h2>

              {foundWord.meanings.map((meaning) => {
                return meaning.definitions.map((definitions) => {
                  return definitions.definition;
                });
              })}
            </div>
          );
        })}
    </div>
  );
};
