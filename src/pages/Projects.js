import React, {useEffect, useState} from 'react';
import Prismic from 'prismic-javascript';
import {client, linkResolver} from '../prismic-configuration';
import NotFound from './NotFound';
import ProjectCard from '../components/ProjectCard';

const Projects = ({match}) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);

  const uid = match.params.uid;

  useEffect(() => {
    const fetchData = async () => {
      const tag = [];
      tag.push(uid);

      const result = await client.query(Prismic.Predicates.at('document.tags', tag));

      if (result) {
        return setDocData(result);
      } else {
        console.warn('Page document not found. Make sure it exists in your Prismic repository');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    const projects = doc.results;

    console.log(projects);
    return (
      <section className="projects">
        {projects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </section>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Projects;
