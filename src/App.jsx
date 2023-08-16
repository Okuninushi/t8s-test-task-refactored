import CharactersTable from "./components/CharactersTable";
import { useCharacters } from "./hooks/useCharacters";
import { Context } from "./context";

const App = () => {
  const { data, isLoading, error } = useCharacters();
  return (
    <Context.Provider value={{ data }}>
      {error ? (
        <h1>Error has occured: {error.message}</h1>
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : data.length ? (
        <CharactersTable />
      ) : (
        <h1>No data available</h1>
      )}
    </Context.Provider>
  );
};

export default App;
