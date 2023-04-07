import { createContext, useContext, useState } from "react";

const OrderFormContext = createContext({});

const OrderFormProvider = ({ children, form }) => {
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  return (
    <OrderFormContext.Provider
      value={{
        form,
        originOptions,
        setOriginOptions,
        destinationOptions,
        setDestinationOptions,
      }}
    >
      {children}
    </OrderFormContext.Provider>
  );
};

export const useOrderForm = () => {
  return useContext(OrderFormContext);
};

export default OrderFormProvider;
