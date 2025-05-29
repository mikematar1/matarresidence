import * as React from "react";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

//apis
import CancelReservation from "../../api-client/Account/CancelReservation";

export default function HotelTables({ columns, initialRows }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [rows, setRows] = React.useState(initialRows);
  const handleCancel = (id) => {
    let response = CancelReservation(id);
    response.then((res) => {
      if (res === "success") {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        localStorage.setItem("shouldReload", "true");
      }
    });
  };
  const handleEdit = (room) => {
    navigate(`/reservations/edit`, { state: { data: room } });
  };
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <div className="res-buttons">
                      <div className="table-button">
                        <button onClick={() => handleEdit(row)}>
                          {t("edit")}
                        </button>
                      </div>{" "}
                      <div className="table-button">
                        <button onClick={() => handleCancel(row.id)}>
                          {t("cancel")}
                        </button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
