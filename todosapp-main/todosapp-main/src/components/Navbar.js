import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import propTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import useSmallScreen from "../hooks/useSmallScreen";
import SearchBar2, { SearchBar } from "./SearchBar2";
import { FilterComponent, SortComponent } from "./TodoFilters";
import { UserDetails } from "./UserDetails";

const NavbarOuterUI = ({ children }) => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
NavbarOuterUI.propTypes = {
  children: propTypes.node,
};
const Navbar = () => {
  const [searchBarWidth, setSearchBarWidth] = useState(0);
  const WrapperRef = useRef();
  const isSmallScreen = useSmallScreen();
  useEffect(() => {
    if (!searchBarWidth) {
      setSearchBarWidth(WrapperRef?.current?.getBoundingClientRect().width);
    }
  }, [searchBarWidth]);

  if (isSmallScreen) {
    return (
      <NavbarOuterUI>
        <MenuIcon fontSize="large" />
      </NavbarOuterUI>
    );
  }

  return (
    <NavbarOuterUI>
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        TODO LIST
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box ref={WrapperRef}>
          {!searchBarWidth ? (
            <SearchBar showAdornment={true} />
          ) : (
            <SearchBar2 width={searchBarWidth} />
          )}
        </Box>
        <SortComponent />
        <FilterComponent />
        <UserDetails />
      </Box>
    </NavbarOuterUI>
  );
};
export default Navbar;
