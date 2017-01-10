import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  View,
  List,
  ListItem,
  Icon,
  Grid,
  Col,
  Row,
  H3,
  Button
} from 'native-base';
import dateFormat from 'dateformat';

class Results extends React.Component {
  render() {
    const {data, onDeleteRecord} = this.props;

    return (
      <View>
        <List>
          {data.map((result, i) => {
            const team1 = result.get('team1');
            const team2 = result.get('team2');

            return (
              <ListItem key={i}>
                <Grid>
                  <Row>
                    <Text>{dateFormat(result.get('date'))}</Text>
                  </Row>
                  <Row>
                    <Text style={style.score}>{team1.get('points')} - {team2.get('points')}</Text>
                  </Row>
                  <Row>
                    <H3 style={style.teams}>{team1.get('name')} vs. {team2.get('name')}</H3>
                  </Row>
                  <Row>
                    <Text style={style.teamName}>{team1.get('name')}</Text>
                  </Row>
                  <Row>
                    <Col>
                      <Text>{team1.get('player1').get('name')}</Text>
                    </Col>
                    <Col>
                      <Icon
                        style={style.playerIcon}
                        name={team1.get('player1').get('position') === 'front' ? 'ios-tennisball' : 'ios-hand'}/>
                      </Col>
                    <Col>
                      <Text style={style.playerScore}>{team1.get('player1').get('points')}</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Text>{team1.get('player2').get('name')}</Text>
                    </Col>
                    <Col>
                      <Icon
                        style={style.playerIcon}
                        name={team1.get('player2').get('position') === 'front' ? 'ios-tennisball' : 'ios-hand'}/>
                      </Col>
                    <Col>
                      <Text style={style.playerScore}>{team1.get('player2').get('points')}</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Text style={style.teamName}>{team2.get('name')}</Text>
                  </Row>
                  <Row>
                    <Col>
                      <Text>{team2.get('player1').get('name')}</Text>
                    </Col>
                    <Col>
                      <Icon
                        style={style.playerIcon}
                        name={team2.get('player1').get('position') === 'front' ? 'ios-tennisball' : 'ios-hand'}/>
                      </Col>
                    <Col>
                      <Text style={style.playerScore}>{team2.get('player1').get('points')}</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Text>{team2.get('player2').get('name')}</Text>
                    </Col>
                    <Col>
                      <Icon
                        style={style.playerIcon}
                        name={team2.get('player2').get('position') === 'front' ? 'ios-tennisball' : 'ios-hand'}/>
                      </Col>
                    <Col>
                      <Text style={style.playerScore}>{team2.get('player2').get('points')}</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Text/>
                      <Button danger block onPress={() => onDeleteRecord(i)}>
                        Remove this record
                      </Button>
                    </Col>
                  </Row>
                </Grid>
              </ListItem>
            );
          })}
        </List>
      </View>
    );
  }
}

Results.propTypes = {
  data: React.PropTypes.object,
  onDeleteRecord: React.PropTypes.func
};
Results.defaultProps = {};

const style = StyleSheet.create({
  score: {
    fontSize: 40,
    lineHeight: 60
  },
  teams: {
    lineHeight: 40
  },
  teamName: {
    lineHeight: 25
  },
  playerIcon: {
    alignSelf: 'center',
    fontSize: 15
  },
  playerScore: {
    alignSelf: 'flex-end'
  }
});

export default Results;
