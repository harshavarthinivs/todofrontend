import { IconButton, List, ListItem, Popover, Tooltip } from "@mui/material";
import propTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AngleUpArrowIcon from "../../components/icons/AngleUpArrowIcon";
import DoubleUpArrowIcon from "../../components/icons/DoubleUpArrowIcon";
import TripleUpArrowIcon from "../../components/icons/TripleUpArrowIcon";
import useLocalStorage from "../../hooks/useLocalStorage";
import { selectTodoById, updateTodoThunk } from "../../redux/slices/loginSlice";
import { enqueue } from "../../redux/slices/snackbarSlice";

const PriorityIcon = ({ priority, color }) => {
  if (priority === "HIGH")
    return <TripleUpArrowIcon fontSize="small" color={color || "error"} />;
  if (priority === "MEDIUM")
    return <DoubleUpArrowIcon fontSize="small" color={color || "warning"} />;

  return <AngleUpArrowIcon fontSize="small" color={color || "success"} />;
};

PriorityIcon.propTypes = {
  priority: propTypes.string.isRequired,
  color: propTypes.string,
};

export const PriorityButton = ({
  id,
  popoverOpenCallback = () => {},
  popoverCloseCallback = () => {},
}) => {
  const todo = useSelector((state) => selectTodoById(state, id));
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const [token] = useLocalStorage("token", "");

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
    popoverOpenCallback();
  };

  const handlePopoverClose = (event) => {
    setAnchorEl(null);
    popoverCloseCallback(event);
  };

  const handlePriorityChange = async (priority) => {
    if (todo?.priority === priority) return;
    /**
     * Check whether the entered priority is valid or not
     */
    if (priority !== "LOW" && priority !== "MEDIUM" && priority !== "HIGH") {
      dispatch(enqueue({ message: "Invalid priority", variant: "error" }));
      return;
    }
    const data = {
      title: todo.title,
      description: todo.description,
      priority: priority,
    };
    dispatch(updateTodoThunk({ id, data, token }));
  };

  const open = Boolean(anchorEl);
  if (todo?.status === "COMPLETED") {
    return (
      <Tooltip title={todo?.priority.toLowerCase()}>
        <span>
          <IconButton disabled>
            <PriorityIcon priority={todo?.priority} color="gray" />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip title={todo?.priority.toLowerCase()}>
        <IconButton onClick={handlePopoverClick}>
          <PriorityIcon priority={todo?.priority} />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <List>
          <ListItem>
            <Tooltip title="low priority todo" placement="left">
              <IconButton onClick={() => handlePriorityChange("LOW")}>
                <PriorityIcon priority="LOW" />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem>
            <Tooltip title="medium priority todo" placement="left">
              <IconButton onClick={() => handlePriorityChange("MEDIUM")}>
                <PriorityIcon priority="MEDIUM" />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem>
            <Tooltip title="high priority todo" placement="left">
              <IconButton onClick={() => handlePriorityChange("HIGH")}>
                <PriorityIcon priority="HIGH" />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

PriorityButton.propTypes = {
  id: propTypes.number.isRequired,
  popoverOpenCallback: propTypes.func,
  popoverCloseCallback: propTypes.func,
};

export default PriorityButton;
