import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
    message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-red-900/20 border border-red-500/50 rounded-lg animate-fade-in">
            <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-2xl font-bold text-red-300">Oops! Algo deu errado.</h3>
            <p className="mt-2 text-lg text-red-300/80">{message}</p>
        </div>
    );
};
