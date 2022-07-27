import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes, { bool } from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  name: '',
  wins: '',
  losses: '',
  coach: '',
  image: '',
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
    if (obj.firebaseKey) {
      updateTeam(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">

        <Form.Control type="text" placeholder="Enter a Team Name" name="name" value={formInput.name} onChange={handleChange} required />

      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Wins" className="mb-3">

        <Form.Control type="text" placeholder="Enter # of Wins" name="wins" value={formInput.wins} onChange={handleChange} required />

      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Losses" className="mb-3">

        <Form.Control type="text" placeholder="Enter # of Losses" name="losses" value={formInput.losses} onChange={handleChange} required />

      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Image" className="mb-3">

        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />

      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="public"
        name="public"
        label="Public?"
        checked={formInput.public}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          public: e.target.checked,
        }))}
      />

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
    </Form>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    wins: PropTypes.string,
    losses: PropTypes.string,
    image: PropTypes.string,
    public: bool,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
