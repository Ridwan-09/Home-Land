import React, {useState, useEffect, createContext} from 'react';

// import data
import {housesData} from '../data';

// create context 
export const HouseContext = createContext();

const HouseContextProvider = ({children}) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]); 
  const [property, setProperty] = useState('Property take (any)'); 
  const [properties, setProperties] = useState([]); 
  const [price, setPrice] = useState('Price range (any)'); 
  const [loading, setLoading] = useState(false); 

  // return all countries
  useEffect(() =>{
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // remove duplicates
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
 }, []);


 // return all properties
 useEffect(() =>{
  const allProperties = houses.map((house) => {
    return house.type;
  });

  // remove properties
  const uniqueProperties = ['Location (any)', ...new Set(allProperties)];

  // set properties state
  setProperties(uniqueProperties);
}, []);

const handleClick = () => {
  // create a function that checks if the string includes '(any)'
  const isDefault = (str) => {
    return str.split('').includes('(any)');
  };

  console.log(price);
  // get first value of price and parse it to number
  const minPrice = parseInt(price.split(' ')[0]);
  // get second value of price which is the maximum price and parse it to number
  const maxPrice = parseInt(price.split(' ')[2]);
  
  const newHouses = housesData.filter((house) => {
    const housePrice = (parseInt(house.price));

    // if all values are selected
    if (
      house.country === country && 
      house.type === property && 
      housePrice >= minPrice && 
      housePrice <= maxPrice
      ) {
        return house;
      }

      // if all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)){
        return house;
      }
      // if country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)){
        return house.country === country;
      }

      // if property is not default
      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property;
      }
      // if price is not default
      if(!isDefault(price) && isDefault(country) && isDefault(property)){
        if (housePrice >= minPrice && housePrice <= maxPrice){
          return house;
        }
      }

      // if country & property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)){
        return house.country === country && house.type === property;
        }

        // if country & price is not default
        if (!isDefault(country) && isDefault(property) && !isDefault(price)){
          if (housePrice >= minPrice && housePrice <= maxPrice){
            return house.country === country;
          }
        }
  });
  console.log(newHouses);

};

  return (
    <HouseContext.Provider 
    value={ {
      country,
      setCountry,
      countries, 
      property,
      setProperty,
      properties,
      price,
      setPrice,
      houses,
      loading,
      handleClick,
    } }>
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
