// Import Defaults
import React, {Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

// Import Prismic
import {Helmet} from 'react-helmet';
import {apiEndpoint} from './prismic-configuration';

// Import Custom Components
import {Home, Projects, Project, NotFound, Page} from './views';
import CursorProvider from './components/Cursor';
import ManageScroll from './components/ManageScroll';
import ComingFrom from './components/ComingFrom';

// Set API connection variables
const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
const repoName = repoNameArray[1];

// Component: App
const App = () => {
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
      <CursorProvider>
        <ComingFrom>
          <BrowserRouter>
            <ManageScroll />
            <Route
              render={({location}) => {
                const {key} = location;

                return (
                  <TransitionGroup component={null}>
                    <CSSTransition
                      key={key}
                      in={true}
                      appear={true}
                      timeout={500}
                      classNames="transition"
                    >
                      <div className="transition--wrapper">
                        <Switch location={location}>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/page/:uid" component={Page} />
                          <Route
                            exact
                            path="/projects/:uid"
                            component={Projects}
                          />
                          <Route
                            exact
                            path="/project/:uid"
                            component={Project}
                          />
                          <Route
                            exact
                            path="/project/:uid/info"
                            component={Project}
                          />
                          <Route component={NotFound} />
                        </Switch>
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                );
              }}
            />
          </BrowserRouter>
        </ComingFrom>
      </CursorProvider>
    </Fragment>
  );
};

export default App;
