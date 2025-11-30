

function Card({country}) {
  
  return (
    <div 
    className="w-[20%] h-70 border-1 border-white m-3"
    >
      <img src={country.flags.png} alt="" className="m-2 bg-slate-500 w-[95%] h-1/2" /> 
      <div className='m-2 text-white'>
          <h2 className='font-bold'>{country.name.common}</h2>
          <p>Population : <span className='font-bold'>{country.population} Hab</span></p>
          <p>Region : <span className='font-bold'>{country.region}</span> </p>
          <p>Capitale : <span className='font-bold'>{country.capital}</span> </p>
      </div>        
    </div>
  )
}

export default Card