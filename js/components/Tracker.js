import React from 'react';
import {
  StyleSheet
} from 'react-native';
import {
  Text,
  View,
  Button,
  Icon
} from 'native-base';
import {
  Col,
  Row,
  Grid
} from 'react-native-easy-grid';
import TrackButton from './TrackButton';

class Tracker extends React.Component {
  render() {
    const {homeTeam, guestTeam, guestDefensePlayer, guestOffensePlayer, homeDefensePlayer, homeOffensePlayer} = this.props;
    return (
      <Grid>
        <Row>
          <Col>
            <TrackButton danger player={guestOffensePlayer} />
          </Col>
          <Col>
            <TrackButton success player={guestDefensePlayer} />
          </Col>
        </Row>

        <Row>
          <View>
            <Text style={style.homeTeamName}>{guestTeam.get('name')}</Text>
          </View>
        </Row>

        <Row>
          <Col size={2}>
            <Text style={style.homeTeamScore}><Icon name="ios-arrow-down"/> 0</Text>
          </Col>
          <Col size={1}><Text style={style.scoreDividerText}>vs</Text></Col>
          <Col size={2}>
            <Text style={style.guestTeamScore}>0 <Icon name="ios-arrow-up"/></Text>
          </Col>
        </Row>

        <Row>
          <View>
            <Text style={style.guestTeamName}>{homeTeam.get('name')}</Text>
          </View>
        </Row>

        <Row>
          <Col>
            <TrackButton success player={homeDefensePlayer} />
          </Col>
          <Col>
            <TrackButton danger player={homeOffensePlayer} />
          </Col>
        </Row>

        <Row>
          <View padder></View>
        </Row>

        <Row>
          <Col>
          <View padder>
            <Button block warning><Icon name="ios-swap"/>Home</Button>
          </View>
          </Col>
          <Col>
          <View padder>
            <Button block warning><Icon name="ios-swap"/>Guest</Button>
          </View>
          </Col>
        </Row>
        <Row>
          <View padder>
            <Button block><Icon name="ios-undo"/>Undo</Button>
          </View>
        </Row>
      </Grid>
    );
  }
}

Tracker.propTypes = {
  homeTeam: React.PropTypes.object,
  guestTeam: React.PropTypes.object,
  guestDefensePlayer: React.PropTypes.object,
  guestOffensePlayer: React.PropTypes.object,
  homeDefensePlayer: React.PropTypes.object,
  homeOffensePlayer: React.PropTypes.object
};

Tracker.defaultProps = {};

const style = StyleSheet.create({
  guestTeamName: {
    alignSelf: 'center'
  },
  homeTeamName: {
    alignSelf: 'center'
  },
  scoreDividerText: {
    alignSelf: 'center',
    lineHeight: 80
  },
  homeTeamScore: {
    alignSelf: 'flex-end',
    fontSize: 80,
    lineHeight: 80
  },
  guestTeamScore: {
    alignSelf: 'flex-start',
    fontSize: 80,
    lineHeight: 80
  }
});

export default Tracker;
