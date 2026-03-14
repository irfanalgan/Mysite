import { motion } from 'framer-motion';
import { HiChartBar, HiCpuChip, HiPresentationChartLine, HiCircleStack } from 'react-icons/hi2';

import { AppWrap, MotionWrap } from '../../wrapper';


const expertise = [
  {
    icon: HiChartBar,
    title: 'Credit Risk Modeling',
    desc: 'PD models using logistic regression and XGBoost, with multicollinearity analysis, feature selection and sign testing for regulatory compliance.',
  },
  {
    icon: HiCpuChip,
    title: 'Machine Learning',
    desc: 'End-to-end ML pipelines — from EDA and feature engineering to model training, validation and real-time monitoring in production.',
  },
  {
    icon: HiPresentationChartLine,
    title: 'Time Series & Forecasting',
    desc: 'Macroeconomic trend modeling with ARIMAX, Vasicek and LSTM architectures for portfolio performance and market condition forecasting.',
  },
  {
    icon: HiCircleStack,
    title: 'Data Engineering',
    desc: 'SQL-based data pipelines, stored procedures and automated reporting workflows connecting raw data to business dashboards.',
  },
];

const About = () => {
  return (
    <>
      <h2 className="head-text">From Raw <span>Data</span> to <br />Real <span>Impact</span></h2>

      <div className="app__about-layout">
        <div className="app__about-left">
          <p className="app__about-bio">
            I'm a data scientist at DenizBank, focused on credit risk intelligence
            and predictive analytics. I build models that inform real lending decisions —
            from early warning systems to behavioral PD and macroeconomic forecasting.
          </p>
          <p className="app__about-bio">
            My work sits at the intersection of statistical rigor and business impact:
            explainable models, robust validation, and automated pipelines that bring
            data to decision-makers.
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
