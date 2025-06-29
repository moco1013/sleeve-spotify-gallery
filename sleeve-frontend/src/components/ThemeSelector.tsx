import React from 'react';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 30px;
  padding: 0 20px;
`;

const SelectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
`;

const ThemeButton = styled.button<{ active: boolean }>`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #1DB954 0%, #1ed760 100%)' 
    : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#fff' : '#b3b3b3'};
  border: 1px solid ${props => props.active ? '#1DB954' : 'rgba(255, 255, 255, 0.2)'};
  padding: 12px 16px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #1DB954 0%, #1ed760 100%)' 
      : 'rgba(255, 255, 255, 0.2)'};
    color: #fff;
    transform: translateY(-2px);
  }
`;

const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`;

const MoodButton = styled.button<{ active: boolean }>`
  background: ${props => props.active 
    ? 'rgba(29, 185, 84, 0.3)' 
    : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.active ? '#1ed760' : '#888'};
  border: 1px solid ${props => props.active ? '#1DB954' : 'rgba(255, 255, 255, 0.1)'};
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(29, 185, 84, 0.2);
    color: #1ed760;
  }
`;

interface ThemeSelectorProps {
  currentTheme: string;
  currentSubTheme?: string;
  onThemeChange: (theme: string, subTheme?: string) => void;
}

const themes = [
  { id: 'new-releases', label: '新着アルバム', emoji: '🆕' },
  { id: 'popular', label: '人気アルバム', emoji: '🔥' },
  { id: 'genre', label: 'ジャンル別', emoji: '🎵' },
  { id: 'mood', label: 'ムード別', emoji: '😊' },
];

const genres = [
  'pop', 'rock', 'hip-hop', 'electronic', 'jazz', 'classical', 
  'indie', 'alternative', 'R&B', 'country', 'reggae', 'blues'
];

const moods = [
  { id: 'happy', label: 'ハッピー', emoji: '😊' },
  { id: 'chill', label: 'チル', emoji: '😌' },
  { id: 'party', label: 'パーティー', emoji: '🎉' },
  { id: 'workout', label: 'ワークアウト', emoji: '💪' },
  { id: 'focus', label: '集中', emoji: '🎯' },
  { id: 'sleep', label: 'リラックス', emoji: '😴' },
  { id: 'sad', label: 'センチメンタル', emoji: '😢' },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  currentTheme, 
  currentSubTheme, 
  onThemeChange 
}) => {
  return (
    <SelectorContainer>
      <SelectorGrid>
        {themes.map(theme => (
          <ThemeButton
            key={theme.id}
            active={currentTheme === theme.id}
            onClick={() => onThemeChange(theme.id)}
          >
            <span style={{ marginRight: '6px' }}>{theme.emoji}</span>
            {theme.label}
          </ThemeButton>
        ))}
      </SelectorGrid>

      {currentTheme === 'genre' && (
        <MoodGrid>
          {genres.map(genre => (
            <MoodButton
              key={genre}
              active={currentSubTheme === genre}
              onClick={() => onThemeChange('genre', genre)}
            >
              {genre}
            </MoodButton>
          ))}
        </MoodGrid>
      )}

      {currentTheme === 'mood' && (
        <MoodGrid>
          {moods.map(mood => (
            <MoodButton
              key={mood.id}
              active={currentSubTheme === mood.id}
              onClick={() => onThemeChange('mood', mood.id)}
            >
              <span style={{ marginRight: '4px' }}>{mood.emoji}</span>
              {mood.label}
            </MoodButton>
          ))}
        </MoodGrid>
      )}
    </SelectorContainer>
  );
};

export default ThemeSelector;