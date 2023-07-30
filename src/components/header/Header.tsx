import { type ReactElement } from "react";
import Link from "@mui/material/Link";
import { IconButton, Stack } from "@mui/material";
import SearchIcon from "../icons/SearchIcon";
import HeaderLink from "./HeaderLink";
import logo from "./img/logo.png";

export default function Header(): ReactElement {
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Link>
          <img src={logo} />
        </Link>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <HeaderLink text="Header link"></HeaderLink>
        </Stack>
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </Stack>
    </>
  );
}
