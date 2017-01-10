import React from 'react';
import {Text, View, Button, H3} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import TrackButton from './TrackButton';

class Track extends React.Component {
  render() {
    const {team1, team2, onScore, onReset, onSwap, setScore} = this.props;
    return (
      <Grid>
        <Row>
          <Col>
            <View padder>
              <H3 style={{
                alignSelf: 'flex-end'
              }}>{team1.get('name')}</H3>
            </View>
          </Col>
          <Col style={{width: 30}}><Text style={{lineHeight: 40, alignSelf: 'center'}}>vs.</Text></Col>
          <Col>
            <View padder>
              <H3 style={{
                alignSelf: 'flex-start'
              }}>{team2.get('name')}</H3>
            </View>
          </Col>
        </Row>

        <Row>
          <Col>
            <Text style={{
                color: team1.get('points') == setScore ? '#5cb85c' : '#000000',
                alignSelf: 'flex-end',
                fontSize: 60,
                lineHeight: 60}}>
              {team1.get('points')}
            </Text>
          </Col>
          <Col style={{width: 50}}><Text style={{alignSelf: 'center', fontSize: 60, lineHeight: 60}}>-</Text></Col>
            <Col>
              <Text style={{
                  color: team2.get('points') == setScore ? '#5cb85c' : '#000000',
                  alignSelf: 'flex-start',
                  fontSize: 60,
                  lineHeight: 60}}>
                {team2.get('points')}
              </Text>
            </Col>
        </Row>

        <Row>
          <Col>
            <View padder>
              <TrackButton
                player={team1.get('player1')}
                playerId="player1"
                teamId="team1"
                pressAction={onScore}
                />
            </View>
          </Col>
          <Col>
            <View padder>
              <TrackButton
                player={team2.get('player1')}
                playerId="player1"
                teamId="team2"
                pressAction={onScore}/>
            </View>
          </Col>
        </Row>
        <Row>
          <Col>
            <View padder>
              <TrackButton
                player={team1.get('player2')}
                playerId="player2"
                teamId="team1"
                pressAction={onScore}/>
            </View>
          </Col>
          <Col>
            <View padder>
              <TrackButton
                player={team2.get('player2')}
                playerId="player2"
                teamId="team2"
                pressAction={onScore}/>
            </View>
          </Col>
        </Row>

        <Row>
          <Col>
            <View padder>
              <Button block warning onPress={() => onSwap('team1')}>
                Swap positions
              </Button>
            </View>
          </Col>
          <Col>
            <View padder>
              <Button block warning onPress={() => onSwap('team2')}>
                Swap positions
              </Button>
            </View>
          </Col>
        </Row>
        <Row>
            <View padder>
              <Button block danger onPress={() => onReset()}>Reset</Button>
            </View>
        </Row>
      </Grid>
    );
  }
}

Track.propTypes = {
  team1: React.PropTypes.object,
  team2: React.PropTypes.object,
  onScore: React.PropTypes.func,
  onSwap: React.PropTypes.func,
  setScore: React.PropTypes.number,
  onReset: React.PropTypes.func
};
Track.defaultProps = {};

export default Track;
