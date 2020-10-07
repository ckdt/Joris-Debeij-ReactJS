import React from 'react';
import {useLocation} from 'react-router-dom';

let scrollPositions = {};

class ManageScrollImpl extends React.Component {
  componentDidMount() {
    try {
      // session storage will throw for a few reasons
      // - user settings
      // - in-cognito/private browsing
      // - who knows...
      let storage = JSON.parse(sessionStorage.getItem('scrollPositions'));
      if (storage) {
        scrollPositions = JSON.parse(storage) || {};
        let {key} = this.props.location;
        if (scrollPositions[key]) {
          window.scrollTo(0, scrollPositions[key]);
        }
      }
    } catch (e) {}

    window.addEventListener('scroll', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listener);
  }

  componentDidUpdate() {
    const {key} = this.props.location;
    if (!scrollPositions[key]) {
      // never seen this location before
      console.log('never seen this location before');
      // setTimeout(() => window.scrollTo(0, 0), 5);
    } else {
      // seen it
      console.log('seen it', scrollPositions[key]);
      window.scrollTo(0, scrollPositions[key]);
      // and again.. in case data has to be loaded 'n shit
      setTimeout(() => window.scrollTo(0, scrollPositions[key]), 300);
    }
    // console.log(JSON.parse(sessionStorage.getItem("scrollPositions")))
  }

  listener = () => {
    scrollPositions[this.props.location.key] = window.scrollY;
    try {
      sessionStorage.setItem(
        'scrollPositions',
        JSON.stringify(scrollPositions)
      );
    } catch (e) {}
    // console.log(JSON.parse(sessionStorage.getItem("scrollPositions")))
  };

  render() {
    return null;
  }
}

export default () => {
  const location = useLocation();
  return <ManageScrollImpl location={location} />;
};
