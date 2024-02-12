import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import propTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import extractDataFromForm from "../../utils/extractDataFromForm";

import AngleUpArrowIcon from "../../components/icons/AngleUpArrowIcon";
import DoubleUpArrowIcon from "../../components/icons/DoubleUpArrowIcon";
import TripleUpArrowIcon from "../../components/icons/TripleUpArrowIcon";
import { createTodoThunk } from "../../redux/slices/loginSlice";

const CreateTodo = ({close}) => {
  const titleRef = useRef(null)
  const userid = useSelector((state) => state.login.user.id);
  const [token] = useLocalStorage("token", "");

  const [titleState, setTitleState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");

  const dispatch = useDispatch();

  const changeTitle = (e) => {
    setTitleState(e.target.value);
  };

  const changeDescription = (e) => {
    setDescriptionState(e.target.value);
  };

  useEffect(() => {

      console.log(titleRef);
      titleRef.current.focus();

  },[])

  const handleTodoSubmit = async (e) => {
    e.preventDefault();

    setTitleState("");
    setDescriptionState("");

    const formData = new FormData(e.currentTarget);
    const data = extractDataFromForm(formData);
    data.userid = userid;

    dispatch(createTodoThunk({ data, token }));
    close();
  };

  return (
    <Box
      component="form"
      onSubmit={handleTodoSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "95%",
        gap: 1,
        marginTop: "2px",
        p: 2,
      }}
    >
      <Typography
        color="primary"
        component="h3"
        variant="h6"
        sx={{
          paddingTop: "2px",
        }}
      >
        CREATE NEW TODO
      </Typography>
      <TextField
        label="Title"
        id="todoTitle"
        name="title"
        type="text"
        value={titleState}
        onChange={changeTitle}
        multiline
        rows={1}
        fullWidth
        required
        inputRef={titleRef}
      />
      <TextField
        label="Description"
        id="todoDescription"
        name="description"
        type="text"
        value={descriptionState}
        onChange={changeDescription}
        multiline
        rows={4}
        fullWidth
      />
      <FormControl>
        <FormLabel>Priority</FormLabel>
        <RadioGroup name="priority" defaultValue="low" row>
          <FormControlLabel
            value="LOW" // values should be in capital letters 
            control={<Radio icon={<AngleUpArrowIcon/>} checkedIcon={<AngleUpArrowIcon color="success" />} />}
            label="low"
          />
          <FormControlLabel
            value="MEDIUM"
            control={<Radio  icon={<DoubleUpArrowIcon />} checkedIcon={<DoubleUpArrowIcon color="warning"/>} />}
            label="medium"
          />
          <FormControlLabel
            value="HIGH" 
            control={<Radio icon={<TripleUpArrowIcon/>} checkedIcon={<TripleUpArrowIcon color="error"/>} />}
            label="high"
          />
        </RadioGroup>
        <Typography fontSize="small" ><i>"low"</i>&nbsp; is default </Typography>
      </FormControl>

      <Button type="submit" variant="contained" sx={{ width: "50%" }}>
        CREATE
      </Button>
    </Box>
  );
};

CreateTodo.propTypes = {
  close: propTypes.func.isRequired
}

export default CreateTodo;
