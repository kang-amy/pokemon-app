import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios'
import Pagination from './Pagination';

function App() {
  // [state, method used to update the state]
  // useState() brackets = initial state (which is none)
  // pokemon array is empty since useState starts with empty state
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState([])
  const [prevPageUrl, setPrevPageUrl] = useState([])
  const [loading, setLoading] = useState(true)


  // each time currentPageUrl is changed, the effect will run again
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
      setLoading(false)
    })

    return () => cancel()
  }, [currentPageUrl])

  if (loading) return "Loading..."

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
  return (
    <>
    <PokemonList pokemon={pokemon}/>
    <Pagination 
    gotoNextPage={nextPageUrl ? gotoNextPage : null} 
    gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
