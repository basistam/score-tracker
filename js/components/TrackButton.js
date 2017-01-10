import React from 'react';
import {Button, Icon} from 'native-base';

class TrackButton extends React.Component {
  render() {
    const {pressAction, player, playerId, teamId} = this.props;
    const icon = player.get('position') === 'front'
      ? 'ios-tennisball'
      : 'ios-hand';
    return (
      <Button block success={player.get('position') === 'front'} onPress={() => {
        pressAction(teamId, playerId);
      }} style={{
        height: 100
      }}>
        <Icon name={icon}/>
        {player.get('name') + '\n' + player.get('points') + ' points'}
      </Button>
    );
  }
}

TrackButton.propTypes = {
  player: React.PropTypes.object,
  pressAction: React.PropTypes.func,
  playerId: React.PropTypes.string,
  teamId: React.PropTypes.string,
};

TrackButton.defaultProps = {};

export default TrackButton;
