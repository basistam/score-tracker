import {connect} from 'react-redux';
import Tracker from '../components/Tracker';

const mapStateToProps = (state) => ({
    setScore: state.get('app').get('setScore'),
    homeTeam: state.get('teams').get('home'),
    guestTeam: state.get('teams').get('guest'),
    players: state.get('players'),
    guestDefensePlayer: state.get('players').find(player => player.get('team') === 'guest' && player.get('position') === 'defense'),
    guestOffensePlayer: state.get('players').find(player => player.get('team') === 'guest' && player.get('position') === 'offense'),
    homeDefensePlayer: state.get('players').find(player => player.get('team') === 'home' && player.get('position') === 'defense'),
    homeOffensePlayer: state.get('players').find(player => player.get('team') === 'home' && player.get('position') === 'offense'),
});

export default connect(mapStateToProps, () => Object.assign({

}))(Tracker);
