import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom';
import {apiEndpoint} from './prismic-configuration';
import {Home, Projects, Preview, NotFound, Page} from './pages';

/**
 * Main application componenet
 */

const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
const repoName = repoNameArray[1];

class App extends Component {
  render() {
    return (
      <Fragment>
        {/* Load Prismic JS */}
        <Helmet>
          <script
            async
            defer
            src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`}
          />
        </Helmet>

        {/* Route Pages / Views */}
        <BrowserRouter>
          <nav>
            <Link to="/home"> Home </Link>
            <Link to="/page/about"> About </Link>
            <Link to="/projects/commercial"> Commercial </Link>
          </nav>

          <Route
            render={({location}) => {
              const {pathname, key} = location;

              return (
                <TransitionGroup component={null}>
                  <CSSTransition
                    key={location.key}
                    timeout={{enter: 300, exit: 300}}
                    classNames={'fade'}
                  >
                    <Switch location={location}>
                      <Redirect exact from="/" to="/home" />
                      <Route exact path="/home" component={Home} />
                      <Route exact path="/preview" component={Preview} />
                      <Route exact path="/page/:uid" component={Page} />
                      <Route exact path="/projects/:uid" component={Projects} />
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
  }
}

export default App;
