import {useCallback, useEffect, useState} from "react";
import words from "./data/combined.json";

function App() {
  const [data, setData] = useState(words);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(21);
  const [loading, setLoading] = useState(false);
  // const [showTranslations, setShowTranslations] = useState(false);
  const [showContent, setShowContent] = useState(false);


  const filteredData = data
    .filter((item) =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => filter === "" || item.partOfSpeech === filter);

  const partsOfSpeech = [
    ...new Set(words.map((item) => item.partOfSpeech)),
  ].sort((a, b) => a.localeCompare(b));

  const loadMore = useCallback(() => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount((prevCount) => prevCount + 21);
        setLoading(false);
      }, Math.random() * 1000 + 500);
    }
  }, [loading]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    loadMore();
  }, [loadMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-center p-3 mb-3">
        {data.length.toLocaleString()} Commonly used Finnish Words
      </h1>
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          className="w-full p-3 rounded mb-4 shadow-md"
          placeholder="Search for a word..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex py-auto items-center justify-evenly w-full mb-2  max-w-2xl mx-auto">
        <label className="relative inline-flex items-center cursor-pointer mb-2">
          <input
            type="checkbox"

            checked={showContent}
            onChange={() => {
              setShowContent(!showContent)
              setFilter("")
            }}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Parts of Speech
          </span>
        </label>
        {/*<label className="relative inline-flex items-center cursor-pointer mb-2">*/}
        {/*  <input*/}
        {/*    type="checkbox"*/}
        {/*    checked={showTranslations}*/}
        {/*    onChange={() => setShowTranslations(!showTranslations)}*/}
        {/*    className="sr-only peer"*/}
        {/*  />*/}
        {/*  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>*/}
        {/*  <span className="ml-3 text-sm font-medium text-gray-900 ">*/}
        {/*    Parts of Speech*/}
        {/*  </span>*/}
        {/*</label>*/}
      </div>

      {showContent && (
        <div className="mx-auto max-w-screen-xl mb-6">
          <div className="flex flex-wrap justify-center">
            <button
              className={`flex w-full m-0.5 sm:w-auto p-1 text-xs rounded ${
                filter === ""
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border border-blue-500"
              }`}
              onClick={() => setFilter("")}
            >
              All ({words.length.toLocaleString()})
            </button>
            {partsOfSpeech.map((part, index) => (
              <button
                key={index}
                className={`flex w-full m-0.5 sm:w-auto p-1 text-xs rounded ${
                  filter === part
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 border border-blue-500"
                }`}
                onClick={() => setFilter(part)}
              >
                {part.charAt(0).toUpperCase() + part.slice(1)} (
                {words
                  .filter((word) => word.partOfSpeech === part)
                  .length.toLocaleString()}
                )
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {filteredData.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 mb-4"
          >
            <div className="h-full rounded overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 flex flex-col">
              <div className="px-4 py-3 flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg text-blue-700 font-semibold">
                    {item.word}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {item.partOfSpeech.charAt(0).toUpperCase() +
                      item.partOfSpeech.slice(1)}
                  </span>
                </div>
                <p className="text-gray-700 text-base mb-4">
                  {item.definition}
                </p>
                <div className="text-gray-700 italic text-base mb-2 flex items-start">
                  <svg
                    className="inline-block w-4 h-4 mr-2 fill-current text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm1 14H9v-2h2v2zm0-4H9V5h2v5z" />
                  </svg>
                  <span>
                    {item.example
                      .slice(0, item.example.indexOf("("))
                      .split(" ")
                      .map((word, i) => (
                        <span
                          key={i}
                          className={`text-base cursor-pointer ${
                            word
                              .toLowerCase()
                              .includes(item.word.toLowerCase().substring(0, 3))
                              ? "text-blue-500"
                              : ""
                          }`}
                        >
                          {word}{" "}
                        </span>
                      ))}
                  </span>
                </div>
                <hr className="border border-gray-200 rounded w-1/5 m-1" />
                <div className="text-gray-700 italic text-base flex items-center">
                  <svg
                    className="inline-block w-4 h-4 mr-2 fill-current text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 12.5c0-.828-.672-1.5-1.5-1.5S5 11.672 5 12.5 5.672 14 6.5 14s1.5-.672 1.5-1.5zM3 2v2h7V2H3zm0 3v2h5V5H3zm0 3v2h3V8H3zm7 1H8v1h2V9z" />
                  </svg>
                  {item.example.slice(
                    item.example.indexOf("(") + 1,
                    item.example.indexOf(")")
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center mt-6">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
}

export default App;
