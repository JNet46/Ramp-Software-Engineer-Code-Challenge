import React, { useState, useEffect, useRef } from "react";

function Ramp() {
  const [word, setWord] = useState(""); // To store the word fetched from the API
  const [displayedWord, setDisplayedWord] = useState(""); // To display the word with typewriter effect
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track errors
  const indexRef = useRef(0); // Ref to store the index of the current letter being typed

  useEffect(() => {
    //Used inspect for the Step 1 URL to find the hidden URL
    fetch(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/766172"
    ) // URL returning a single word
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Read it as text
      })
      .then((data) => {
        const trimmedData = data.trim(); // Trim any whitespace around the word
        if (trimmedData) {
          setWord(trimmedData); // Save the word in state
          setLoading(false); // Data is loaded
        } else {
          setError("Received empty data from the API");
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // This effect runs once when the component mounts

  useEffect(() => {
    if (word) {
      // Typing effect logic
      const typingInterval = setInterval(() => {
        // Increment the index
        indexRef.current += 1;

        // Update the displayed word with the sliced string
        setDisplayedWord(word.slice(0, indexRef.current));

        // Stop when the word is fully typed
        if (indexRef.current === word.length) {
          clearInterval(typingInterval); // Clear interval once the word is fully typed
        }
      }, 600); // Adjust typing speed here (in ms)

      // Cleanup interval when component unmounts or word changes
      return () => clearInterval(typingInterval);
    }
  }, [word]); // Trigger this effect when the word is set

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Ramp Challenge</h1>
      <p>{displayedWord}</p>
    </div>
  );
}

export default Ramp;
