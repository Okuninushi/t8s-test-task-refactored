import React, { useCallback } from "react";
import AutoComplete from "./AutoComplete";
import FilteredList from "./FilteredList";
import { debounce } from "../utils/debounce";

import Paper from "@mui/material/Paper";


const CharactersTable = () => {
  const [input, setInput] = React.useState("");
  
  

  const handleInput = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const optimizedWithDebounce = useCallback(debounce(handleInput), [])

  return (
    <Paper>
      <AutoComplete handleInput={optimizedWithDebounce} />
      <FilteredList searchString={input} />
    </Paper>
  );
};
export default CharactersTable;
