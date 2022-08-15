import './App.css';
import { useState, useEffect, ChangeEvent } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import { getData } from './utils/fetch.data';

const URL: string = 'https://jsonplaceholder.typicode.com/users';

export type Monster = {
  name: string;
  id: string;
  email: string;
};

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>(URL);
      setMonsters(users);
    };
    fetchUsers();
  }, []);

  // adding monsters as a dependent causes the filered array to appear on component mount
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster: Monster) => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase());
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [searchField, monsters]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  return (
    <div className="App">
      <h1>Monsters Rolodex </h1>
      <SearchBox
        placeholder="search monsters"
        onChangeHandler={onSearchChange}
        className="search"
      />
      <br />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
