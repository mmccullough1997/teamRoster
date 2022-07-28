/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { getTeamName } from '../api/teamData';

function PublicPlayerCard({ playerObj }) {
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    getTeamName(playerObj.team_id).then((response) => {
      setTeamName(response);
    });
  }, []);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{playerObj.name}</Card.Title>
        <hr />
        <p className="card-text bold"><b>Team:</b> {teamName}</p>
        <p className="card-text bold"><b>Position:</b> {playerObj.position}</p>
        <p className="card-text bold"><b>Age:</b> {playerObj.age}</p>
        <p className="card-text bold"><b>Favorite Food:</b> {playerObj.favorite_food}</p>
        <p className="card-text bold"><b>Fun Fact:</b> {playerObj.fun_fact}</p>
      </Card.Body>
    </Card>
  );
}

PublicPlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    age: PropTypes.string,
    favorite_food: PropTypes.string,
    fun_fact: PropTypes.string,
    image: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default PublicPlayerCard;
