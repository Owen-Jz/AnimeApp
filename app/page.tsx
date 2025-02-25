// app/page.tsx
"use client";

import { useState } from "react";
import "@fontsource/inter";
import Request from "@/components/request";

interface Character {
  character: {
    mal_id: number;
    name: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    about: string | null;
  };
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("Naruto");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center bg-[#202020] min-h-screen py-10 px-5 md:px-20 font-inter">
      <img
        className="max-w-lg h-[258px]"
        src="/anime-logo.png"
        alt="Anime Banner"
      />
      <h2 className="text-white text-center text-2xl md:text-3xl mt-6 sm:mt-8">
        Search below for characters in an anime
      </h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4 w-full max-w-md p-3 text-white bg-[#2a2a2a] border border-white rounded-lg focus:outline-none"
      />

      <Request
        searchTerm={searchTerm}
        onCharactersFetched={setCharacters}
        onLoading={setLoading}
        onError={setError}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="max-w-full px-6 py-10 bg-[#2a2a2a] rounded-[22px] shadow-lg flex flex-col items-center gap-6 sm:gap-8 mt-6 sm:mt-8">
        <div className="text-center text-white text-2xl sm:text-3xl font-bold">
          {searchTerm} Characters
        </div>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {characters.map((character) => (
              <div
                key={character.character.mal_id}
                className="p-6 bg-[#202020] rounded-xl flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-sm mx-auto"
              >
                <img
                  className="w-[150px] h-[200px] sm:w-[150px] sm:h-[200px] lg:w-[150px] lg:h-[200px] rounded-xl"
                  src={character.character.images.jpg.image_url}
                  alt={character.character.name}
                />
                <div className="text-center text-white">
                  <div className="text-lg sm:text-xl font-bold">
                    {character.character.name}
                  </div>
                  {/* <div className="text-sm font-bold">
                    {character.character.about || "No description available."}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}