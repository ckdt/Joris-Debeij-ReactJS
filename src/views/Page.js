// Import Defaults
import React, {useEffect, useState} from 'react';

// Import Prismic
import {RichText} from 'prismic-reactjs';
import {client, linkResolver} from '../prismic-configuration';

// Import Views
import NotFound from '../views/NotFound';

// Import Custom Components
import DefaultLayout from '../components/DefaultLayout';

const Contacts = ({items}) => {
  const result = items.map(function(item, index) {
    const {contact_title, contact_info} = item;
    return (
      <div className="contacts--item" key={index}>
        <h2>{RichText.asText(contact_title)}</h2>
        <RichText render={contact_info} linkResolver={linkResolver} />
      </div>
    );
  });
  if (result) {
    return (
      <div className="page--contacts">
        <div className="contacts--header">
          <h1 className="contacts--title">Contacts</h1>
        </div>
        <div className="contacts--list">{result}</div>
      </div>
    );
  } else {
    return null;
  }
};

const Awards = ({items}) => {
  const result = items.map(function(item, index) {
    const {award_logo, award_title} = item;
    return (
      <div className="awards--item" key={index}>
        <img src={award_logo.url} alt={award_title} />
      </div>
    );
  });
  if (result) {
    return (
      <div className="page--awards">
        <div className="awards--header">
          <h1 className="awards--title">Awards</h1>
        </div>
        <div className="awards--list">{result}</div>
      </div>
    );
  } else {
    return null;
  }
};

const ContentSlices = ({data}) => {
  const {slices} = data;
  const result = slices.map(function(item, index) {
    const type = item.slice_type;
    const {items} = item;
    switch (type) {
      case 'contacts':
        return <Contacts items={items} key={index} />;
      case 'awards':
        return <Awards items={items} key={index} />;
      default:
        return null;
    }
  });
  if (result) {
    return result;
  } else {
    return null;
  }
};

// Component: Page
const Page = ({match}) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);
  const uid = match.params.uid;

  // Get the page document from Prismic
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getByUID('page', uid);
      if (result) {
        return setDocData(result);
      } else {
        console.warn('404. Page document not found.');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]);

  if (doc) {
    return (
      <DefaultLayout title="page">
        <header className="about--header">
          <img className="page--masthead" src={doc.data.image.url} alt={doc.data.image.alt} />
        </header>
        <div className="about--content">
          <h1 className="page--title">{RichText.asText(doc.data.title)}</h1>
          <div className="page--lead">
            <RichText render={doc.data.description} linkResolver={linkResolver} />
          </div>
          <div className="page--body">
            <RichText render={doc.data.body_copy} linkResolver={linkResolver} />
          </div>

          <ContentSlices data={doc.data} />
        </div>
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

// Export View
export default Page;
