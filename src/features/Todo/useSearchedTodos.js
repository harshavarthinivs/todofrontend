import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFilteredAndSortedTodos from "../../hooks/useFilteredAndSortedTodos";

const useSearchedTodos = () => {
  const todos = useFilteredAndSortedTodos();
  const searchTerm = useSelector((state) => state.filterSort.searchTerms.todo);
  const [searchedTodos, setSearchedTodos] = useState([]);

  const isValidTodo = useCallback(
    (todo) => {
      if (searchTerm === "") return true;
      const searchStrings = searchTerm
        .split(" ")
        .map((item) => item.trim().toLowerCase());

      const todoStrings = todo.title 
        .split(" ")
        .map((item) => item.trim().toLowerCase())
        .filter((val) => val !== "");

      for (let x of searchStrings) {
        for (let y of todoStrings) {
          if (y.indexOf(x) !== -1) return true;
        }
      }
      return false;
    },
    [searchTerm]
  );

  const filter = useCallback(() => {
    const filtered = [];
    for (let x of todos) {
      if (isValidTodo(x)) filtered.push(x);
    }
    setSearchedTodos(filtered);
  }, [todos, isValidTodo]);

  useEffect(() => {
    filter();
  }, [todos, searchTerm, filter]);

  return searchedTodos;
};

export default useSearchedTodos;
