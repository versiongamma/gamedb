import { Button, Tabs, styled } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PATHS, Page } from '../../routes';

const StyledTabs = styled(Tabs)`
  .MuiTabs-scroller {
    .MuiTabs-indicator {
      height: 0.15rem;
      background-color: white;
    }
  }
`;

const StyledTab = styled(Button)`
  margin: 0;
  width: 10rem;
  height: 64px;
  color: white;
  font-weight: 600;
`;

const NavigationTabs = () => {
  const { pathname } = useRouter();

  return (
    <StyledTabs value={pathname}>
      {Object.values(Page).map((page) => (
        <StyledTab
          key={page}
          value={PATHS[page]}
          href={PATHS[page]}
          LinkComponent={Link}
        >
          {page}
        </StyledTab>
      ))}
    </StyledTabs>
  );
};

export default NavigationTabs;
