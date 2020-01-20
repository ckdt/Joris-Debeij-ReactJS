import React, {Component} from 'react';
import CoverVideo from '../components/CoverVideo';
import DefaultLayout from '../components/DefaultLayout';

/* Data */
import coversData from '../data/covers';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      covers: []
    };
  }

  componentDidMount() {
    this.setState({
      covers: coversData
    });
  }

  render() {
    const {covers} = this.state;
    return (
      <DefaultLayout>
        <section className="cover">
          {covers.map(cover => (
            <CoverVideo {...cover} />
          ))}
        </section>
      </DefaultLayout>
    );
  }
}

export default Home;
