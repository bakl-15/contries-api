// src/App.jsx
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "./Features/CountrySlice";
import Card from "./Components/Cards/Card";
import { CirclesWithBar } from "react-loader-spinner";
import ReactPaginate from "react-paginate";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.country);
  const [allCountries, setAllCountries] = useState([]);

  // Filtres
  const [searchInput, setSearchInput] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [subregionFilter, setSubregionFilter] = useState("All");
  const [populationMin, setPopulationMin] = useState("");
  const [populationMax, setPopulationMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [total, setTotal] = useState({});

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 12;

  // Calcul total population et surface
  const getTotal = (countries) => {
    return {
      population: new Intl.NumberFormat("fr-FR").format(
        countries.reduce((acc, country) => acc + country.population, 0)
      ),
      surface: new Intl.NumberFormat("fr-FR").format(
        countries.reduce((acc, country) => acc + country.area, 0)
      ),
    };
  };

  // Récupération des pays
  useEffect(() => {
    dispatch(getCountries())
      .unwrap()
      .then((data) => {
        setAllCountries(data);
        setTotal(getTotal(data));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  // Filtrage combiné
  const filteredCountries = useMemo(() => {
    return allCountries.filter((country) => {
      if (
        searchInput &&
        !country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      )
        return false;

      if (regionFilter !== "All" && country.region !== regionFilter) return false;
      if (subregionFilter !== "All" && country.subregion !== subregionFilter)
        return false;

      if (
        (populationMin && country.population < parseInt(populationMin)) ||
        (populationMax && country.population > parseInt(populationMax))
      )
        return false;

      if (
        (areaMin && country.area < parseInt(areaMin)) ||
        (areaMax && country.area > parseInt(areaMax))
      )
        return false;

      return true;
    });
  }, [
    allCountries,
    searchInput,
    regionFilter,
    subregionFilter,
    populationMin,
    populationMax,
    areaMin,
    areaMax,
  ]);

  // Sous-régions dynamiques
  const subregions = [...new Set(allCountries.map((c) => c.subregion).filter(Boolean))];

  // Pagination ReactPaginate
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(filteredCountries.length / itemsPerPage);

  const displayCountries = filteredCountries.slice(
    pagesVisited,
    pagesVisited + itemsPerPage
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="bg-[#131314] min-h-screen w-screen overflow-y-auto">
      {/* Header */}
      <div className="flex m-20 mb-3 bg-[#1E1F20] font-bold text-lg text-white text-center p-7">
        <h1 className="text-blue-500 flex-1">EXPLORATEUR DE PAYS 🌍</h1>
        <div>
          <p className="text-yellow-500 text-xs italic font-extralight">
            Nombre de population : {total.population}
          </p>
          <p className="text-yellow-500 text-xs italic font-extralight">
            Surface totale : {total.surface} KM
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex justify-between items-center mt-3 mx-20 bg-[#1E1F20] p-3 rounded gap-4">
        {/* Recherche */}
        <input
          className="flex-1 border border-gray-500 text-white h-10 p-2 rounded bg-[#1E1F22]"
          type="search"
          placeholder="🔍 Rechercher un pays"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* Région */}
        <select
          className="border border-white cursor-pointer bg-[#1E1F22] p-1 w-50 h-10 text-white font-bold rounded"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="All">Toutes les régions</option>
          <option value="Asia">Asie</option>
          <option value="Americas">Amériques</option>
          <option value="Oceania">Océanie</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Afrique</option>
        </select>

        {/* Sous-région */}
        <select
          className="border border-white cursor-pointer bg-[#1E1F22] p-1 w-50 h-10 text-white font-bold rounded"
          value={subregionFilter}
          onChange={(e) => setSubregionFilter(e.target.value)}
        >
          <option value="All">Toutes les sous-régions</option>
          {subregions.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        {/* Population min/max */}
        <input
          className="border border-white text-white h-10 p-2 rounded bg-[#1E1F22] w-32"
          type="number"
          placeholder="Pop min"
          value={populationMin}
          onChange={(e) => setPopulationMin(e.target.value)}
        />
        <input
          className="border border-white text-white h-10 p-2 rounded bg-[#1E1F22] w-32"
          type="number"
          placeholder="Pop max"
          value={populationMax}
          onChange={(e) => setPopulationMax(e.target.value)}
        />

        {/* Surface min/max */}
        <input
          className="border border-white text-white h-10 p-2 rounded bg-[#1E1F22] w-32"
          type="number"
          placeholder="Surface min km²"
          value={areaMin}
          onChange={(e) => setAreaMin(e.target.value)}
        />
        <input
          className="border border-white text-white h-10 p-2 rounded bg-[#1E1F22] w-32"
          type="number"
          placeholder="Surface max km²"
          value={areaMax}
          onChange={(e) => setAreaMax(e.target.value)}
        />
      </div>

      {/* Liste des pays + pagination */}
      <div className="flex flex-wrap justify-around items-start mt-10 mx-20">
        {status === "loading" ? (
          <div className="w-full flex justify-center mt-20">
            <CirclesWithBar
              height="100"
              width="100"
              color="#4fa94d"
              outerCircleColor="#4fa94d"
              innerCircleColor="#4fa94d"
              barColor="#4fa94d"
              ariaLabel="loading"
              visible={true}
            />
          </div>
        ) : filteredCountries.length === 0 ? (
          <p className="text-white text-center w-full mt-10">
            Aucun pays trouvé pour ces critères.
          </p>
        ) : (
          <>
            {displayCountries.map((country) => (
              <Card key={country.name.common} country={country} />
            ))}

            {/* ReactPaginate */}
            <div className="w-full flex justify-center mt-10">
              <ReactPaginate
                previousLabel={"← Précédent"}
                nextLabel={"Suivant →"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"flex gap-2"}
                previousLinkClassName={"px-4 py-2 bg-gray-700 rounded"}
                nextLinkClassName={"px-4 py-2 bg-gray-700 rounded"}
                disabledClassName={"opacity-50 cursor-not-allowed"}
                activeClassName={"bg-blue-500 text-white px-4 py-2 rounded"}
                pageLinkClassName={"px-4 py-2 bg-gray-700 rounded"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
