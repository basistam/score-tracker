import React from 'react';
import dateFormat from 'dateformat';
import {
  Row,
  CardItem,
  Icon,
  Col,
  Grid,
  Text,
} from 'native-base';

class GameLog extends React.Component {
  render() {
    const {game} = this.props;

    let homeScore = 0;
    let guestScore = 0;

    const getPlayerIcon = (player) => {
      return player.get('position') === 'defense' ? 'ios-hand' : 'ios-tennisball';
    }

    const getGoalTeam = (event) => {
      return game.get(event.getIn(['type', 'team']) === 'home' ? 'guest' : 'home').get('name');
    }

    return (
      <CardItem>
        <Grid>
          {game.get('events').map((event, i) => {
            if (event.get('type').get('team') === 'home') {
              homeScore++;
            } else {
              guestScore++;
            }
            return <Row key={i}>
              <Col style={style.dateCol}>
                <Text style={style.dateColText}>{dateFormat(event.get('eventDate'), 'HH:MM:ss')}</Text>
              </Col>
              <Col style={style.iconCol}>
                <Text style={style.logItem}>
                  <Icon
                    name={getPlayerIcon(event.get('player'))}
                    style={style.playerIcon}/>{' '}
                </Text>
              </Col>
              <Col size={4}>
                <Text style={style.logItem}><Text style={style.logItemBold}>{event.getIn(['player', 'name'])}</Text> goal to <Text style={style.logItemBold}>{getGoalTeam(event)}</Text></Text>
              </Col>
              <Col style={style.scoreCol}>
                <Text style={style.logItemScore}>{homeScore} - {guestScore}</Text>
              </Col>
            </Row>
          }).reverse()}
        </Grid>
      </CardItem>
    );
  }
}


const greyColor = '#b5b5b5';
const logFontSize = 11;
const logLineHeight = 13;

const style = {
    // Game log
    dateColText: {
      fontSize: logFontSize,
      color: greyColor,
      lineHeight: logLineHeight
    },
    logItem: {
      fontSize: logFontSize,
      lineHeight: logLineHeight
    },
    logItemBold: {
      fontSize: logFontSize,
      fontWeight: 'bold',
      lineHeight: logLineHeight
    },
    logItemScore: {
      fontSize: logFontSize,
      alignSelf: 'center',
      lineHeight: logLineHeight
    },

    playerIcon: {
      fontSize: logFontSize
    },
    // Columns
    dateCol: {
      width: logFontSize * 5
    },
    scoreCol: {
      width: 40
    },
    iconCol: {
      width: logFontSize + 2
    },
}

GameLog.propTypes = {
  game: React.PropTypes.object.isRequired
};
GameLog.defaultProps = {};

export default GameLog;
