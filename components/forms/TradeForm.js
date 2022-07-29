/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getPublicTeams } from '../../api/teamData';
import { createTrade } from '../../api/tradeData';

const initialState = {
  fromTeam_id: '',
  toTeam_id: '',
  fromCoach_uid: '',
  toCoach_uid: '',
  date: '',
  accepted: false,
};

function TradeForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [teams, setTeams] = useState([]);
  const [userTeams, setUserTeams] = useState([]);
  const [nonUserTeams, setNonUserTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPublicTeams().then((teams) => {
      const filteredUserTeams = teams.filter((team) => team.uid === user.uid);
      const filteredNonUserTeams = teams.filter((team) => team.uid !== user.uid);
      setUserTeams(filteredUserTeams);
      setNonUserTeams(filteredNonUserTeams);
    });
  }, []);

  // this is a given
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.warn(formInput);
    // console.warn(name);
    // console.warn(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();
    const payload = { ...formInput, fromCoach_uid: user.uid, date };
    createTrade(payload).then(() => {
      router.push('/');
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">Trade Teams</h2>

        <FloatingLabel controlId="floatingSelect" label="Your Team">
          <Form.Select
            aria-label="Team"
            name="fromTeam_id"
            onChange={handleChange}
            className="mb-3"
            required
          >
            <option value="">Select Team to Trade</option>
            {
              userTeams.map((team) => (
                <option
                  key={team.firebaseKey}
                  value={team.firebaseKey}
                  selected={obj.fromTeam_id === team.firebaseKey}
                >
                  {team.name}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Other Teams">
          <Form.Select
            aria-label="Team"
            name="toTeam_id"
            onChange={handleChange}
            className="mb-3"
            required
          >
            <option value="">Select Team to Trade For</option>
            {
              nonUserTeams.map((team) => (
                <option
                  key={team.firebaseKey}
                  value={team.firebaseKey}
                  selected={obj.toTeam_id === team.firebaseKey}
                >
                  {team.name}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>

        <Button type="submit">Submit Trade Request</Button>
      </Form>
    </>
  );
}

TradeForm.propTypes = {
  obj: PropTypes.shape({
    fromTeam_id: PropTypes.string,
    toTeam_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TradeForm.defaultProps = {
  obj: initialState,
};

export default TradeForm;
