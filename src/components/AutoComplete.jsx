import { useContext } from "react";
import { Context } from "../context";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutoComplete({ handleInput }) {
  
  const { data} = useContext(Context);
  
  return (
    <Stack spacing={2} >
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            onSelect={handleInput}
            {...params}
            label="Search..."
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
}
