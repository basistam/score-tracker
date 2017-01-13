import Immutable from 'immutable';
import uuid from 'uuid';
import Event from '../constants/Event';

const defaultScore = Immutable.fromJS({
  teams: {
    home: 0,
    guest: 0
  },
  players: [0, 0, 0, 0]
});

/**
 * Loops through game events and extract score object from it
 */
export const getScore = (game) => {
  let score = defaultScore;

  game.get('events').forEach((event) => {
    score = score.updateIn(['teams', event.get('type').get('team')], value => value + 1);
    score = score.updateIn(['players', event.get('player').get('id')], value =>  value + 1);
  });

  return score;
}

export const createEvent = (team, player, type) => Immutable.fromJS({
  id: uuid.v4(),
  team: team.get('id'),
  player: player,
  type: type
});
