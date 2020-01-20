import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import slugify from 'react-slugify';
import loader from '../images/loader.svg';

const Loader = ({loaded}) => {
  console.log(loaded);
  return (
    <div className="status">{loaded ? '' : <img className="status--loader" src={loader} />}</div>
  );
};

class CoverVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  render() {
    const {loaded} = this.state;
    const {id, title, video} = this.props;

    return (
      <div className={`split split__${slugify(title)}`}>
        <h2 className="split--title">
          <Link to={`projects/${slugify(title)}`}>{title}</Link>
        </h2>

        {video ? (
          <video
            className={`split--video split--video__commercial ${loaded && 'is-loaded'}`}
            playsInline
            autoPlay
            muted
            loop
            src={video}
            onLoadedData={() => this.setState({loaded: true})}
          />
        ) : (
          <div> No video found</div>
        )}

        <Loader loaded={loaded} />
      </div>
    );
  }
}

export default CoverVideo;
