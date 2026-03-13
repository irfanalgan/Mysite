import React from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { images } from '../../constants';

const abouts = [
  { title: 'Data Analysis', description: 'I explore and interpret complex datasets to uncover meaningful insights and trends.', imgUrl: images.about01 },
  { title: 'Machine Learning', description: 'I build predictive models and intelligent systems using modern ML algorithms.', imgUrl: images.about02 },
  { title: 'Data Visualization', description: 'I turn raw data into compelling visual stories with tools like Matplotlib and Power BI.', imgUrl: images.about03 },
  { title: 'Statistical Modeling', description: 'I apply statistical methods to analyze patterns and make data-driven decisions.', imgUrl: images.about04 },
];

const About = () => {
  return (
    <>
      <h2 className="head-text">From Raw <span>Data</span> to <br />Real <span>Impact</span></h2>

      <div className="app__about-intro">
        <p>
          I'm a data scientist focused on transforming raw data into business value.
          With experience in the banking sector, I work on credit risk modeling,
          customer behavior analytics, and macroeconomic time series forecasting.
        </p>
        <p>
          I design end-to-end analytical pipelines — from data preprocessing and
          feature engineering to statistical analysis, model building, and validation.
          My priority is building explainable models aligned with real-world business standards.
        </p>
      </div>
      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={about.imgUrl} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
