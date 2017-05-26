import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Containers
import { Full, Simple, EnsureAuthenticated } from './containers/';

// Views
import { Charts, Dashboard, Widgets } from './views/';
import { Login, Register, Page404, Page500 } from './views/Pages/';
import { FontAwesome, SimpleLineIcons } from './views/Icons/';
import { Buttons, Cards, Forms, Modals, SocialButtons, Switches, Tables, Tabs } from './views/Components/';
import { UserList, AppList } from './views/Secure';

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard} />
      <Route path="dashboard" name="Dashboard" component={Dashboard} />
      <Route path="components/" name="Components">
        <IndexRoute component={Buttons} />
        <Route path="buttons" name="Buttons" component={Buttons} />
        <Route path="cards" name="Cards" component={Cards} />
        <Route path="forms" name="Forms" component={Forms} />
        <Route path="modals" name="Modals" component={Modals} />
        <Route path="social-buttons" name="Social Buttons" component={SocialButtons} />
        <Route path="switches" name="Swithces" component={Switches} />
        <Route path="tables" name="Tables" component={Tables} />
        <Route path="tabs" name="Tabs" component={Tabs} />
      </Route>
      <Route path="icons/" name="Icons">
        <IndexRoute component={FontAwesome} />
        <Route path="font-awesome" name="Font Awesome" component={FontAwesome} />
        <Route path="simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons} />
      </Route>
      <Route path="widgets" name="Widgets" component={Widgets} />
      <Route path="charts" name="Charts" component={Charts} />
      <Route component={EnsureAuthenticated}>
        <Route path="secure/" name="Secure">
          <IndexRoute component={UserList} />
          <Route path="userlist" name="User List" component={UserList} />
          <Route path="applist" name="App List" component={AppList} />
        </Route>
      </Route>
    </Route>
    <Route path="pages/" name="Pages" component={Simple}>
      <IndexRoute component={Page404} />
      <Route path="login" name="Login Page" component={Login} />
      <Route path="register" name="Register Page" component={Register} />
      <Route path="404" name="Page 404" component={Page404} />
      <Route path="500" name="Page 500" component={Page500} />
    </Route>
  </Router>
);
