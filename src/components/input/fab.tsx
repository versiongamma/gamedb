import MuiFab, { FabProps as MuiFabProps } from '@mui/material/Fab';

const Fab = (props: MuiFabProps) => (
  <MuiFab {...props} className="button fixed bottom-2 right-2 rounded-full" />
);

export default Fab;
