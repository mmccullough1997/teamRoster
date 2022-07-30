/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getSingleTeam } from '../api/teamData';
import { deletePrivateTrade } from '../api/tradeData';

function TradeCard({ tradeObj, onUpdate }) {
  const [fromTeamName, setFromTeamName] = useState('');
  const [toTeamName, setToTeamName] = useState('');
  const [fromCoachName, setFromCoachName] = useState('');
  const [toCoachName, setToCoachName] = useState('');
  const deleteTheTrade = () => {
    if (window.confirm(`Delete Trade # ${tradeObj.firebaseKey}?`)) {
      deletePrivateTrade(tradeObj.firebaseKey, tradeObj.fromCoach_uid).then(() => onUpdate());
    }
  };

  getSingleTeam(tradeObj.fromTeam_id).then((team) => {
    setFromTeamName(team.name);
    setFromCoachName(team.coach);
  });

  getSingleTeam(tradeObj.toTeam_id).then((team) => {
    setToTeamName(team.name);
    setToCoachName(team.coach);
  });

  return (
    <Card className="tradeCard" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Trade # {tradeObj.firebaseKey}</Card.Title>
        <hr />
        <p className="card-text bold"><b>Your Team:</b> {fromTeamName}</p>
        <p className="card-text bold"><b>To Trade With:</b> {toTeamName}</p>
        <p className="card-text bold"><b>You:</b> {fromCoachName}</p>
        <p className="card-text bold"><b>Them:</b> {toCoachName}</p>
        <p className="card-text bold"><b>Trade Status</b> {tradeObj.accepted === false && tradeObj.rejected === false ? 'Pending' : tradeObj.accepted === true && tradeObj.rejected === false ? 'Accepted' : tradeObj.accepted === false && tradeObj.rejected === true ? 'Rejected' : 'Waiting'}</p>

        {/* <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info"><FontAwesomeIcon icon={faPenToSquare} /></Button>
        </Link> */}

        <Button variant="danger" onClick={deleteTheTrade} className="m-2">
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </Card.Body>
    </Card>
  );
}

TradeCard.propTypes = {
  tradeObj: PropTypes.shape({
    fromCoach_uid: PropTypes.string,
    toCoach_uid: PropTypes.string,
    fromTeam_id: PropTypes.string,
    toTeam_id: PropTypes.string,
    rejected: PropTypes.bool,
    accepted: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TradeCard;
