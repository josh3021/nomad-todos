import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import ToDoList from "./components/ToDoList";
import { Reset } from "./styles/Reset";
import { darkTheme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>
        <Reset />
        <ToDoList />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
