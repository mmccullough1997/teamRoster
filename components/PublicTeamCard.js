/* eslint-disable react-hooks/exhaustive-deps */
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { getSingleTeamsPlayers } from '../api/teamData';

function PublicTeamCard({ teamObj }) {
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    getSingleTeamsPlayers(teamObj.firebaseKey).then((result) => {
      // console.warn(result);
      setPlayerCount(result);
      // console.warn(playerCount);
    });
  }, []);

  return (
    <Card className="publicTeamCard" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teamObj.name}</Card.Title>
        <hr />
        <p className="card-text bold"><b># Players:</b> {playerCount.length}</p>
        <p className="card-text bold"><b># Wins:</b> {teamObj.wins}</p>
        <p className="card-text bold"><b># Losses:</b> {teamObj.losses}</p>
        <p className="card-text bold"><b>Coach:</b> {teamObj.coach}</p>
        <p className="card-text bold">{teamObj.public ? <FontAwesomeIcon icon={faUnlock} /> : <FontAwesomeIcon icon={faLock} />}</p>
        <Link href={`/team/public/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2"><FontAwesomeIcon icon={faEye} /></Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

PublicTeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    wins: PropTypes.string,
    losses: PropTypes.string,
    coach: PropTypes.string,
    image: PropTypes.string,
    public: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default PublicTeamCard;
