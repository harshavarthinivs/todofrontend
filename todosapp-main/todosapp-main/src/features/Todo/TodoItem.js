import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import propTypes from "prop-types";
import AngleUpArrowIcon from "../../components/icons/AngleUpArrowIcon";
import DoubleUpArrowIcon from "../../components/icons/DoubleUpArrowIcon";
import TripleUpArrowIcon from "../../components/icons/TripleUpArrowIcon";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";

import {
  updateTodoStatus,
  updateTodoThunk,
} from "../../redux/slices/loginSlice";

import { deepPurple } from "@mui/material/colors";
import { updateTodoStatusApi } from "../../api/updateTodoApi";
import { enqueue } from "../../redux/slices/snackbarSlice";
import PriorityButton from "./PriorityButton";

const PopoverForm = ({ id, title, description, priority, close }) => {
  const [titleUse, setTitleUse] = useState(title);
  const [descriptionUse, setDescriptionUse] = useState(description);
  const [priorityUse, setPriorityUse] = useState(priority);
  const [token] = useLocalStorage("token", "");
  const dispatch = useDispatch();

  const handleTitle = (e) => {
    setTitleUse(e.currentTarget.value);
  };

  const handleDescription = (e) => {
    setDescriptionUse(e.currentTarget.value);
  };

  const handlePriority = (e) => {
    setPriorityUse(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: titleUse,
      description: descriptionUse,
      priority: priorityUse,
    };
    const previousData = {
      title: title,
      description: description,
      priority: priority,
    };
    if (!Object.keys(data).every((key) => data[key] === previousData[key]))
      dispatch(updateTodoThunk({ id, data, token }));
    close();
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>
          <EditIcon />
        </Avatar>
      </Box>
      <TextField
        label="Title"
        multiline
        rows={1}
        value={titleUse}
        onChange={handleTitle}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        value={descriptionUse}
        onChange={handleDescription}
      />

      <FormControl>
        <FormLabel>Priority</FormLabel>
        <RadioGroup
          name="priority"
          value={priorityUse}
          onChange={handlePriority}
          row
        >
          <FormControlLabel
            value="LOW" // values should be in capital letters
            control={
              <Radio
                icon={<AngleUpArrowIcon />}
                checkedIcon={<AngleUpArrowIcon color="success" />}
              />
            }
            label="low"
          />
          <FormControlLabel
            value="MEDIUM"
            control={
              <Radio
                icon={<DoubleUpArrowIcon />}
                checkedIcon={<DoubleUpArrowIcon color="warning" />}
              />
            }
            label="medium"
          />
          <FormControlLabel
            value="HIGH"
            control={
              <Radio
                icon={<TripleUpArrowIcon />}
                checkedIcon={<TripleUpArrowIcon color="error" />}
              />
            }
            label="high"
          />
        </RadioGroup>
      </FormControl>
      <Button type="submit" variant="contained" color="secondary">
        <DoneIcon />
      </Button>
    </Box>
  );
};

//id, title, description, priority, close
PopoverForm.propTypes = {
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  priority: propTypes.string.isRequired,
  close: propTypes.func.isRequired,
};

const TodoItem = ({ id }) => {
  const [token] = useLocalStorage("token", "");
  const todo = useSelector((state) =>
    state.login.user.todos.find((t) => t.id === id)
  );
  const todoItemRef = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const isPopOverOpen = Boolean(anchorEl);
  const popOverId = isPopOverOpen ? "pop" + id : undefined;

  const checked = todo?.status === "COMPLETED";

  const updateStatusHelper = async (state) => {
    await updateTodoStatusApi(id, state, token);
    dispatch(updateTodoStatus({ id, status: state }));
  };

  const handleCheckBoxChange = async () => {
    if (todo?.status === "IN_PROGRESS") {
      updateStatusHelper("COMPLETED");
      dispatch(enqueue({ message: "Todo Marked as done", variant: "success" }));
    } else {
      updateStatusHelper("IN_PROGRESS");
      dispatch(
        enqueue({ message: "Todo Marked as not done", variant: "success" })
      );
    }
  };

  const handleDeleteButton = async () => {
    updateStatusHelper(`DELETED_${todo?.status}`);
    dispatch(enqueue({ message: "Todo deleted", variant: "success" }));
  };

  const handleShowDescription = (event) => {
    if (event.target === event.currentTarget)
      setShowDescription((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const openPopOver = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closePopOver = () => {
    setAnchorEl(null);
  };

  const handleClosePriorityPopOver = (event) => {
    const parentRect = todoItemRef.current.getBoundingClientRect();
    const isInsideParent =
      event.clientX >= parentRect.left &&
      event.clientX <= parentRect.right &&
      event.clientY >= parentRect.top &&
      event.clientY <= parentRect.bottom;
    isInsideParent ? setIsHovered(true) : setIsHovered(false);
  };

  return (
    <Paper
      elevation={1}
      sx={{ width: "100%" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={todoItemRef}
    >
      <Grid container sx={{ p: 1 }} onClick={handleShowDescription}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={handleShowDescription}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={checked}
              size="small"
              color="secondary"
              onChange={handleCheckBoxChange}
              onClick={(event) => event.stopPropagation()}
            />
            <Box>
              <Typography
                style={{
                  fontWeight: showDescription ? "bold" : "normal",
                  cursor: "pointer",
                  textDecoration:
                    todo?.status === "COMPLETED" ? "line-through" : "",
                  opacity: todo?.status === "COMPLETED" ? 0.5 : 1,
                }}
                onClick={handleShowDescription}
              >
                {todo?.title}
              </Typography>
            </Box>
          </Box>
          <Box>
            {isHovered && (
              <Tooltip title="Delete To-do">
                <IconButton onClick={handleDeleteButton}>
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </Tooltip>
            )}
            <PriorityButton
              id={id}
              popoverCloseCallback={handleClosePriorityPopOver}
            />
          </Box>
        </Grid>
        <Grid item onClick={handleShowDescription}>
          <Collapse in={showDescription} sx={{ px: 1 }}>
            {todo?.description !== "" && (
              <Typography sx={{ fontSize: "85%" }}>
                {todo?.description}
              </Typography>
            )}
            {todo?.status !== "COMPLETED" && (
              <Button onClick={openPopOver} variant="contained">
                Edit
              </Button>
            )}
          </Collapse>
        </Grid>
      </Grid>
      <Popover
        id={popOverId}
        open={isPopOverOpen}
        anchorEl={anchorEl}
        onClose={closePopOver}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <PopoverForm
          title={todo?.title}
          description={todo?.description}
          priority={todo?.priority}
          userid={todo?.userid}
          id={todo?.id}
          status={todo?.status}
          close={closePopOver}
        />
      </Popover>
    </Paper>
  );
};

TodoItem.propTypes = {
  id: propTypes.number.isRequired,
};

export default TodoItem;
