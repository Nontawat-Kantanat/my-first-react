import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import ReactLoading from 'react-loading'

// Components
import FavPoke from './components/FavPoke'

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect (() => {

    let abortController = new AbortController();

    // Function with API
    const loadPoke = async () => {
      try {

        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {signal: abortController.signal});

        setPoke(response.data)
        setError("");

      } catch(error) {
        setError("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    }
 
    loadPoke();

    return () => abortController.abort();

  }, [number])

  console.log("Pokemon Info: ", poke);

  // Function Button

  const prevPoke = () =>{
    setNumber((number) => number -1 )
  }

  const nextPoke = () =>{
    setNumber((number) => number +1 )
  }

  console.log("Pokemon ID: ", number);

  // Function button to keep data 
  const addFav = () => {
    setFav((oldState) => [...oldState, poke])
  }

  console.log("Your fav pokemon: ", fav)

  return (

    // Tailwind Css Cards
    <div className="block max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        
        <div>
          {loading ? 
            <ReactLoading type='spin' color='black' height={'20%'} width={'20%'}/> : 
              <>
                {/* Name */}
                <h1>{poke?.name}</h1>

                {/* Button Feture */}
                <button onClick={addFav}>Add to favorite</button><br />

                {/* Img */}
                <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.name} />

                {/* Description */}
                <ul>
                  {poke?.abilities?.map((abil, idx) => (
                    <li key={idx}>{abil.ability.name}</li>
                  ))}
                </ul>

                {/*Button*/}
                <button onClick={prevPoke}>Previous</button>
                <button onClick={nextPoke}>Next</button>
              </>
            }
          
        </div>
            
        <div>
        <h2>Your favorite pokemon</h2>

        {/*Import Components  */} 
        {fav.length > 0 ? <FavPoke fav={fav} /> : 
        <p className='flex h-full justify-center items-center'>No favorite pokemon...</p>}
        </div>

      </div>
           
    </div>
  )
}

export default App
