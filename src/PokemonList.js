import React from 'react'

export default function PokemonList({ pokemon }) {
  return (
    <div>
        {pokemon.map(p => (
            // each array needs a key on the TOP LEVEL element 
            <div key={p}>
                {p}
            </div>
        ))}
    </div>
  )
}
