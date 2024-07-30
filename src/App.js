import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);

  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        item: input
      };

      setList([...list, newTodo]);
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodo = list.filter((e) => e.id !== id);
    setList(updatedTodo);
  };

  const enterEditMode = (id, item) => {
    setEditMode(true);
    setEditId(id);
    setEditItem(item);
  };

  const updateTodos = () => {
    const updated = list.map((e) => {
      if (e.id === editId) {
        return { ...e, item: editItem };
      }
      return e;
    });

    setList(updated);
    setEditId(null);
    setEditItem('');
    setEditMode(false);
  };

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.toggle('dark-theme', darkTheme);
  }, [darkTheme]);

  return (
    <div className={`Todo-container ${darkTheme ? 'dark-theme' : ''}`}>
      <h1>Todo List</h1>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`input ${darkTheme ? 'dark-theme' : ''}`}
      />

      {editMode ? (
        <div>
          <input
            type='text'
            value={editItem}
            onChange={(e) => setEditItem(e.target.value)}
            className={`input ${darkTheme ? 'dark-theme' : ''}`}
          />
          <button onClick={updateTodos} className={`button ${darkTheme ? 'dark-theme' : ''}`}>Update</button>
        </div>
      ) : (
        <button onClick={addTodo} className={`button ${darkTheme ? 'dark-theme' : ''}`}>Add</button>
      )}

      <div className='todo-list'>
        <ul>
          {list.map((e) => (
            <li key={e.id} className={`list-item ${darkTheme ? 'dark-theme' : ''}`}>
              {e.item}
              <div>
                <button onClick={() => enterEditMode(e.id, e.item)} className={`button ${darkTheme ? 'dark-theme' : ''}`}>Edit</button>
                <button onClick={() => deleteTodo(e.id)} className={`button delete ${darkTheme ? 'dark-theme' : ''}`}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={toggleDarkTheme} className={`button ${darkTheme ? 'dark-theme' : ''}`}>
          Toggle Dark Theme
        </button>
      </div>
    </div>
  );
};

export default App;