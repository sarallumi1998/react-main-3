import React from 'react';
import TodoApp from './TodoApp';
import { useState } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️ Switch to Normal Mode' : '🌙 Switch to Dark Mode'}
      </div>
      <TodoApp darkMode={darkMode} />
    </div>
  );
};

export default App;
