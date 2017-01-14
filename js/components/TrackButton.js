import React from 'react';
import {Button, Icon, Text, View, Badge} from 'native-base';
import Immutable from 'immutable';

class TrackButton extends React.Component {
  render() {
    const {player, score} = this.props;
    return (
      <View padder>
        <Button block style={style.button} {...this.props}>
          <Icon name={player.get('position') === 'offense' ? 'ios-tennisball' : 'ios-hand'}/>
          <Text>
            {player.get('name')}
          </Text>
        </Button>
        <Badge primary style={style.badge}>{score}</Badge>
      </View>
    );
  }
}

const style = {
  button: {
    height: 100
  },
  badge: {
    position: 'absolute',
    right: 5,
    top: 5,
    elevation: 10
  }
};

TrackButton.propTypes = {
  player: React.PropTypes.object.isRequired,
  score: React.PropTypes.number.isRequired
};

TrackButton.defaultProps = {
  player: Immutable.fromJS({
    id: 0,
    position: 'defense',
    name: 'Default player'
  }),
  points: 0
};

export default TrackButton;
