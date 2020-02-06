// Import Defaults
import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

// Import Prismic
import {Helmet} from 'react-helmet';
import {apiEndpoint} from './prismic-configuration';

// Import Custom Components
import {Home, Projects, Project, NotFound, Page} from './views';

// Set API connection variables
const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
const repoName = repoNameArray[1];

// Component: App
const App = () => {
  return (
    <Fragment>
      {/* Load Prismic JS */}
      <Helmet>
        <script async defer src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`} />
      </Helmet>

      {/* Route Pages / Views */}
      <BrowserRouter>
        <Route
          render={({location}) => {
            const {key} = location;

            return (
              <TransitionGroup component={null}>
                <CSSTransition key={key} timeout={{enter: 500, exit: 500}} classNames="transition">
                  <Switch location={location}>
                    {/* <Redirect exact from="/" to="/" /> */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/page/:uid" component={Page} />
                    <Route exact path="/projects/:uid" component={Projects} />
                    <Route exact path="/project/:uid" component={Project} />
                    <Route exact path="/project/:uid/info" component={Project} />
                    <Route component={NotFound} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
