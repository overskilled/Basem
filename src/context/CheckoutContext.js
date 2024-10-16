"use client"

import React, { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    const [checkoutItems, setCheckoutItems] = useState([]);

    const addToCheckout = (product) => {
        setCheckoutItems((prevItems) => [...prevItems, product]);
    };

    return (
        <CheckoutContext.Provider value={{ checkoutItems, addToCheckout }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => {
    return useContext(CheckoutContext);
};
