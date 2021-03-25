import React from 'react';
import {Loading} from 'components';
import firestore from '@react-native-firebase/firestore';

import {
  AuthActions,
  TeamActions,
  WhipRoundActions,
  EventActions,
} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const userId = props.auth.user.id;

  let networkError = false;

  React.useEffect(() => {
    getDataOnce();

    const teamsSubscribe = firestore()
      .collection('Teams')
      .where('users.' + userId + '.accepted', 'in', [true, false])
      .onSnapshot(
        querySnapshot => {
          props.teamsActions.getTeams(
            querySnapshot.docs.map(doc => doc.data()),
          );
        },
        error => {
          console.log('error_getTeamsRealTime:', error);
        },
      );

    return () => {
      teamsSubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (props.teams.length > 0) {
      const whipRoundsSubscribe = firestore()
        .collection('WhipRounds')
        .where(
          'team',
          'in',
          props.teams.map(team => team.id),
        )
        .onSnapshot(
          querySnapshot => {
            props.whipRoundActions.getWhipRounds(
              querySnapshot.docs.map(doc => doc.data()),
            );
          },
          error => {
            console.log('error_getWhipRoundsRealTime:', error);
          },
        );
      return () => {
        whipRoundsSubscribe();
      };
    }
  }, [props.teams]);

  const getDataOnce = async () => {
    await firestore()
      .collection('Teams')
      .where('users.' + userId + '.accepted', 'in', [true, false])
      .get({
        source: 'server',
      })
      .then(
        result => {
          props.teamsActions.getTeams(result.docs.map(doc => doc.data()));
        },
        error => {
          networkError = true;
          console.log('error_getTeams:', error);
        },
      );

    if (props.teams.length > 0) {
      await firestore()
        .collection('WhipRounds')
        .where(
          'team',
          'in',
          props.teams.map(team => team.id),
        )
        .get({source: 'server'})
        .then(
          result => {
            props.whipRoundActions.getWhipRounds(
              result.docs.map(doc => doc.data()),
            );
          },
          error => {
            networkError = true;
            console.log('error_getWhipRounds:', error);
          },
        );

      await firestore()
        .collection('Events')
        .where(
          'team',
          'in',
          props.teams.map(team => team.id),
        )
        .get({source: 'server'})
        .then(
          result => {
            props.eventActions.getEvents(result.docs.map(doc => doc.data()));
          },
          error => {
            networkError = true;
            console.log('error_getEvents:', error);
          },
        );
    }
    if (networkError === false) {
      props.navigation.navigate('TabNav');
    } else {
      props.navigation.navigate('ErrorScreen', {error: 'NETWORK_ERROR'});
    }
  };

  return (
    <>
      <Loading />
    </>
  );
};

const mapStateToProps = state => {
  return {auth: state.auth, teams: state.teams};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
    teamsActions: bindActionCreators(TeamActions, dispatch),
    whipRoundActions: bindActionCreators(WhipRoundActions, dispatch),
    eventActions: bindActionCreators(EventActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
