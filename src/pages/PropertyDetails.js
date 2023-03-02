import React from 'react';

// import data
import {housesData} from '../data';

// import use params
import {useParams} from 'react-router-dom';

// import icons
import {BiBed, BiBath, BiArea} from 'react-icons/bi';

// import link
import {Link} from 'react-router-dom';

const PropertyDetails = () => {
// get the house id
const {id} = useParams();

// get the house based in id
const house = housesData.find((house) => {
  return house.id === parseInt(id);
});

  return (
    <section>
      <div className='container mx-auto min-h-[800px] mb-14'>
        <div className='flex flex-col lg:flex-row lg:items-center lg: justify-between'>
          <div>
            <h2>{house.name}</h2>
            <h3>{house.address}</h3>
          </div>
          <div>
            <div>{house.type}</div>
            <div>{house.country}</div>
          </div>
          <div>$ {house.price}</div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
