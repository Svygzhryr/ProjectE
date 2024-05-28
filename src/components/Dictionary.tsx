import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Words, WordNotFoundResponse } from "../types";
import { Loader } from "./Loader";
import styles from "../styles/dictionary.module.css";
import { generatePlaceholder } from "../utils";

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
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder={generatePlaceholder()}
        onChange={handleInputChange}
      />
      {!isLoading ? (
        (!data && <h3>Type in any word!</h3>) ||
        (data &&
          (Array.isArray(data) ? (
            data.map((foundWord) => {
              return (
                <div className={styles.wordWrapper}>
                  <h3 className={styles.word}>{foundWord.word}</h3>
                  <h3 className={styles.phonetic}>({foundWord.phonetic})</h3>
                  {foundWord.meanings.map((meaning) => {
                    return (
                      <ul className={styles.meaningsWrapper}>
                        <h3 className={styles.partOfSpeech}>
                          {meaning.partOfSpeech}
                        </h3>
                        {meaning.definitions.map((definitions) => {
                          return (
                            <li className={styles.definition}>
                              {definitions.definition}
                            </li>
                          );
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
