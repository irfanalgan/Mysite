import { motion } from 'framer-motion';
import { HiChartBar, HiCpuChip, HiPresentationChartLine, HiCircleStack } from 'react-icons/hi2';

import { AppWrap, MotionWrap } from '../../wrapper';


const expertise = [
  {
    icon: HiChartBar,
    title: 'Credit Risk Modeling',
    desc: 'Corporate PD models built on financial statement data — logistic regression with multicollinearity analysis, sign testing and Gini-based validation. Monthly automated monitoring via stored procedures.',
  },
  {
    icon: HiCpuChip,
    title: 'Early Warning Systems',
    desc: 'End-to-end EWS pipelines covering 20M+ customers across retail, SME and agriculture segments. XGBoost & LightGBM models predicting 30/60/90-day default horizons from behavioral and transactional data.',
  },
  {
    icon: HiPresentationChartLine,
    title: 'Time Series & Forecasting',
    desc: 'Macroeconomic models using OLS and ARIMAX with 15+ economic indicators (CDS, bond yields, FX, CPI, GDP). Stationarity, cointegration and scenario analysis applied throughout.',
  },
  {
    icon: HiCircleStack,
    title: 'Data Engineering',
    desc: 'SQL pipelines, stored procedures and job schedulers powering automated weekly reporting. Python Dash dashboards for real-time model performance monitoring across live portfolios.',
  },
];

const About = () => {
  return (
    <>
      <h2 className="head-text">From Raw <span>Data</span> to <br />Real <span>Impact</span></h2>

      <div className="app__about-layout">
        <div className="app__about-left">
          <p className="app__about-bio">
            I'm a data scientist at DenizBank, where my core focus is building corporate
            PD models and early warning systems that drive real credit decisions.
            I work across retail, SME and agriculture segments — turning raw financial
            and behavioral data into production-grade risk models.
          </p>
          <p className="app__about-bio">
            My work sits at the intersection of statistical rigor and business impact:
            explainable models, robust validation pipelines, and automated monitoring
            systems that keep decision-makers ahead of risk.
          </p>
         
        </div>

        <div className="app__about-cards">
          {expertise.map((item, i) => (
            <motion.div
              className="app__about-card"
              key={item.title}
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="app__about-card-icon">
                <item.icon />
              </div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
