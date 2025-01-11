import { canArrayValues, canObjectValues } from '../../../helpers/functions';
import { errorBuilder, generatePath } from './helpers';

export const changeFieldOnTarget = ({ userData, params, form, isSuccess }) => {
  if (canArrayValues(userData) || canObjectValues(userData)) {
    const targetInvestment = generatePath('finance', 'investment');
    const targetSum = generatePath('finance', 'sum');
    const userDataKeys = Object.keys(userData);
    const targetCode = userDataKeys.find((key) => key.includes(params.code));
    const isResult =
      Number(userData[targetSum]) < Number(userData[targetInvestment]);

    if (
      targetCode === targetSum &&
      userData[targetSum] &&
      userData[targetInvestment]
    ) {
      if (isResult) {
        return errorBuilder(params?.errorMessage);
      }
      return isSuccess;
    }

    if (targetCode === targetInvestment && userData[targetSum]) {
      form.validateFields([targetSum]);
    }
    return isSuccess;
  }

  return isSuccess;
};
