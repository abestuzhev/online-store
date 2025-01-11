import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { constants } from '../../../helpers/constants';
import { canArrayValues } from '../../../helpers/functions';

interface IModalMessageProps {
  isShow: boolean;
  closeModalHandler: () => void;
  // content?: {
  //   title: string;
  //   size: string;
  //   footer: any;
  // };
}

function ModalMessage({ isShow, closeModalHandler }: IModalMessageProps) {
  const { content } = useSelector((state) => state.modals);
  const generateWidth = (value: string): number => {
    switch (value) {
      case 'small':
        return constants.MODAL.WIDTH.SMALL;
      case 'medium':
        return constants.MODAL.WIDTH.MEDIUM;
      case 'large':
        return constants.MODAL.WIDTH.LARGE;

      default: {
        return constants.MODAL.WIDTH.SMALL;
      }
    }
  };

  const generateBtn = (btn, ind) => {
    switch (btn.type) {
      case 'cancel': {
        return (
          <button
            type="button"
            key={ind}
            className="e-btn e-btn-outline"
            onClick={() => {
              btn.onClick && btn.onClick();
              closeModalHandler();
            }}
          >
            <span>{btn.text}</span>
          </button>
        );
      }
      case 'primary': {
        return (
          <button
            type="button"
            key={ind}
            className="e-btn e-btn-purple"
            onClick={() => {
              btn.onClick && btn.onClick();
              closeModalHandler();
            }}
          >
            <span>{btn.text}</span>
          </button>
        );
      }
      case 'link': {
        return (
          <a
            href={btn?.link}
            type="button"
            key={ind}
            className="e-btn e-btn-purple"
          >
            {btn?.icon}
            <span>{btn.text}</span>
          </a>
        );
      }
    }
  };

  return (
    <Modal
      title={content.title || ''}
      centered
      open={isShow}
      wrapClassName={classNames('e-modal', content.size)}
      onOk={closeModalHandler}
      onCancel={closeModalHandler}
      width={generateWidth(content.size)}
      footer={
        <div key="right" className="ant-modal-footer-between">
          <div className="ant-modal-footer-right">
            {canArrayValues(content?.footer) &&
              content?.footer.map((btn, ind) => generateBtn(btn, ind))}
          </div>
        </div>
      }
    >
      {content.text}
    </Modal>
  );
}

export default ModalMessage;
