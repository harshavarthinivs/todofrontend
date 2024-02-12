import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";


import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import propTypes from "prop-types";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import {
  deleteTodoBulkThunk,
  updateTodoStatusBulkThunk
} from "../../../redux/slices/loginSlice";
import { enqueue } from "../../../redux/slices/snackbarSlice";
import { DeletedItem, DeletedItemUI } from "./DeletedItem";
import useDeletedTodos from "./useDeletedTodos";

export const DeleteDialog = ({
  deleteDialog,
  setDeleteDialog,
  callbackFunction,
  message,
  buttonName,
}) => {
  const handleConfirmButtonlick = () => {
    callbackFunction();
    setDeleteDialog(false);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  return (
    <Dialog open={deleteDialog} onClose={closeDeleteDialog}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ bgcolor: red[500] }}>
          <DeleteIcon />
        </Avatar>
      </DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          onClick={closeDeleteDialog}
          color="primary"
          variant="contained"
          fullWidth
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirmButtonlick}
          color="secondary"
          autoFocus
          variant="contained"
          fullWidth
        >
          {buttonName}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  deleteDialog: propTypes.bool.isRequired,
  setDeleteDialog: propTypes.func.isRequired,
  callbackFunction: propTypes.func.isRequired,
  message: propTypes.string.isRequired,
  buttonName: propTypes.string.isRequired,
};

const DeletedTodoListUI = (props) => {
  const [token] = useLocalStorage("token", "");
  const dispatch = useDispatch();

  const [deleteDialogState, setDeleteDialogState] = useState(false);

  const handleRestoreAllClick = async () => {
    const data = [];
    props.todos.forEach((element) => {
      data.push({
        id: element.id,
        status: {
          status: element.status.slice("DELETED_".length),
        },
      });
    });
    dispatch(updateTodoStatusBulkThunk({ data, token }));
  };

  const handleDeleteAllButton = () => {
    setDeleteDialogState(true);
  };

  const handleDeleteAllCallback = async () => {
    const data = props.todos.map((element) => element.id);
    dispatch(deleteTodoBulkThunk({ data, token }));
    dispatch(
      enqueue({ message: "todos deleted permanently", variant: "success" })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1,
        overflowY: "auto",
        maxHeight: "70vh",
        "&::-webkit-scrollbar": {
          width: "0.3em",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "0.6em",
          backgroundColor: "#888",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>
        Recently Deleted Todos
      </Typography>
      {props?.todos?.length !== 0 && (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleRestoreAllClick}
          >
            restore all
          </Button>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={handleDeleteAllButton}
          >
            delete all
          </Button>
        </Box>
      )}
      {props?.todos?.map((todo) => (
        <DeletedItem
          key={todo.title}
          title={todo.title}
          id={todo.id}
          status={todo.status}
          minHeight={props.minHeight}
        />
      ))}
      {props?.todos?.length === 0 && (
        <Typography>No items in the Recently Deleted List </Typography>
      )}
      <DeleteDialog
        deleteDialog={deleteDialogState}
        setDeleteDialog={setDeleteDialogState}
        callbackFunction={handleDeleteAllCallback}
        message="Are you sure you want to delete All the  Todos Permanently?"
        buttonName="delete all"
      />
    </Box>
  );
};

DeletedTodoListUI.propTypes = {
  todos: propTypes.array,
  minHeight: propTypes.number,
};

const DeletedTodos = () => {
  const todos = useDeletedTodos();

  const [minHeight, setMinHeight] = useState(0);
  const HoveredDeletedItemRef = useRef();

  useEffect(() => {
    setMinHeight(
      HoveredDeletedItemRef?.current?.getBoundingClientRect()?.height
    );
  }, []);

  return (
    <>
      {!minHeight ? (
        <div ref={HoveredDeletedItemRef}>
          <DeletedItemUI isHovered={true} />
        </div>
      ) : (
        <DeletedTodoListUI todos={todos} minHeight={minHeight} />
      )}
    </>
  );
};

export default DeletedTodos;
