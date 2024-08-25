import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await fetch('https://soumika-bajaj-1-3.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });
      const data = await res.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="mt-4">
        {selectedOptions.includes('Alphabets') && (
          <div className="mb-2">
            <strong>Alphabets:</strong> {response.alphabets.join(', ')}
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div className="mb-2">
            <strong>Numbers:</strong> {response.numbers.join(', ')}
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div className="mb-2">
            <strong>Highest lowercase alphabet:</strong> {response.highest_lowercase_alphabet.join(', ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Your Roll Number</h1>
        <input
          type="text"
          value={jsonInput}
          onChange={handleInputChange}
          placeholder="Enter JSON"
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

        {response && (
          <div className="mt-4">
            <select
              multiple={true}
              onChange={handleOptionChange}
              className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
            {renderResponse()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
