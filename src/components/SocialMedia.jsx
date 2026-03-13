import React from 'react';
import { BsGithub, BsLinkedin, BsFileArrowDown } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href='https://github.com/irfanalgan' target="_blank" rel="noreferrer">
        <BsGithub />
      </a>
    </div>
    <div>
      <a href='https://www.linkedin.com/in/irfankaanalgan/' target="_blank" rel="noreferrer">
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href='https://drive.google.com/file/d/1MQMasXuF0YpSt3aiTTECvevRe4tFEgNy/view?usp=sharing'
        download
        target="_blank"
        rel="noreferrer">
        <BsFileArrowDown />
      </a>
    </div>
  </div>
);

export default SocialMedia;
