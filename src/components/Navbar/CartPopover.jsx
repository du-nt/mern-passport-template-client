import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

import Popup from "./Popup";

export default function CartPopover(props) {
  return (
    <Popup {...props}>
      <Typography>Cart item</Typography>
      <Typography>Cart item</Typography>
      <Typography>Cart item</Typography>
        <Button onClick={props.handleClose} variant="contained" color="primary" component={NavLink} to="/cart">
          Go to Cart
        </Button>
    </Popup>
  );
}
