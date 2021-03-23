import React from 'react';
import {Loading} from 'components';
import firestore from '@react-native-firebase/firestore';

import {AuthActions, TeamActions} from 'actions';
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

  const getDataOnce = async () => {
    await firestore()
      .collection('Teams')
      .where('users.' + userId + '.accepted', 'in', [true, false])
      .get()
      .then(querySnapshot => {
        props.teamsActions.getTeams(querySnapshot.docs.map(doc => doc.data()));
      });

    props.navigation.navigate('TabNav');
  };

  return <Loading />;
};

const mapStateToProps = state => {
  return {auth: state.auth};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
    teamsActions: bindActionCreators(TeamActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
