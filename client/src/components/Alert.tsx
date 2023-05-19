import { FunctionComponent } from 'react';
import { useAppContext } from '../context/appContext';

const Alert: FunctionComponent = () => {
    const {alertType, alertText} = useAppContext()
    return (
        <div className={`alert alert-${alertType}`}>{alertText}</div>
    )
}

export default Alert;