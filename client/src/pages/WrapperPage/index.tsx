import {
  useLocation,
  useNavigate,
  useOutlet,
  useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cloneElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import styles from './index.module.scss';
import { constants } from '../../helpers/constants';
import Breadcrumbs from '../../components/Breadcrumbs';
import ScrollToTop from '../../components/ScrollToTop';
import Header from '../../components/Header';

function WrapperPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryCode } = useParams();
  const { wrapper } = useSelector((state) => state.application);
  const outlet = useOutlet({ key: location.pathname });
  const cloneOutlet = cloneElement(outlet ?? <></>, { key: location.pathname });

  return (
    <>
      {!location.pathname.includes(constants.PAGES.DASHBOARD) && <Header />}
      <div
        className={classNames(styles.wrapper, {
          [styles.wrapperLock]: wrapper.lock,
        })}
      >
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ overflow: 'visible' }}
            animate={{ opacity: 1, transitionEnd: { overflow: 'visible' } }}
            exit={{ opacity: 0, overflow: 'hidden' }}
            transition={{ duration: 0.2, ease: 'backInOut' }}
            key={cloneOutlet?.key}
          >
            <div className="pageContent">
              {location.pathname !== constants.PAGES.INDEX ||
                (!location.pathname.includes(constants.PAGES.DASHBOARD) && (
                  <div className="pageLayout">
                    <Breadcrumbs theme="dark" />
                  </div>
                ))}
              {cloneOutlet}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default WrapperPage;
