import { faTrashCan, faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';
import { deleteTeamsPlayers } from '../api/mergedData';

function TeamCard({ teamObj, onUpdate }) {
  const { user } = useAuth();

  const deleteTheTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteTeamsPlayers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teamObj.name}</Card.Title>
        <hr />
        <p className="card-text bold"><b># Players:</b> NEED TO DO</p>
        <p className="card-text bold"><b># Wins:</b> {teamObj.wins}</p>
        <p className="card-text bold"><b># Losses:</b> {teamObj.losses}</p>
        <p className="card-text bold"><b>Coach:</b> {user.displayName}</p>

        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2"><FontAwesomeIcon icon={faEye} /></Button>
        </Link>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info"><FontAwesomeIcon icon={faPenToSquare} /></Button>
        </Link>
        <Button variant="danger" onClick={deleteTheTeam} className="m-2">
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    wins: PropTypes.string,
    losses: PropTypes.string,
    coach: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
