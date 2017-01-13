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

export const swapPlayers = (player1, player2) => (dispatch) => {
  const player1position = player1.get('position');
  dispatch(setPlayerPosition(player1.get('id'), player2.get('position')));
  dispatch(setPlayerPosition(player2.get('id'), player1position));
}
