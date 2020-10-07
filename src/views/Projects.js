// Import Defaults
import React, {useEffect, useMemo, useState} from 'react';

// Import Prismic
import Prismic from 'prismic-javascript';
import {client} from '../prismic-configuration';

// Import Views
import NotFound from '../views/NotFound';

// Import Custom Components
import ProjectCover from '../components/ProjectCover';
import DefaultLayout from '../components/DefaultLayout';
import {useComingFrom} from '../components/ComingFrom';

// Component: Projects
const Projects = ({match}) => {
  const uid = match.params.uid;

  const {comingFrom, set} = useComingFrom();
  // do not fade when coming back from a project
  const fade = useMemo(() => comingFrom !== 'project', []);
  useEffect(() => set('projects'), []);
  // States
  const [notFound, toggleNotFound] = useState(false);
  const [data, setDocData] = useState(null);
  const [covers, setCoverData] = useState([]);

  // ComponentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.query(
        Prismic.Predicates.at('document.tags', [uid]),
        {
          orderings: '[document.last_publication_date desc]',
        }
      );

      if (result) {
        const {results} = result;
        setDocData(results);

        const covers = results.map((item) => ({
          pageSlug: uid,
          tags: item.tags,
          title: item.data.title,
          subtitle: item.data.subtitle,
          id: item.id,
          slug: item.uid,
          video: item.data.cover_video,
          fallback: item.data.cover_image,
          preload: item.data.cover_preload_image,
        }));
        setCoverData(covers);

        return true;
      } else {
        console.warn('404. Page document not found.');
        return toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]);

  if (data && covers.length > 0) {
    return (
      <DefaultLayout title="projects">
        {fade && (
          <div className="projects--splash">
            {uid === 'commercial' && (
              <h1 className="splash--title">Commercial</h1>
            )}
            {uid === 'tv-film' && (
              <h1 className="splash--title">TV &amp; Film</h1>
            )}
          </div>
        )}
        <div className="projects">
          {covers.map((item) => (
            <ProjectCover key={item.id} {...item} fade={fade} />
          ))}
        </div>
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

// Export View
export default Projects;
