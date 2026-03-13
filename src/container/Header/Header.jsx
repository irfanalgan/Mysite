import React from 'react';
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';

const circleItems = [
  { icon: images.python_icon, label: 'Python' },
  { icon: images.machine_learning, label: 'Machine Learning' },
  { icon: images.sql, label: 'SQL' },
];

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Header = () => (
  <div className="app__header app__flex">
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="app__header-info"
    >
      <div className="app__header-badge">
        <div className="badge-cmp app__flex">
          <div style={{ marginLeft: 20 }}>
            <p className="header-greeting">Hello, I am</p>
            <h1 className="head-text">İrfan</h1>
          </div>
        </div>

        <div className="tag-cmp app__flex">
          <p className="header-tag">Data Scientist</p>
        </div>
      </div>
    </motion.div>

    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__header-img"
    >
      <img src={images.profile} alt="profile_bg" />
      <motion.img
        whileInView={{ scale: [0, 0] }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        src={images.circle}
        alt="profile_circle"
        className="overlay_circle"
      />
    </motion.div>

    <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles"
    >
        {circleItems.map((item) => (
        <div className="circle-cmp circle-labeled app__flex" key={item.label}>
          <img src={item.icon} alt={item.label} />
          <span className="circle-label">{item.label}</span>
        </div>
      ))}
    </motion.div>
  </div>
);

export default AppWrap(Header, 'home');
