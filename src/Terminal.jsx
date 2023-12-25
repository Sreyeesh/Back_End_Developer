// src/Terminal.jsx
import React, { useState } from 'react';
import './Terminal.css'; // Ensure this path points to your Terminal CSS
import processCommand from './commands'; // Ensure this path points to your commands.js

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([{ response: "Welcome to My Terminal Portfolio. Type 'help' to see available commands." }]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleInput = (event) => {
    const value = event.target.value;
    setInput(value);

    if (event.key === 'Enter' && value.trim()) {
      const trimmedCommand = value.trim();
      setHistory([...history, trimmedCommand]); // Add to history regardless of command
      setHistoryIndex(history.length); // Update index to the new command

      if (trimmedCommand.toLowerCase() === 'clear') {
        setOutput([]); // Clear the screen for the 'clear' command
      } else {
        const commandOutput = processCommand(trimmedCommand);
        setOutput([...output, { command: `> ${trimmedCommand}`, response: commandOutput }]);
      }
      setInput(''); // Clear the input after processing
    }
  };

  const handleKeyDown = (event) => {
    // Navigate command history with arrow keys
    if (event.key === 'ArrowUp') {
      const newIndex = Math.max(historyIndex - 1, 0);
      setInput(history[newIndex] || '');
      setHistoryIndex(newIndex);
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      const newIndex = Math.min(historyIndex + 1, history.length);
      setInput(history[newIndex] || '');
      setHistoryIndex(newIndex);
      event.preventDefault();
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {output.map((entry, index) => (
          <div key={index}>
            {entry.command && <div className="command-line">{entry.command}</div>}
            <div>{entry.response}</div>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="terminal-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleInput}
        placeholder="Type a command..."
        autoFocus
      />
    </div>
  );
};

export default Terminal;
