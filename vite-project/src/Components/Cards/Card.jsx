import { useState } from "react";
import ButtonCustom from "../Controls/Button";
import Modal from "../Controls/Modal";

function Card({ country }) {
  const [isOpen, setIsOpen] = useState(false);

  // Vérifier si les coordonnées existent
  const hasCoords = country.latlng && country.latlng.length === 2;
  let bbox, marker;

  if (hasCoords) {
    const lat = country.latlng[0];
    const lng = country.latlng[1];
    const offset = 1; // ajustable pour le zoom
    bbox = `${lng - offset}%2C${lat - offset}%2C${lng + offset}%2C${lat + offset}`;
    marker = `${lat},${lng}`;
  }

  return (
    <div className="w-[20%] h-auto border border-white m-3 rounded overflow-hidden shadow-lg bg-[#1E1F22]">
      <img
        src={country.flags.png}
        alt={`${country.name.common} drapeau`}
        className="m-2 bg-slate-500 w-[95%] h-48 object-cover rounded"
      />

      <div className="m-2 text-white">
        <h2 className="font-bold text-lg">{country.name.common}</h2>
        <p>
          Population: <span className="font-bold">{country.population?.toLocaleString()} Hab</span>
        </p>
        <p>
          Region: <span className="font-bold">{country.region}</span>
        </p>
        <p>
          Capitale: <span className="font-bold">{country.capital?.join(", ") || "N/A"}</span>
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer mt-4 bg-blue-600 w-full py-2 rounded hover:bg-blue-700"
        >
          Voir plus
        </button>

        {/* Modal */}
        <Modal show={isOpen} onClose={() => setIsOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>

          {/* Tableau avec toutes les infos */}
          <table className="table-auto w-full text-left border border-gray-500 mb-4">
            <tbody>
              <tr>
                <th className="border px-2 py-1">Nom officiel</th>
                <td className="border px-2 py-1">{country.name.official}</td>
              </tr>
              <tr>
                <th className="border px-2 py-1">Capitale</th>
                <td className="border px-2 py-1">{country.capital?.join(", ") || "N/A"}</td>
              </tr>
              <tr>
                <th className="border px-2 py-1">Région</th>
                <td className="border px-2 py-1">{country.region}</td>
              </tr>
              <tr>
                <th className="border px-2 py-1">Sous-région</th>
                <td className="border px-2 py-1">{country.subregion}</td>
              </tr>
              <tr>
                <th className="border px-2 py-1">Population</th>
                <td className="border px-2 py-1">{country.population?.toLocaleString()}</td>
              </tr>
              <tr>
                <th className="border px-2 py-1">Superficie (km²)</th>
                <td className="border px-2 py-1">{country.area?.toLocaleString()}</td>
              </tr>
              <tr>
                <th className="border px-2 py-1">Langues</th>
                <td className="border px-2 py-1">
                  {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
                </td>
              </tr>
              <tr>
                <th className="border px-2 py-1">Monnaies</th>
                <td className="border px-2 py-1">
                  {country.currencies
                    ? Object.values(country.currencies)
                        .map((c) => `${c.name} (${c.symbol})`)
                        .join(", ")
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th className="border px-2 py-1">Google Maps</th>
                <td className="border px-2 py-1">
                  <a
                    href={country.maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Lien
                  </a>
                </td>
              </tr>
              <tr>
                <th className="border px-2 py-1">OpenStreetMap</th>
                <td className="border px-2 py-1">
                  <a
                    href={country.maps.openStreetMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Lien
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Carte OpenStreetMap intégrée */}
          {hasCoords ? (
            <div className="w-full h-64 mb-4">
              <iframe
                title={`map-${country.name.common}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`}
                width="100%"
                height="100%"
                style={{ border: 1 }}
              />
            </div>
          ) : (
            <p className="text-gray-400">Coordonnées non disponibles</p>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="bg-green-600 px-3 py-1 mt-2 rounded hover:bg-green-700"
          >
            Fermer
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default Card;
