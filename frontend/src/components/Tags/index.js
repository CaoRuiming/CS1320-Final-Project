import React from 'react';
import './style.scss';

export default function Tags({ tags=[] }) {
  const tagItems = tags.map(tag => {
    const { id, name } = tag;
    return <div key={`tag-${id}`} className="tagItem">{name}</div>;
  });

  if (!tags.length) {
    return null;
  }

  return (
    <div className="tags">
      {tagItems}
    </div>
  ); 
}
