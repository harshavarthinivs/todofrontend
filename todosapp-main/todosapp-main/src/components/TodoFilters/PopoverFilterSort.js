import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";

import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../redux/slices/filterSortSlice";

const CheckBoxGenerator = ({ name, state, handle }) => {
  return (
    <FormControlLabel
      control={<Checkbox name={name} checked={state[name]} onChange={handle} />}
      label={name[0].toUpperCase() + name.slice(1)}
    />
  );
};

CheckBoxGenerator.propTypes = {
  name: propTypes.string,
  state: propTypes.object,
  handle: propTypes.func,
};

export const PopoverSort = ({ onClose }) => {
  const [checkBoxes, setCheckBoxes] = useState(
    useSelector((state) => state.filterSort.status)
  );
  const dispatch = useDispatch();

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setCheckBoxes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSortChange = (e) => {
    setCheckBoxes((prev) => ({ ...prev, sort: e.currentTarget.value }));
  };

  const handleSortOrderClick = (e) => {
    const { name } = e.currentTarget;

    setCheckBoxes((prev) => ({
      ...prev,
      [name]: prev[name] === "asc" ? "desc" : "asc",
    }));
  };

  useEffect(() => {
    dispatch(updateStatus(checkBoxes));
  }, [checkBoxes, dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="primary" fontWeight="bold">
          Sort Todos{" "}
        </Typography>
        <CloseIcon
          style={{ opacity: 0.5, cursor: "pointer" }}
          fontSize="small"
          onClick={onClose}
        />
      </Box>
      <Paper
        sx={{
          px: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="priority"
              checked={checkBoxes.priority}
              onChange={handleCheckBoxChange}
            />
          }
          label="Priority"
        />
        <IconButton
          name="priorityOrder"
          onClick={handleSortOrderClick}
          color="primary"
        >
          {checkBoxes.priorityOrder === "desc" ? (
            <ArrowDownwardIcon />
          ) : (
            <ArrowUpwardIcon />
          )}
        </IconButton>
      </Paper>
      <Paper sx={{ px: 1 }}>
        <FormControl>
          <RadioGroup
            defaultValue="recent"
            value={checkBoxes.sort}
            name="sort"
            onChange={handleSortChange}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value="recent"
                control={<Radio />}
                label={checkBoxes.recentOrder === "asc" ? "Oldest" : "Recent"}
              />
              <IconButton
                name="recentOrder"
                onClick={handleSortOrderClick}
                color="primary"
              >
                {checkBoxes.recentOrder === "desc" ? (
                  <ArrowDownwardIcon />
                ) : (
                  <ArrowUpwardIcon />
                )}
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value="alphabetical"
                control={<Radio />}
                label="Alphabetical"
              />
              <IconButton
                name="alphabeticalOrder"
                onClick={handleSortOrderClick}
                color="primary"
              >
                {checkBoxes.alphabeticalOrder === "desc" ? (
                  <ArrowDownwardIcon />
                ) : (
                  <ArrowUpwardIcon />
                )}
              </IconButton>
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
    </Box>
  );
};

PopoverSort.propTypes = {
  onClose: propTypes.func,
};
export const PopoverFilter = ({ onClose }) => {
  const [checkBoxes, setCheckBoxes] = useState(
    useSelector((state) => state.filterSort.status)
  );

  const dispatch = useDispatch();

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setCheckBoxes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAllChange = () => {
    setCheckBoxes((prev) => ({
      ...prev,
      progress: !prev.all,
      completed: !prev.all,
      all: !prev.all,
    }));
  };

  useEffect(() => {
    dispatch(updateStatus(checkBoxes));
  }, [checkBoxes, dispatch]);

  return (
    <Grid container spacing={1} style={{ padding: "1rem" }}>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography color="primary" fontWeight="bold">
          Filter Todos
        </Typography>
        <CloseIcon
          style={{ opacity: 0.5, cursor: "pointer" }}
          fontSize="small"
          onClick={onClose}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight="bold">Priority</Typography>
        <FormGroup>
          {["low", "medium", "high"].map((priority) => (
            <CheckBoxGenerator
              key={priority}
              name={priority}
              state={checkBoxes}
              handle={handleCheckBoxChange}
            />
          ))}
        </FormGroup>
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight="bold">Status</Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="all"
              checked={checkBoxes.progress && checkBoxes.completed}
              indeterminate={checkBoxes.progress !== checkBoxes.completed}
              onChange={handleAllChange}
            />
          }
          label="All"
        />
        <FormGroup>
          {["progress", "completed"].map((status) => (
            <CheckBoxGenerator
              key={status}
              name={status}
              state={checkBoxes}
              handle={handleCheckBoxChange}
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

PopoverFilter.propTypes = {
  onClose: propTypes.func,
};
