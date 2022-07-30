import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ players, setFilteredPlayers, onUpdate }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    if (value) {
      const results = players.filter((player) => player.name.toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredPlayers(results);
    } else {
      onUpdate();
    }
  };

  return (
    <>
      <input className="search" placeholder="Search" value={searchInput} onChange={handleChange} />
    </>
  );
}

Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    age: PropTypes.string,
    favorite_food: PropTypes.string,
    fun_fact: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  })).isRequired,
  setFilteredPlayers: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
