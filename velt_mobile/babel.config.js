module.exports = function (api) {
    api.cache(true);               // acelera compilaciones
  
    return {
      // Preset que ya lleva todo lo necesario para RN / Expo
      presets: ['babel-preset-expo'],
  
      // Plugins adicionales
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],                  // punto de partida (la raíz)
            extensions: ['.js', '.jsx', '.json'],
            alias: {
              '@': './',                   // import '@/navigation/RootNavigator'
              '@/app': './app',            // import { login } from '@/app/api'
              '@/components': './components'
              // añade más si lo necesitas
            }
          }
        ]
      ]
    };
  };