import React, { cloneElement } from 'react';
import { useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './index.module.scss';
import DashboardMenu from './DashboardMenu';
import { constants } from '../../helpers/constants';
import Breadcrumbs from '../Breadcrumbs';

function DashboardPanel() {
  const outlet = useOutlet({ key: location.pathname });
  const cloneOutlet = cloneElement(outlet ?? <></>, { key: location.pathname });
  return (
    <div className={styles.dashboardPanel}>
      <div className={styles.dashboardPanelBar}>
        <DashboardMenu />
      </div>
      <div className={styles.dashboardPanelContent}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ overflow: 'visible' }}
            animate={{ opacity: 1, transitionEnd: { overflow: 'visible' } }}
            exit={{ opacity: 0, overflow: 'hidden' }}
            transition={{ duration: 0.2, ease: 'backInOut' }}
            key={cloneOutlet?.key}
          >
            {cloneOutlet}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DashboardPanel;
