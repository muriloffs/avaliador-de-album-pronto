import React from 'react';
import { Mic, GitBranch, SearchCheck } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
    return (
        <div className="text-center p-4 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">Seu Musicólogo Pessoal</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Insira um artista para descobrir seus álbuns, ou forneça um artista e um título de álbum para gerar uma análise rica e aprofundada com a tecnologia Gemini.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                    <div className="p-4 bg-purple-500/20 rounded-full mb-4">
                        <Mic className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Descubra Álbuns</h3>
                    <p className="text-gray-400">Insira apenas o nome de um artista e sugeriremos seus principais álbuns para você explorar.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="p-4 bg-pink-500/20 rounded-full mb-4">
                        <GitBranch className="w-8 h-8 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Análises Aprofundadas</h3>
                    <p className="text-gray-400">Obtenha uma análise completa, desde o detalhamento faixa a faixa até o impacto cultural.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="p-4 bg-teal-500/20 rounded-full mb-4">
                        <SearchCheck className="w-8 h-8 text-teal-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Informações Atualizadas</h3>
                    <p className="text-gray-400">Nossas análises usam a busca do Google para fornecer informações atuais e relevantes.</p>
                </div>
            </div>
        </div>
    );
};
