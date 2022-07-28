import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPrivatePlayers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getPublicPlayers = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/players/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createPlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/players.json`, playerObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/players/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updatePlayers = (playerObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/players/${playerObj.firebaseKey}.json`, playerObj)
    .then(resolve)
    .catch(reject);
});

export {
  getPrivatePlayers,
  getPublicPlayers,
  deletePlayer,
  getSinglePlayer,
  createPlayer,
  updatePlayers,
};
