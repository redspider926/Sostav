import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AndroidBackHandler} from 'react-navigation-backhandler';
import {BackHandler} from 'react-native';

import ComponentTestScreen from 'screens/ComponentTest';
import AuthenticationScreen from 'screens/Authentication';
import VerificationScreen from 'screens/Verification';
import RegisterScreen from 'screens/Register';
import CreateTeamScreen from 'screens/CreateTeam';
import SelectRoleScreen from 'screens/SelectRole';
import SelectTypeScreen from 'screens/SelectType';
import CreateEventScreen from 'screens/CreateEvent';
import SelectOpponentScreen from 'screens/SelectOpponent';
import MessageScreen from 'screens/Message';
import ViewMyProfileScreen from 'screens/ViewMyProfile';
import EditMyProfileScreen from 'screens/EditMyProfile';
import TeamEventsScreen from 'screens/TeamEvents';
import CreateWhipRoundScreen from 'screens/CreateWhipRound';
import TeamWhipRoundsScreen from 'screens/TeamWhipRounds';
import OneWhipRoundScreen from 'screens/OneWhipRound';
import EditWhipRoundScreen from 'screens/EditWhipRound';
import CreateOpponentScreen from 'screens/CreateOpponent';
import AfterCreateOpponentScreen from 'screens/AfterCreateOpponent';
import OneEventScreen from 'screens/OneEvent';
import MyTeamScreen from 'screens/MyTeam';
import AddTeammateScreen from 'screens/AddTeammate';
import AddTeammateCodeScreen from 'screens/AddTeammateCode';
import MyTeammatesScreen from 'screens/MyTeammates';
import MyTeammateProfileScreen from 'screens/MyTeammateProfile';
import StatisticsScreen from 'screens/Statistics';
import StatisticWithOneTeamScreen from 'screens/StatisticWithOneTeam';
import OneStatisticScreen from 'screens/OneStatistic';
import NotificationSettingsScreen from 'screens/NotificationSettings';

//tab start
import TeamTabScreen from 'screens/TeamTab';
import ProfileTabScreen from 'screens/ProfileTab';
import WhipRoundScreen from 'screens/WhipRoundTab';
import EventTabScreen from 'screens/EventTab';
import ChatTabScreen from 'screens/ChatTab';
//tab end

import {Image} from 'components';

import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = props => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthenticationScreen">
          <Stack.Screen
            name="ComponentTestScreen"
            component={ComponentTestScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="AuthenticationScreen"
            component={AuthenticationScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="VerificationScreen"
            component={VerificationScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="CreateTeamScreen"
            component={CreateTeamScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="SelectRoleScreen"
            component={SelectRoleScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="SelectTypeScreen"
            component={SelectTypeScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="CreateEventScreen"
            component={CreateEventScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="SelectOpponentScreen"
            component={SelectOpponentScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="MessageScreen"
            component={MessageScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="ViewMyProfileScreen"
            component={ViewMyProfileScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="EditMyProfileScreen"
            component={EditMyProfileScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="NotificationSettingsScreen"
            component={NotificationSettingsScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="TeamEventsScreen"
            component={TeamEventsScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="CreateWhipRoundScreen"
            component={CreateWhipRoundScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="TeamWhipRoundsScreen"
            component={TeamWhipRoundsScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="OneWhipRoundScreen"
            component={OneWhipRoundScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="EditWhipRoundScreen"
            component={EditWhipRoundScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="CreateOpponentScreen"
            component={CreateOpponentScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="AfterCreateOpponentScreen"
            component={AfterCreateOpponentScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="OneEventScreen"
            component={OneEventScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="MyTeamScreen"
            component={MyTeamScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="AddTeammateScreen"
            component={AddTeammateScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="AddTeammateCodeScreen"
            component={AddTeammateCodeScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="MyTeammatesScreen"
            component={MyTeammatesScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="MyTeammateProfileScreen"
            component={MyTeammateProfileScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="StatisticsScreen"
            component={StatisticsScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="StatisticWithOneTeamScreen"
            component={StatisticWithOneTeamScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="OneStatisticScreen"
            component={OneStatisticScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="TabNav"
            component={TabNav}
            options={{headerShown: false, gestureEnabled: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

function TabNav() {
  return (
    <AndroidBackHandler
      onBackPress={() => {
        BackHandler.exitApp();
        return true;
      }}>
      <Tab.Navigator
        initialRouteName={'TeamTabScreen'}
        backBehavior={'none'}
        tabBarOptions={{
          style: {
            backgroundColor: colors.white,
            height: sizes.dimension.tab.height,
            // paddingTop: 20,
          },
        }}>
        <Tab.Screen
          name="WhipRoundScreen"
          component={WhipRoundScreen}
          options={{
            title: '',
            tabBarIcon: ({focused, iconColor, iconSize}) => (
              <Image
                tintColor={focused ? colors.main : colors.darkGray}
                source={images.icons.payment}
                width={sizes.dimension.tab.iconSize}
                height={sizes.dimension.tab.iconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="EventTabScreen"
          component={EventTabScreen}
          options={{
            title: '',
            tabBarIcon: ({focused, iconColor, iconSize}) => (
              <Image
                tintColor={focused ? colors.main : colors.darkGray}
                source={images.icons.event}
                width={sizes.dimension.tab.iconSize}
                height={sizes.dimension.tab.iconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TeamTabScreen"
          component={TeamTabScreen}
          options={{
            title: '',
            tabBarIcon: ({focused, iconColor, iconSize}) => (
              <Image
                tintColor={focused ? colors.main : colors.darkGray}
                source={images.icons.team}
                width={sizes.dimension.tab.iconSize}
                height={sizes.dimension.tab.iconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ChatTabScreen"
          component={ChatTabScreen}
          options={{
            title: '',
            tabBarIcon: ({focused, iconColor, iconSize}) => (
              <Image
                tintColor={focused ? colors.main : colors.darkGray}
                source={images.icons.chat}
                width={sizes.dimension.tab.iconSize}
                height={sizes.dimension.tab.iconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTabScreen"
          component={ProfileTabScreen}
          options={{
            title: '',
            tabBarIcon: ({focused, iconColor, iconSize}) => (
              <Image
                tintColor={focused ? colors.main : colors.darkGray}
                source={images.icons.profile}
                width={sizes.dimension.tab.iconSize}
                height={sizes.dimension.tab.iconSize}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </AndroidBackHandler>
  );
}

export default Navigation;
