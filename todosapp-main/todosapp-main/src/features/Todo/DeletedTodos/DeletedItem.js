import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { updateTodoStatusApi } from "../../../api/updateTodoApi";
import { DeleteForever } from "@mui/icons-material";
import RestoreIcon from "@mui/icons-material/Restore";
import propTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { updateTodoStatus,deleteTodo } from "../../../redux/slices/loginSlice";
import { DeleteDialog } from ".";
import deleteTodoApi from "../../../api/deleteTodoApi";
import { enqueue } from "../../../redux/slices/snackbarSlice";

export const DeletedItemUI = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          textDecoration:
            props?.status === "DELETED_COMPLETED" ? "line-through" : "",
          opacity: props?.status === "DELETED_COMPLETED" ? 0.5 : 1,
        }}
      >
        {props?.title}
      </Typography>
      {
        props?.isHovered && <Box>
        <Tooltip title="Restore">
          <IconButton color="primary">
            <RestoreIcon
              onClick={props?.handleRestoreButton}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete permanently">
          <IconButton
            color="error"
            onClick={props?.handlePermanentDeleteButton}
          >
            <DeleteForever fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      }
    </Box>
  );
};

DeletedItemUI.propTypes = {
  title: propTypes.string,
  status: propTypes.string,
  handlePermanentDeleteButton: propTypes.func,
  handleRestoreButton: propTypes.func,
  isHovered:propTypes.bool
};

export const DeletedItem = ({ id, title, status,minHeight }) => {
  const [token] = useLocalStorage("token", "");
  const dispatch = useDispatch();
  const [deleteDialogState, setDeleteDialogState] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const updateStatusHelper = async (state) => {
    await updateTodoStatusApi(id, state, token);
    dispatch(updateTodoStatus({ id, status: state }));
  };

  const handleRestoreButton = () => {
    if (status === "DELETED_COMPLETED") updateStatusHelper("COMPLETED");
    else updateStatusHelper("IN_PROGRESS");
  };

  const handlePermanentDeleteButton = () => {
    setDeleteDialogState(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePermanentDeleteCallback = async () => {
    await deleteTodoApi(id, token);
    dispatch(deleteTodo(id));
    dispatch(
      enqueue({ message: "Todo deleted Permanently", variant: "success" })
    );
  };

  return (
    <Paper
      key={title}
      sx={{ p: 1,minHeight:{minHeight},display:'flex',alignItems:'center'}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DeletedItemUI
        title={title}
        status={status}
        handlePermanentDeleteButton={handlePermanentDeleteButton}
        handleRestoreButton={handleRestoreButton}
        isHovered={isHovered}
      />
      <DeleteDialog
        deleteDialog={deleteDialogState}
        setDeleteDialog={setDeleteDialogState}
        callbackFunction = {handlePermanentDeleteCallback}
        message="Are you sure you want to delete this Todo Permanently?"
        buttonName="delete"
      />
    </Paper>
  );
};

DeletedItem.propTypes = {
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  minHeight: propTypes.number
};
