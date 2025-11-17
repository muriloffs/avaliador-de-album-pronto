import React from 'react';
import { Disc } from 'lucide-react';

interface AlbumSuggestionsProps {
    artist: string;
    suggestions: string[];
    onSelect: (album: string) => void;
}

export const AlbumSuggestions: React.FC<AlbumSuggestionsProps> = ({ artist, suggestions, onSelect }) => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-4 text-pink-400">Selecione um Álbum de {artist}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestions.map((album) => (
                    <button
                        key={album}
                        onClick={() => onSelect(album)}
                        className="flex items-center gap-4 p-4 bg-gray-700/60 rounded-lg border border-gray-600 hover:bg-purple-600/50 hover:border-purple-500 transition-all text-left group"
                    >
                        <Disc className="w-6 h-6 text-purple-400 group-hover:animate-spin-slow" />
                        <span className="text-lg font-medium text-gray-200">{album}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
