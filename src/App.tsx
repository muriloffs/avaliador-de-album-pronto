import React, { useState, useCallback } from 'react';
import { SearchForm } from './components/SearchForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AlbumSuggestions } from './components/AlbumSuggestions';
import { ReviewDisplay } from './components/ReviewDisplay';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ErrorDisplay } from './components/ErrorDisplay';
import { suggestAlbums, generateAlbumReview } from './services/geminiService';
import { Music, Sparkles } from 'lucide-react';

const App: React.FC = () => {
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [review, setReview] = useState<string | null>(null);

    const handleSearch = useCallback(async (searchArtist: string, searchAlbum: string) => {
        setIsLoading(true);
        setError(null);
        setSuggestions([]);
        setReview(null);
        
        try {
            if (searchArtist && !searchAlbum) {
                setLoadingMessage(`Encontrando álbuns de ${searchArtist}...`);
                const albumSuggestions = await suggestAlbums(searchArtist);
                setSuggestions(albumSuggestions);
            } else if (searchArtist && searchAlbum) {
                setLoadingMessage(`Gerando uma análise profunda de ${searchAlbum} por ${searchArtist}...`);
                setReview(''); // Initialize review for streaming
                const stream = generateAlbumReview(searchArtist, searchAlbum);
                for await (const chunk of stream) {
                    setReview(prev => (prev ?? '') + chunk);
                }
            }
        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao comunicar com a IA. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, []);

    const handleSuggestionClick = useCallback((selectedAlbum: string) => {
        setAlbum(selectedAlbum);
        setSuggestions([]);
        handleSearch(artist, selectedAlbum);
    }, [artist, handleSearch]);

    const resetState = () => {
        setArtist('');
        setAlbum('');
        setIsLoading(false);
        setLoadingMessage('');
        setError(null);
        setSuggestions([]);
        setReview(null);
    };

    const showWelcome = !isLoading && !error && !review && suggestions.length === 0;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <header 
                    onClick={resetState}
                    className="flex items-center justify-center gap-4 mb-8 cursor-pointer group"
                >
                    <Music className="w-10 h-10 text-purple-400 group-hover:animate-pulse" />
                    <h1 className="text-4xl sm:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-pink-500 group-hover:to-purple-400 transition-all duration-300">
                        Analisador de Álbuns com IA
                    </h1>
                    <Sparkles className="w-10 h-10 text-pink-400 group-hover:animate-pulse" />
                </header>

                <main className="bg-gray-800/50 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm border border-gray-700/50">
                    <SearchForm
                        artist={artist}
                        setArtist={setArtist}
                        album={album}
                        setAlbum={setAlbum}
                        onSearch={handleSearch}
                        isLoading={isLoading}
                    />

                    <div className="mt-6 min-h-[300px]">
                        {isLoading && !review && <LoadingSpinner message={loadingMessage} />}
                        {error && <ErrorDisplay message={error} />}
                        
                        {!isLoading && !error && suggestions.length > 0 && (
                            <AlbumSuggestions
                                artist={artist}
                                suggestions={suggestions}
                                onSelect={handleSuggestionClick}
                            />
                        )}
                        
                        {review !== null && <ReviewDisplay content={review} isStreaming={isLoading} />}
                        
                        {showWelcome && <WelcomeScreen />}
                    </div>
                </main>

                <footer className="text-center mt-8 text-gray-500 text-sm">
                    <p>Desenvolvido com Gemini. As análises são geradas por IA e podem conter imprecisões.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
