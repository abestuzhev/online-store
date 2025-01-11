//* Style
import classNames from 'classnames';
import styles from './index.module.scss';
import './style.scss';

interface ILoaderProps {
  title?: string;
  text?: string;
  type?: string;
  style?: any;
}

function Loader({ title, text, type, style }: ILoaderProps) {
  return (
    <div className={classNames('loaderWrapper', { fixed: type })} style={style}>
      <div className="loaderBody">
        <div className="loaderIcon" />
        {(title || text) && (
          <div className="loaderContent">
            {title && <div className="loaderTitle">{title}</div>}
            {text && <div className="loaderText">{text}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
export default Loader;
