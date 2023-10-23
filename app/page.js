'use client'
import { useState } from 'react';
import { HeartIcon, GlobeEuropeAfricaIcon, VariableIcon, MapPinIcon, LanguageIcon } from '@heroicons/react/24/outline';
import Image from "next/image";


export default function Home() {
  const [query, setQuery] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);


  const searchCountry = async () => {
    if (query.trim() === '') {
      setError('Please enter a country name');
      return;
    }

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
      const data = await response.json();

      if (data.status === 404) {
        setError('Oops does not exist on earth, check your spellings...');
        setCountryData(null);
      } else {
        setError(null);
        setCountryData(data);
      }
    } catch (error) {
      setError('An error occurred while fetching country data');
      setCountryData(null);
    }
  };

  return (

    <div className="flex flex-col h-screen backdrop-blur-sm bg-slate-500/30 bg-opacity-70 bg-slate-600 items-center justify-center mx-auto p-4">


      <Image
        src="/logo.png"
        alt="logo"
        width={150}
        height={150}
        className='mb-8 item-center justify-center'
      />

      <h1 className="text-3xl font-bold mb-4 text-slate-900 ">Welome To Globe Gazer</h1>

      <p className='mx-auto p-4'> Discover the World: Search for Countries and Explore their Languages, Population, and More! </p>
      <p className="flex p-2 items-center text-sm text-gray-300">
        Made with
        <HeartIcon className="w-4 h-4 mx-1 text-red-500" />
        by
        <span className="font-bold ml-1 text-lime-400">Joseph Endale</span>
      </p>
      <div className="flex space-y-25">
        <input
          type="text"
          className=" border text-gray-800 border-gray-300 px-4 py-2 mr-2 rounded"
          placeholder="Enter a country name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={searchCountry}
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-800 mt-2 font-semibold">{error}</p>}

      {countryData && (
        <div className="flex space-x-5 p-6 items-center justify-center mb-5">
          <div>
            <h2 className="flex items-center justify-center text-xl font-bold mb-2 "><GlobeEuropeAfricaIcon className="h-8 w-8 text-lime-500" />{countryData[0].name.common}</h2>
            <img
              src={countryData[0].flags.svg}
              alt={`${countryData[0].name.common} flag`}
              width={300}
              height={300}
              className=" rounded-lg "
            />
          </div>

          <div className='flex items-center justify-center mb-2 font-semibold'>
            <p className='italic md:italic'>
              <MapPinIcon className="h-8 w-8 text-orange-500 " />
              <span>Capital: {countryData[0].capital}</span>
            </p>
          </div>
          <div className='flex items-center justify-center mb-2 font-sans font-semibold'>
            <p className='italic md:italic'>
              <VariableIcon className="h-8 w-8 text-lime-500" />
              <span>Population: {countryData[0].population}</span>
            </p>
          </div>
          <div className='flex items-center justify-center mb-2 font-sans font-semibold'>
            <p className='italic md:italic'>
              <LanguageIcon className="h-8 w-8 text-blue-500" />
              <span>Languages: {Object.values(countryData[0].languages).join(', ')}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
