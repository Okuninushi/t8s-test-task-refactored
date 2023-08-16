import * as React from "react";
import TablePaginationActions from "./TablePaginationActions";
import { useContext } from "react";
import { Context } from "../context";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const FilteredList = ({ searchString }) => {
  const { data } = useContext(Context);

  const filteredList = data.filter((character) => {
    if (searchString === "") {
      return character;
    } else {
      return character.name.toLowerCase().includes(searchString);
    }
  });
  const rows = [].sort((a, b) => (a.name < b.name ? -1 : 1));

  for (let i = 0; i < filteredList.length; i++) {
    rows.push({
      name: filteredList[i].name,
      status: filteredList[i].status,
      gender: filteredList[i].gender,
      totalAmountOfEpisodes: filteredList[i].episode.length,
    });
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {rows.length === 0
              ? <TableCell>There is no such character</TableCell>
              : Object.keys(rows[0])
                  .map((key) =>
                    (key.split("")[0].toUpperCase() + key.slice(1)).replace(
                      /([a-z0-9])([A-Z])/g,
                      "$1 $2",
                    ),
                  )
                  .map((title) => <TableCell key={title}>{title}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.totalAmountOfEpisodes}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default FilteredList;
