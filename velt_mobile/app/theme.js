import { MD3LightTheme as Default } from 'react-native-paper';

export const theme = {
  ...Default,                    // heredamos colores Material 3
  roundness: 8,
  colors: {
    ...Default.colors,
    primary:   '#1E88E5',        // azul VELT
    secondary: '#FFC107',
    error:     '#EF5350',
  },
};