const PREFIX = 'PLAYERS.';

export const SET_NAME     = PREFIX + 'SET_NAME';
export const SET_TEAM     = PREFIX + 'SET_TEAM';
export const SET_POSITION = PREFIX + 'SET_POSITION';

export const setPlayerName = (id, name) => ({
  type: SET_NAME,
  name: name,
  id: id
});

export const setPlayerTeam = (id, team) => ({
  type: SET_TEAM,
  id: id,
  team: team
});

export const setPlayerPosition = (id, position) => ({
  type: SET_POSITION,
  id: id,
  position: position
});
