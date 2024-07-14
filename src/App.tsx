import {useState} from 'react';
import words from "./../data/traslations.json"


function App() {
    const [data, _] = useState(words);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [visibleCount, setVisibleCount] = useState(20);

    const filteredData = data
        .filter(item => item.word.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(item => filter === '' || item.partOfSpeech === filter);

    const partsOfSpeech = [...new Set(words.map(item => item.partOfSpeech))].sort((a, b) => a.localeCompare(b));

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 20);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold flex justify-center items-center p-3 mb-3">
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
            <div className="mx-auto w-auto mb-6">
                <div className="flex flex-wrap justify-center">
                    <button
                        className={`flex w-full m-0.5 sm:w-auto p-1 text-xs rounded ${filter === '' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
                        onClick={() => setFilter('')}
                    >
                        All ({words.length.toLocaleString()})
                    </button>
                    {partsOfSpeech.map((part, index) => (
                        <button
                            key={index}
                            className={`flex w-full m-0.5 sm:w-auto p-1 text-xs rounded ${filter === part ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
                            onClick={() => setFilter(part)}
                        >
                            {part.charAt(0).toUpperCase() + part.slice(1)} ({words.filter(word => word.partOfSpeech === part).length.toLocaleString()})
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {filteredData.slice(0, visibleCount).map((item, index) => (
                    <div key={index}
                         className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 rounded overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105">
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl text-blue-700 mr-2">{item.word}</span>
                                <span
                                    className="text-gray-500 text-sm">{item.partOfSpeech.charAt(0).toUpperCase() + item.partOfSpeech.slice(1)}</span>
                            </div>
                            <p className="text-gray-700 text-base mb-3">{item.definition}</p>
                            <p className="text-gray-700 text-base">
                                <svg className="inline-block w-4 h-4 mr-2 fill-current text-gray-500"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm1 14H9v-2h2v2zm0-4H9V5h2v5z"/>
                                </svg>
                                {item.example}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {visibleCount < filteredData.length && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={loadMore}
                        className="px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
