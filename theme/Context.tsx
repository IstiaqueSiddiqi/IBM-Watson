import { createContext, FC, ReactNode, useContext, useState } from "react";
import { createTheme } from "@material-ui/core";

interface IAppThemeProviderProps {
  children: ReactNode;
}

/**
 * App theme
 */
const getTheme = (mode = 'light') => {
  const defaultTheme: any = {
    palette: {
      mode: 'light',
      primary: {
        main: '#009688',
        light: '#52c7b8',
        dark: '#00675b',
        contrastText: '#000000'
      },
      secondary: {
        main: '#ffc107',
        light: '#fff350',
        dark: '#c79100',
        contrastText: '#000000'
      },
      divider: '#BDBDBD'
    }
  };

  return createTheme(defaultTheme);
};

const ThemeContext = createContext<any>([getTheme(), () => { }]);

const useThemeContext = () => {
  const [appTheme, setAppTheme] = useContext<any>(ThemeContext);

  const handleThemeContext = (darkMode: boolean) => {
    setAppTheme(getTheme(darkMode ? 'dark' : 'light'));
  };

  return { appTheme, enableDarkTheme: handleThemeContext };
};

const AppThemeProvider: FC<IAppThemeProviderProps> = ({ children }) => {
  const [appTheme, setAppTheme] = useState<any>(getTheme());

  return (
    <ThemeContext.Provider value={[appTheme, setAppTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};


export { AppThemeProvider, useThemeContext }