import words from "./translationsV1.json";


const addIdToEachWord = wordss => {
   return wordss.map((word, i) => {
      return {
          ...word,
          id: Math.abs(Date.now() + Date.now() + Math.random() + i + 1,),
      }
     
   }) 
};


 const data = addIdToEachWord(words)