import React from 'react';

interface CardProps {
  title: string;
  text: string;
  src: string;
  imageAlt: string;
  linkHref: string;
  linkText: string;
}

const Card: React.FC<CardProps> = ({ title, text, src, imageAlt, linkHref, linkText }) => {
  return (
    <div className="card" style={{ width: '18rem', marginBottom: '1rem' }}>
      <img className="card-img-top" src={src} alt={imageAlt} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <a href={linkHref} style={{color:'#d0ba9e'}}>
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default Card;
