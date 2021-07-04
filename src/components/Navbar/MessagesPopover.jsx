import { Typography } from "@material-ui/core";
import Popup from "./Popup";

export default function MessagesPopover(props) {
  return (
    <Popup {...props}>
      <Typography>Messages Center</Typography>
      <Typography>Messages Center</Typography>
      <Typography>Messages Center</Typography>
    </Popup>
  );
}
