import {Switch} from "antd"
import styles from "./index.module.scss"
import {useState} from "react";

const FormSwitch = ({value,name, onChange}) => {


    return (
        <div className={styles.switchWrap}>
            <Switch value={value} onChange={onChange} />
            {name}
        </div>
    );
};

export default FormSwitch;