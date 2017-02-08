import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../app/components/App';
import Greetings from '../app/components/Greetings';
import SignupPage from '../users/components/SignupPage';
import LoginPage from '../users/components/LoginPage';
import NewEventPage from '../events/components/NewEventPage';
import HospitalsPage from '../hospitals/components/HospitalsPage';

import requireAuth from '../utils/requireAuth';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Greetings} />
        <Route path="signup" component={SignupPage} />
        <Route path="login" component={LoginPage} />
        <Route path="new-event" component={ requireAuth(NewEventPage) } />
        <Route path="hospitals" component={ HospitalsPage } />
    </Route>
)