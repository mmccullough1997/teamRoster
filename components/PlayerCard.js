import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deletePlayer } from '../api/playersData';

function PlayerCard({ playerObj, onUpdate }) {
  const deleteThePlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deletePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{playerObj.name}</Card.Title>
        <hr />
        <p className="card-text bold">Position: {playerObj.position}</p>
        <p className="card-text bold">Age: {playerObj.age}</p>
        <p className="card-text bold">Favorite Food: {playerObj.favorite_food}</p>
        <p className="card-text bold">Fun Fact: {playerObj.fun_fact}</p>
        <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThePlayer} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    age: PropTypes.string,
    favorite_food: PropTypes.string,
    fun_fact: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;