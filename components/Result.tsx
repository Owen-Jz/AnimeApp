import React from 'react'

const Result = () => {
  return (
    <div className="flex items-center bg-[#202020] p-4 rounded-2xl border border-white">
          <img
            className="w-20 h-20 rounded-lg"
            src=""
            alt=""
          />
          <div className="ml-4 text-white">
            <h4 className="text-xl font-bold">Tanjiro</h4>
            <p className="text-sm font-bold text-gray-400">THe guy</p>
            <p className="text-xs mt-1">Squad leader</p>
          </div>
        </div>
  )
}

export default Result;




// <div className="mt-5 space-y-5">
// {filteredCharacters.length > 0 ? (
//   filteredCharacters.map((character, index) => (
//     <div
//       key={index}
//       className="flex items-center bg-[#202020] p-4 rounded-2xl border border-white"
//     >
//       <img
//         className="w-20 h-20 rounded-lg"
//         src={character.image}
//         alt={character.name}
//       />
//       <div className="ml-4 text-white">
//         <h4 className="text-xl font-bold">{character.name}</h4>
//         <p className="text-sm font-bold text-gray-400">{character.alias}</p>
//         <p className="text-xs mt-1">{character.description}</p>
//       </div>
//     </div>
//   ))
// ) : (
//   <p className="text-white text-center">No characters found.</p>
// )}
// </div>