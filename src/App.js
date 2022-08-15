import './App.css';
import React, { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [title, setTitle] = useState('');
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  // adding monsters as a dependent causes the filered array to appear on component mount
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase());
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [searchField, monsters]);


  const onSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };


  return (
    <div className="App">
      <h1>{title}</h1>
      <SearchBox
        placeholder="search monsters"
        onChangeHandler={onSearchChange}
        className="search"
      />
      <br />
      <SearchBox
        placeholder="search title"
        onChangeHandler={onTitleChange}
        className="search"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
