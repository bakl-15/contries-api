import { useState, useEffect } from 'react'
import Card from './Components/Cards/Card'
import ButtonCustom from "./Components/Controls/Button"
import { useDispatch } from 'react-redux';
import { getCountries } from './Features/CountrySlice';

function App() {
  const dispatch = useDispatch()

  const [allCountries, setAllCountries] = useState([])
  const [filterInput, setFilterInput] = useState("")
 useEffect(() => {
  dispatch(getCountries())
    .unwrap()
    .then((data) => {
       setAllCountries(data)
     })
    .catch((err) => console.error(err));
}, [dispatch]);


const countries = allCountries.filter(
        (country) => country.name.common.trim().toLowerCase().includes(filterInput.toLowerCase())
    )
  
 
  return (
    <>
       <div className="bg-[#131314] h-screen w-screen overflow-y-auto">
          <div className="m-20 mb-3 bg-[#1E1F20] font-bold text-lg text-white text-center p-7">
               <h1>EXPLORATEUR DE PAYS  🌍 </h1>      
          </div>
       
            <div className="flex justify-arround items-center mt-3 mx-20">
                   <input className="flex-1 border-1 border-white-700 text-white h-10 p-1" 
                     placeholder="🔍 Rechercher un pays"
                     type="search"
                     value={filterInput}
                     onChange={(e) => setFilterInput(e.target.value) }
                   />
                   <ButtonCustom label="Asie" />
                   <ButtonCustom label="Afrique" />
                   <ButtonCustom label="Europe" />
                   <ButtonCustom label="Amérique" />
                   <ButtonCustom label="Asie" />
           </div>
           <div className='flex justify-around flex-wrap items-center mt-20 mx-20'>
            {
              countries.length >  0 ?
              countries.map((country) => 
                  <Card country={country} />
              )
              :
              <p>Aucun resultat disponible</p>
            }
               
              
           </div>
            
         </div>
    </>
  )
}

export default App
