import React from 'react';
import {Button, Icon, Text, View, Badge} from 'native-base';
import {StyleSheet} from 'react-native';
import Immutable from 'immutable';

class TrackButton extends React.Component {
  render() {
    const {player} = this.props;
    return (
      <View padder>
        <Button block style={style.button} {...this.props}>
          <Icon name={player.get('position') === 'offense' ? 'ios-tennisball' : 'ios-hand'}/>
          <Text>
            {player.get('name')}
          </Text>
        </Button>
        <Badge primary style={{
          position: 'absolute',
          right: 5,
          top: 5
        }}>0</Badge>
      </View>
    );
  }
}

const style = StyleSheet.create({
  button: {
    height: 100
  }
});

TrackButton.propTypes = {
  player: React.PropTypes.object
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
