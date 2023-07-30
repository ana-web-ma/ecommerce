import { type ReactElement } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function HeaderLink(props: { text: string }): ReactElement {
  return (
    <Typography
      fontFamily={"bellota-text"}
      fontSize={13}
      textTransform={"uppercase"}
    >
      <Link href="#">{props.text}</Link>{" "}
    </Typography>
  );
}
