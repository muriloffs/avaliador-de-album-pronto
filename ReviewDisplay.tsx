import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Disc, Music, BarChart2, BookOpen, ImageIcon, ThumbsUp, GitMerge, Users, Star, BrainCircuit, CheckSquare, Music4 } from 'lucide-react';

interface ReviewDisplayProps {
    content: string;
    isStreaming: boolean;
}

const ProgressBar: React.FC = () => (
    <div className="relative w-full h-1.5 overflow-hidden bg-gray-700/50 rounded-full mb-8">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-shimmer"></div>
    </div>
);

const iconMapping: { [key: string]: React.ReactNode } = {
    'Fatos Rápidos': <BarChart2 className="w-7 h-7 flex-shrink-0" />,
    'Contexto e Intenção Artística': <BookOpen className="w-7 h-7 flex-shrink-0" />,
    'Estilo e Produção': <Music className="w-7 h-7 flex-shrink-0" />,
    'Análise Faixa a Faixa': <Disc className="w-7 h-7 flex-shrink-0" />,
    'Imagens Chave': <ImageIcon className="w-7 h-7 flex-shrink-0" />,
    'Pontos Altos e Baixos': <ThumbsUp className="w-7 h-7 flex-shrink-0" />,
    'Genealogia Sônica e Comparações': <GitMerge className="w-7 h-7 flex-shrink-0" />,
    'Para Quem Gosta de': <Users className="w-7 h-7 flex-shrink-0" />,
    'A Faixa Essencial': <Star className="w-7 h-7 flex-shrink-0" />,
    'Relevância Moderna': <BrainCircuit className="w-7 h-7 flex-shrink-0" />,
    'Veredito Final': <CheckSquare className="w-7 h-7 flex-shrink-0" />,
};

const SectionHeader = ({ children }: { children: React.ReactNode }) => {
    const titleText = React.Children.toArray(children).join('').replace(/\d+\.\s*/, '').trim();
    const icon = iconMapping[titleText] || null;

    return (
        <h2 className="text-3xl font-bold text-pink-400 mt-12 mb-6 pb-3 border-b-2 border-pink-400/30 flex items-center gap-4">
            {icon}
            <span>{children}</span>
        </h2>
    );
};

const customRenderers = {
  // FIX: The h2 renderer was incorrectly defined, causing it to call SectionHeader without the required `children` prop.
  h2: ({ children }) => <SectionHeader>{children}</SectionHeader>,
  h3: ({ ...props }) => <h3 className="text-xl font-semibold text-purple-300 mt-8 mb-4 flex items-center gap-2"><Music4 className="w-5 h-5" /><span>{props.children}</span></h3>,
  p: ({ ...props }) => <p className="text-gray-300 leading-relaxed mb-4 text-base" {...props} />,
  ul: ({ ...props }) => <ul className="list-none space-y-3 mb-6 pl-2" {...props} />,
  li: ({ ...props }) => (
        <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">&#8227;</span> 
            <span className="flex-1 text-gray-300">{props.children}</span>
        </li>
    ),
  strong: ({ ...props }) => <strong className="font-semibold text-gray-100" {...props} />,
  a: ({ ...props }) => <a className="text-teal-400 font-medium hover:text-teal-300 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  blockquote: ({ ...props }) => <blockquote className="border-l-4 border-purple-500 bg-gray-800/40 p-4 rounded-r-lg italic text-gray-400 my-6" {...props} />,
  hr: ({ ...props }) => <hr className="my-12 border-t border-gray-700/50" {...props} />,
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
        <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            customStyle={{borderRadius: '0.5rem', margin: '1rem 0', background: '#1E1E1E'}}
            {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    ) : (
        <code className="bg-gray-700 text-pink-300 rounded-md px-1.5 py-0.5 font-mono text-sm mx-1" {...props}>
            {children}
        </code>
    )
  }
};


export const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ content, isStreaming }) => {
    return (
        <div className="animate-fade-in">
            {isStreaming && content.length > 0 && <ProgressBar />}
            <ReactMarkdown components={customRenderers}>
                {content}
            </ReactMarkdown>
        </div>
    );
};