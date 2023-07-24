import MuiFab, { FabProps as MuiFabProps } from "@mui/material/Fab";

const Fab = (props: MuiFabProps) => (
  <MuiFab {...props} className="button rounded-full fixed bottom-2 right-2" />
);

export default Fab;
