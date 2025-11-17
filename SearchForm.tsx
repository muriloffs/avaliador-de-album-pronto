import React from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
    artist: string;
    setArtist: (artist: string) => void;
    album: string;
    setAlbum: (album: string) => void;
    onSearch: (artist: string, album: string) => void;
    isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ artist, setArtist, album, setAlbum, onSearch, isLoading }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(artist, album);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Nome do Artista"
                className="flex-grow bg-gray-700/50 text-white placeholder-gray-400 rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
                disabled={isLoading}
            />
            <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Título do Álbum (Opcional)"
                className="flex-grow bg-gray-700/50 text-white placeholder-gray-400 rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={isLoading || !artist}
                className="flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
                <Search className="w-5 h-5" />
                <span>{isLoading ? 'Pensando...' : 'Gerar'}</span>
            </button>
        </form>
    );
};