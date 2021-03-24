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

  React.useEffect(() => {
    getDataOnce();

    const teamsSubscribe = firestore()
      .collection('Teams')
      .where('users.' + userId + '.accepted', 'in', [true, false])
      .onSnapshot(querySnapshot => {
        props.teamsActions.getTeams(querySnapshot.docs.map(doc => doc.data()));
      });

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
        .onSnapshot(querySnapshot => {
          props.whipRoundActions.getWhipRounds(
            querySnapshot.docs.map(doc => doc.data()),
          );
        });
      return () => {
        whipRoundsSubscribe();
      };
    }
  }, [props.teams]);

  const getDataOnce = async () => {
    await firestore()
      .collection('Teams')
      .where('users.' + userId + '.accepted', 'in', [true, false])
      .get()
      .then(querySnapshot => {
        props.teamsActions.getTeams(querySnapshot.docs.map(doc => doc.data()));
      });
    if (props.teams.length > 0) {
      await firestore()
        .collection('WhipRounds')
        .where(
          'team',
          'in',
          props.teams.map(team => team.id),
        )
        .get()
        .then(querySnapshot => {
          props.whipRoundActions.getWhipRounds(
            querySnapshot.docs.map(doc => doc.data()),
          );
        });

      await firestore()
        .collection('Events')
        .where(
          'team',
          'in',
          props.teams.map(team => team.id),
        )
        .get()
        .then(querySnapshot => {
          props.eventActions.getEvents(
            querySnapshot.docs.map(doc => doc.data()),
          );
        });
    }

    props.navigation.navigate('TabNav');
  };

  return <Loading />;
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
