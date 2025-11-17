import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const albumSuggestionPrompt = (artist: string) => `
Com base no artista "${artist}", forneça uma lista de seus 5 álbuns de estúdio mais populares ou aclamados pela crítica.
Retorne o resultado como um array JSON limpo de strings, onde cada string é o título de um álbum. Não inclua nenhum outro texto ou formatação.
Exemplo: ["Álbum Um", "Álbum Dois", "Álbum Três"]
`;

const reviewPromptTemplate = (artist: string, album: string) => `
Aja como um crítico de música e pesquisador de cultura pop de classe mundial.
IMPORTANTE: Sua resposta inteira deve ser em Português do Brasil.
**Use a formatação Markdown para a sua resposta. Use títulos de Nível 2 (##) para cada um dos 11 ENTREGÁVEIS principais. Use títulos de Nível 3 (###) para subtítulos dentro das seções (ex: nomes de faixas, subseções como 'Análise da Arte da Capa').**

Sua tarefa é produzir uma ANÁLISE COMPLETA E DETALHADA do álbum "${album}" do artista "${artist}".
Baseie sua análise em pesquisas extensas de fontes confiáveis e atualizadas.

ENTREGÁVEIS:

## 1. Fatos Rápidos
   - Título do Álbum, Artista, Ano de Lançamento, Gravadora, Produtores Principais, Duração, Colaborações Notáveis, Prêmios/Indicações Importantes, Posições de Pico nas Paradas.
   ### Análise da Arte da Capa
   Descreva o autor/designer da capa, estilo, impacto estético e qualquer simbolismo subjacente.

## 2. Contexto e Intenção Artística
   - O estágio da carreira do artista na época, temas centrais e motivações para o álbum.
   ### Bastidores
   Detalhes importantes sobre o processo de gravação, instrumentos usados e colaborações notáveis.
   ### Referências Culturais
   Influências de filmes, movimentos sociais, política ou cultura da internet daquela época.
   ### Sinergia Audiovisual
   Como a identidade visual do álbum (arte da capa, videoclipes, direção de arte) complementa seu som.

## 3. Estilo e Produção
   ### Paleta Sonora
   Descreva os principais instrumentos, timbres e texturas.
   ### Harmonia e Ritmo
   Estruturas comuns e quaisquer abordagens inovadoras.
   ### Mixagem/Masterização
   Clareza, dinâmica e atmosfera sônica geral.
   ### Análise Lírica
   Temas dominantes, símbolos, metáforas e arquétipos.
   ### Som Visual
   Como o álbum pode "soar" visualmente (ex: cores, ritmo de edição em videoclipes).
   ### Intertextualidade
   Conexões com cinema, pintura, literatura ou outras formas de arte.

## 4. Análise Faixa a Faixa
   Para cada música da lista de faixas oficial, forneça:
   ### [Nome da Faixa]
   - **Tom/Tempo:** Sensação geral e velocidade.
   - **Instrumentação e Textura:** Instrumentos principais e camadas sônicas.
   - **Estrutura:** ex: verso-refrão-ponte, variações.
   - **Referência Estética:** ex: dream pop, post-punk, art pop.
   - **Momentos Chave (com marcações de tempo):** ex: (0:00) introdução; (0:45) refrão; (2:10) ponte; final.
   - **Trecho da Letra e Interpretação:** Um trecho curto da letra (máx. 10 palavras) e seu significado.
   - **Recepção:** Por que os fãs amam ou criticam; notas críticas específicas, se disponíveis.
   - **Pegada Cultural:** Uso em filmes, séries, tendências virais, anúncios e elementos visuais chave de seu videoclipe (figurinos, direção).
   - **Se não existir uma crítica publicada específica para uma faixa:** Forneça sua própria análise técnico-musical, rotule-a como "(inferência crítica)" e baseie-a em evidências audíveis (timbre, arranjo, produção, performance).
   - **Omita uma faixa apenas se** NÃO houver áudio oficial e NENHUM dado verificável; neste caso, escreva "Nenhum material verificável para análise — faixa não lançada/não publicada."

## 5. Imagens Chave
   ### Capa do Álbum
   Seu design, criador e impacto.
   ### Foto Icônica da Época
   Sua estética e significado simbólico.
   ### Destaque Visual
   Um momento marcante de um videoclipe ou performance, analisando sua linguagem, narrativa e paleta de cores.

## 6. Pontos Altos e Baixos
   - Pontos fortes e possíveis fraquezas musicais, líricas e visuais.
   - Avalie a coesão estética geral (som + imagem + conceito).

## 7. Genealogia Sônica e Comparações
   ### Álbuns Relacionados
   3 a 5 álbuns com som, produção ou atmosfera semelhantes.
   ### Posicionamento no Gênero
   Onde este álbum se encaixa na história de seu(s) gênero(s).

## 8. Para Quem Gosta de
   - Perfis de ouvintes em potencial e recomendações estéticas.
   - Liste artistas semelhantes e explique o porquê (ex: atitude, timbre, visuais, temas).

## 9. A Faixa Essencial
   - Selecione a faixa mais importante do álbum.
   - Forneça uma análise profunda de sua música, letra e significado cultural.
   - O que ouvir: detalhes específicos, motivos, harmonias, escolhas de produção.

## 10. Relevância Moderna
    - Seu impacto atual (na crítica, no fandom, em plataformas como TikTok/YouTube, na moda, no cinema).
    - Conversas que ela gera hoje (ex: autenticidade, identidade, performance, nostalgia).

## 11. Veredito Final
    ### A Alma do Álbum
    Duas frases que resumem sua essência.
    ### Crítica Especializada (Resumo)
    Pesquise e resuma a recepção crítica de 3 a 5 publicações musicais importantes (como Pitchfork, Rolling Stone, NME, Billboard, The Guardian). Para cada uma, forneça uma frase curta que capture a essência de sua avaliação e perspectiva (ex: "Pitchfork: 'Uma obra-prima inesperada que redefine o som da banda.'", "NME: 'Uma decepção comercial, mas um favorito cult.'").
    ### Nota
    Uma pontuação numérica (0 a 10) ou uma classificação verbal (ex: "Essencial", "Um Clássico Cult Moderno", "Uma Transição Ousada").
`;

export const suggestAlbums = async (artist: string): Promise<string[]> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: albumSuggestionPrompt(artist),
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING
                }
            }
        }
    });
    
    const text = response.text.trim();
    try {
        const albums = JSON.parse(text);
        if (Array.isArray(albums) && albums.every(item => typeof item === 'string')) {
            return albums;
        }
        return [];
    } catch (e) {
        console.error("Failed to parse album suggestions:", e);
        // Fallback for non-JSON or malformed responses
        return text.split('\n').map(s => s.trim().replace(/^- /, '')).filter(Boolean);
    }
};

export async function* generateAlbumReview(artist: string, album: string): AsyncGenerator<string> {
    const stream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: reviewPromptTemplate(artist, album),
        config: {
            tools: [{ googleSearch: {} }]
        }
    });

    for await (const chunk of stream) {
        yield chunk.text;
    }
}