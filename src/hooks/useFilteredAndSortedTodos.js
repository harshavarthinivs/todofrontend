import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFilteredAndSortedTodos = () => {
  const todos = useSelector((state) => state.login.user.todos);
  // status: {
  //     low: false,
  //     medium: false,
  //     high: false,
  //     progress: false,
  //     completed: false,
  //     priority: false,
  //     all: false,
  //     sort: "recent",
  //     priorityOrder: "asc",
  //     alphabeticalOrder: "asc",
  //     recentOrder: "asc",
  //   },
  const filterSortStatus = useSelector((state) => state.filterSort.status);

  const [filteredAndSortedTodos, setFilteredAndSortedTodos] = useState([]);

  useEffect(() => {
    let intermediateData = [...todos];
    intermediateData = intermediateData.filter(
      (val) => !val.status.startsWith("DELETED")
    );

    if (
      filterSortStatus.low ||
      filterSortStatus.high ||
      filterSortStatus.medium
    ) {
      intermediateData = filterSortStatus.low
        ? intermediateData
        : intermediateData.filter((val) => val.priority !== "LOW");

      intermediateData = filterSortStatus.medium
        ? intermediateData
        : intermediateData.filter((val) => val.priority !== "MEDIUM");

      intermediateData = filterSortStatus.high
        ? intermediateData
        : intermediateData.filter((val) => val.priority !== "HIGH");
    }

    if (filterSortStatus.completed || filterSortStatus.progress) {
      intermediateData = filterSortStatus.completed
        ? intermediateData
        : intermediateData.filter((val) => val.status !== "COMPLETED");

      intermediateData = filterSortStatus.progress
        ? intermediateData
        : intermediateData.filter((val) => val.status !== "IN_PROGRESS");
    }

    //sorting the intermediate data

    if (filterSortStatus.sort === "recent") {
      if (filterSortStatus.recentOrder === "asc") {
        intermediateData.sort((a, b) => a.id - b.id);
      } else {
        intermediateData.sort((a, b) => b.id - a.id);
      }
    } else {
      const extractName = (name) => {
        return name.replace(/\s/g, "").toLowerCase();
      };

      const compareAsc = (a, b) => {
        let name1 = extractName(a.title);
        let name2 = extractName(b.title);

        if (name1 < name2) return -1;
        if (name1 > name2) return 1;

        return 0;
      };

      let compareDesc = (a, b) => {
        let name1 = extractName(a.title);
        let name2 = extractName(b.title);

        if (name1 < name2) return 1;
        if (name1 > name2) return -1;

        return 0;
      };

      if (filterSortStatus.alphabeticalOrder === "asc") {
        intermediateData.sort(compareAsc);
      } else {
        intermediateData.sort(compareDesc);
      }
    }

    /**
     * sorting them based on priority
     *
     * first split them into separate list  them
     * join those sets   based on priority order
     */

    if (filterSortStatus.priority) {
      let redList = [];
      let yellowList = [];
      let greenList = [];

      for (let x of intermediateData) {
        if (x.priority === "LOW") greenList.push(x);
        else if (x.priority === "MEDIUM") yellowList.push(x);
        else redList.push(x);
      }

      if (filterSortStatus.priorityOrder === "asc") {
        intermediateData = [...greenList, ...yellowList, ...redList];
      } else {
        intermediateData = [...redList, ...yellowList, ...greenList];
      }
    }

    setFilteredAndSortedTodos(intermediateData);
  }, [todos, filterSortStatus, setFilteredAndSortedTodos]);

  return filteredAndSortedTodos;
};

export default useFilteredAndSortedTodos;
