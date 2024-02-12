import {
  BottomNavigation,
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import propTypes from "prop-types";
import React, { useState } from "react";
import useSmallScreen from "../../hooks/useSmallScreen";
import CreateTodo from "./CreateTodo";
import DeletedTodos from "./DeletedTodos";
import TodoItem from "./TodoItem";
import useSearchedTodos from "./useSearchedTodos";

const CreateTodoWindow = ({
  setCreateTodoDialog,
  isSmallScreen,
  justifyCenter,
}) => {
  const handleCreateTodoDialogOpen = () => {
    setCreateTodoDialog(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: justifyCenter ? "center" : "flex-end",
      }}
    >
      <Button
        variant="contained"
        onClick={handleCreateTodoDialogOpen}
        sx={{
          borderRadius: 5,
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AddCircleOutlineIcon fontSize={isSmallScreen ? "large" : "medium"} />
        {!isSmallScreen && <Typography> Todo</Typography>}
      </Button>
    </Box>
  );
};

CreateTodoWindow.propTypes = {
  isSmallScreen: propTypes.bool,
  setCreateTodoDialog: propTypes.func,
  justifyCenter: propTypes.bool,
};

const EmptyTodoList = ({ setCreateTodoDialog }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "50%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
        }}
        elevation={24}
      >
        <Typography variant="h5">Todo List is empty </Typography>
        <Typography variant="subtitle2"> Click below to Add a new todo</Typography>
        <CreateTodoWindow
          setCreateTodoDialog={setCreateTodoDialog}
          justifyCenter
        />
      </Paper>
    </Box>
  );
};

EmptyTodoList.propTypes = {
  setCreateTodoDialog: propTypes.func.isRequired,
};

const Todo = () => {
  const [openCreateTodoDialog, setOpenCreateTodoDialog] = useState(false);
  const isSmallScreen = useSmallScreen();

  const handleCreateTodoDialogClose = () => {
    setOpenCreateTodoDialog(false);
  };

  const todos = useSearchedTodos();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "98%",
      }}
    >
      {!isSmallScreen && (
        <CreateTodoWindow setCreateTodoDialog={setOpenCreateTodoDialog} />
      )}
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Box
            sx={{
              maxWidth: isSmallScreen ? "90vw" : "55vw",
              alignItems: "center",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 1,
              width: "95%",
              height: "70vh",
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
            {todos?.map((val) => (
              <TodoItem key={val.id} id={val.id} />
            ))}
            {todos?.length === 0 && (
              <EmptyTodoList setCreateTodoDialog={setOpenCreateTodoDialog} />
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <DeletedTodos />
        </Grid>
      </Grid>
      <Dialog
        open={openCreateTodoDialog}
        onClose={handleCreateTodoDialogClose}
        fullWidth
        maxWidth="md"
      >
        <CreateTodo close={handleCreateTodoDialogClose} />
      </Dialog>
      {isSmallScreen && (
        <BottomNavigation
          sx={{ p: 1, position: "fixed", bottom: "5vh", right: "1vw" }}
          label="New Todo"
        >
          <CreateTodoWindow
            isSmallScreen
            setCreateTodoDialog={setOpenCreateTodoDialog}
          />
        </BottomNavigation>
      )}
    </Box>
  );
};

export default Todo;
