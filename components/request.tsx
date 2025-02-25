// components/Request.tsx
import { useEffect } from "react";

interface Anime {
  mal_id: number;
  title: string;
  synopsis: string | null;
  aired?: {
    from?: string;
  };
}

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

interface RequestProps {
  searchTerm: string;
  onCharactersFetched: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
}

function Request({ searchTerm, onCharactersFetched, onLoading, onError }: RequestProps) {
  useEffect(() => {
    const fetchAnimeData = async () => {
      if (!searchTerm.trim()) return;

      onLoading(true);
      onError(null);
      onCharactersFetched([]);

      try {
        // Step 1: Search for the anime by name
        const searchResponse = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchTerm)}&limit=1`
        );
        
        const searchData = await searchResponse.json();

        if (!searchData.data || searchData.data.length === 0) {
          throw new Error("Anime not found.");
        }

        const anime: Anime = searchData.data[0];

        // Step 2: Fetch characters for the anime using its ID
        const charactersResponse = await fetch(
          `https://api.jikan.moe/v4/anime/${anime.mal_id}/characters`
        );

        if (!charactersResponse.ok) {
          throw new Error("Failed to fetch characters.");
        }

        const charactersData = await charactersResponse.json();

        // Extract character details
        const characterList: Character[] = charactersData.data;
        onCharactersFetched(characterList);
      } catch (error) {
        onError((error as Error).message);
      } finally {
        onLoading(false);
      }
    };

    fetchAnimeData();
  }, [searchTerm, onCharactersFetched, onLoading, onError]);

  return null; // This component doesn't render anything
}

export default Request;