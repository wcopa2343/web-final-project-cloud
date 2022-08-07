import jwt from 'jwt-decode'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
  withRouter,
} from 'react-router-dom'

import { forceLogOut, selectAuthInfo } from '../redux/authSlice'
import { fetchNotifications } from '../redux/notificationsSlice'
import { ModalTypes } from '../redux/types'
import {
  AddConferenceEvents,
  Account,
  ConferenceCalendar,
  ConferenceControl,
  ConferenceCreate,
  ConferenceDetail,
  ConferenceEventsManager,
  ConferenceList,
  ConferenceManager,
  ConferenceUpdate,
  EventsContainer,
  EventsCreate,
  EventsDetail,
  EventsManager,
  EventsUpdate,
  Home,
  NotFound,
  SignIn,
  SignUp,
} from '../screens/index'
import ShowModal from './common/CustomModal'

const Router = (): JSX.Element => {
  function ValidateToken() {
    const history = useHistory()
    const dispatch = useDispatch()
    const authState = useSelector(selectAuthInfo)
    const token = authState.userInfo.token ?? ''
    if (token != '') {
      const tokenDecoded: any = jwt(token.toString())
      const dateNow = new Date()
      const email = authState.userInfo.email
      if (tokenDecoded.exp * 1000 < dateNow.getTime()) {
        ShowModal({
          onSuccess: () => {
            dispatch(forceLogOut())
            history.push('/sign-in')
          },
          type: ModalTypes.SessionExpiredModal,
        })
      }
      dispatch(fetchNotifications({ token, email }))
    }
  }
  ValidateToken()

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/events" component={EventsContainer} />
      <Route exact path="/conferences" component={ConferenceList} />
      <Route exact path="/conferences/create" component={ConferenceCreate} />
      <Route
        exact
        path="/conferences/detail/:id"
        component={ConferenceDetail}
      />
      <Route
        exact
        path="/conferences/update/:id"
        component={ConferenceUpdate}
      />
      <PrivateRoute exact path="/conferences/control/:id">
        <ConferenceControl />
      </PrivateRoute>
      <PrivateRoute exact path="/conferences/addEvents/:id">
        <AddConferenceEvents />
      </PrivateRoute>
      <Route
        exact
        path="/conferences/calendar/:id"
        component={ConferenceCalendar}
      />
      <PrivateRoute exact path="/conferences/ConferenceEventsManager/:id">
        <ConferenceEventsManager />
      </PrivateRoute>
      <PrivateRoute exact path="/events/create">
        <EventsCreate />
      </PrivateRoute>
      <PrivateRoute exact path="/events/eventsManager">
        <EventsManager />
      </PrivateRoute>
      <PrivateRoute exact path="/conferences/conferenceManager">
        <ConferenceManager />
      </PrivateRoute>
      <Route exact path="/events/detail/:id" component={EventsDetail} />
      <Route exact path="/events/update/:id" component={EventsUpdate} />
      <PrivateRoute exact path="/account">
        <Account />
      </PrivateRoute>
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

interface propTypes {
  children: React.ReactNode
  exact: boolean
  path: string
}
function PrivateRoute({ children, ...rest }: propTypes): JSX.Element {
  const userState = useSelector(selectAuthInfo)
  const auth = userState.userInfo.token
  return (
    <Route
      {...rest}
      render={() =>
        auth !== '' ? children : <Redirect to={{ pathname: '/sign-in' }} />
      }
    />
  )
}

export default withRouter(Router)
