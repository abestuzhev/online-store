import OkvedApp from './okvedApp';

function FormOkved({ name, value, onChange }) {
  return (
    <div>
      <OkvedApp
        path={`${process.env.REACT_APP_API_URL}/businessRest/credit/okwed/`}
        value={value}
        name={name}
        onChangeForm={onChange}
        // step={sectionName}
        // orderId={window.creditApplicationId}
        // defaultValue={defaultValue}
        // allItemLength={isSaveItems}
        // setIsOkved={setIsOkved}
        // setIsMainOkved={setIsMainOkved}
        // setIsSaveItems={setIsSaveItems}
        // setIsCheckedItem={setIsCheckedItem}
        // okvedOpen={okvedOpen}
      />
    </div>
  );
}

export default FormOkved;
