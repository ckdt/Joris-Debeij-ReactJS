import React from 'react';
import {RichText} from 'prismic-reactjs';

const ProjectCard = ({...props}) => {
  const {title} = props.data;
  return (
    <div className="project">
      <h1>{RichText.asText(title)}</h1>
    </div>
  );
};
export default ProjectCard;
