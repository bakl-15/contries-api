export default function Modal({ show, onClose, children }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="bg-[#1E1F22] text-white p-6 rounded-lg shadow-xl w-96 relative">

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl hover:text-red-400"
        >
          ×
        </button>

        {/* Contenu du popup */}
        {children}
      </div>

    </div>
  )
}