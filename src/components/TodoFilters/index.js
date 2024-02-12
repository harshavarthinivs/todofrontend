import { IconButton, Popover, Tooltip } from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import propTypes from "prop-types";
import { useState } from "react";
import { PopoverFilter, PopoverSort } from "./PopoverFilterSort";

/**
 * Responsible for filter button and the popover for the filter
 * It internally uses PopoverFilter to handle the popover
 *
 * @returns {JSX.Element}
 */

export const FilterComponent = ({ componentColor }) => {
  const [filterEl, setFilterEl] = useState(null);
  const open = Boolean(filterEl);
  const id = open ? "popoverInSearchBar" : undefined;

  const handleFilterPopover = (e) => {
    setFilterEl(e.currentTarget);
  };

  const closeFilterPopover = () => {
    setFilterEl(null);
  };

  const component = (
    <Tooltip title="Filter List">
      <IconButton
        variant="contained"
        onClick={handleFilterPopover}
        color={componentColor}
        sx={{
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
      >
        <FilterAltIcon />
      </IconButton>
    </Tooltip>
  );

  const filterPopover = (
    <Popover
      id={id}
      open={open}
      anchorEl={filterEl}
      onClose={closeFilterPopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{ p: 1 }}
    >
      <PopoverFilter onClose={closeFilterPopover} />
    </Popover>
  );

  return (
    <>
      {component}
      {filterPopover}
    </>
  );
};

FilterComponent.propTypes = {
  componentColor: propTypes.string,
};

FilterComponent.defaultProps = {
  componentColor: "white",
};

/**
 * It creates a new Sort button and manages the popover of it
 * The popover is internally created by the PopoverSort component
 *
 * @returns {JSX.Element}
 */
export const SortComponent = () => {
  const [sortEl, setSortEl] = useState(null);

  const handleSortPopover = (e) => {
    setSortEl(e.currentTarget);
  };

  const closeSortPopover = () => {
    setSortEl(null);
  };

  const openSort = Boolean(sortEl);
  const sortId = openSort ? "popoverSortId" : undefined;

  const component = (
    <Tooltip title="Sort List">
      <IconButton
        variant="contained"
        onClick={handleSortPopover}
        color="white"
        sx={{
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
      >
        <ImportExportIcon />
      </IconButton>
    </Tooltip>
  );

  const sortPopover = (
    <Popover
      id={sortId}
      open={openSort}
      anchorEl={sortEl}
      onClose={closeSortPopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <PopoverSort onClose={closeSortPopover} />
    </Popover>
  );

  return (
    <>
      {component}
      {sortPopover}
    </>
  );
};
