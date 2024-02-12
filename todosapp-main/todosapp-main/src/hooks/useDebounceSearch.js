import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodoSearchTerm } from "../redux/slices/filterSortSlice";

const useDebounceSearch = (intialValue, delay) => {
  const [searchTerm, setSearchTerm] = useState(intialValue);
  const dispatch = useDispatch();
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(updateTodoSearchTerm(searchTerm));
    }, delay);

    return () => clearTimeout(id);
  }, [searchTerm, delay, dispatch]);

  return setSearchTerm;
};

export default useDebounceSearch;
