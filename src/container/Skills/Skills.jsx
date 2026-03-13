import React from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { images } from '../../constants';

const skillsData = [
  { name: 'Python', icon: images.python_icon, bgColor: '#edf2f8', desc: 'Primary language for data analysis, ML modeling and automation.' },
  { name: 'SQL', icon: images.sql, bgColor: '#edf2f8', desc: 'Used for financial data extraction, stored procedures and dashboard automation.' },
  { name: 'Git / GitLab', icon: images.git_lab, bgColor: '#edf2f8', desc: 'Version control and CI/CD pipeline management.' },
  { name: 'Machine Learning', icon: images.machine_learning, bgColor: '#edf2f8', desc: 'XGBoost, logistic regression, LSTM for PD and churn models.' },
  { name: 'Statistics', icon: images.statistics, bgColor: '#edf2f8', desc: 'Hypothesis testing, multicollinearity analysis, time series (ARIMAX, Vasicek).' },
];

const timelineData = [
  {
    year: '2017 September',
    type: 'education',
    name: 'B.Sc. Computer Engineering',
    sub: 'METU (ODTÜ)',
    desc: 'Started at Middle East Technical University, Northern Cyprus Campus.',
  },
  {
    year: '2021 August - 2021 October',
    type: 'experience',
    name: 'Data Scientist Intern',
    sub: 'Innova Bilişim',
    desc: 'NLP text classification using tf-idf and word2vec. Logistic regression models for user complaint categorization. Zemberek for tokenization, PostgreSQL for data management.',
  },
  {
    year: '2022 June',
    type: 'education',
    name: 'Graduated',
    sub: 'METU (ODTÜ)',
    desc: 'Completed B.Sc. in Computer Science & Engineering',
  },
  {
    year: '2022 September ',
    type: 'experience',
    name: 'Data Scientist',
    sub: 'DenizBank',
    ongoing: true,
    desc: 'Early warning systems in big data environments, behavioral PD models (XGBoost, logistic regression), macroeconomic time series (ARIMAX, LSTM, Vasicek), real-time model monitoring and UAT.',
  },
];

const Skills = () => {
  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skillsData.map((skill) => (
            <React.Fragment key={skill.name}>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className="app__skills-item app__flex"
                data-tip
                data-for={skill.name}
              >
                <div
                  className="app__flex"
                  style={{ backgroundColor: skill.bgColor }}
                >
                  <img src={skill.icon} alt={skill.name} />
                </div>
                <p className="p-text">{skill.name}</p>
              </motion.div>
              <ReactTooltip
                id={skill.name}
                effect="solid"
                arrowColor="#fff"
                className="skills-tooltip"
              >
                {skill.desc}
              </ReactTooltip>
            </React.Fragment>
          ))}
        </motion.div>

        <div className="app__timeline">
          {timelineData.map((item) => (
            <React.Fragment key={`${item.year}-${item.name}`}>
              <motion.div
                className="app__timeline-item"
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                data-tip
                data-for={`tl-${item.name}`}
              >
                <div className={`app__timeline-dot ${item.type}${item.ongoing ? ' ongoing' : ''}`} />
                <div className="app__timeline-body">
                  <span className="app__timeline-year bold-text">
                    {item.year}{item.ongoing ? ' → Present' : ''}
                  </span>
                  <h4 className="bold-text">{item.name}</h4>
                  <p className="p-text">{item.sub}</p>
                </div>
              </motion.div>
              <ReactTooltip
                id={`tl-${item.name}`}
                effect="solid"
                arrowColor="#fff"
                className="skills-tooltip"
              >
                {item.desc}
              </ReactTooltip>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__warmbg',
);
