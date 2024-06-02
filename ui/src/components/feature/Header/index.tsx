import { AppBar, Box, Button, Container, Stack, Toolbar } from '@mui/material';
import React from 'react';

type TNavItem = {
  title: string;
  onClick: () => void;
};

interface IHeaderProps {
  headerLogo: TNavItem;
  navItems: TNavItem[];
}

const Header = (props: IHeaderProps) => {
  const { navItems, headerLogo } = props;

  return (
    <>
      <AppBar component="div">
        <Toolbar>
          <Container>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Button sx={{ color: '#fff' }} onClick={headerLogo.onClick}>
                {headerLogo.title}
              </Button>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    sx={{ color: '#fff' }}
                    onClick={item.onClick}
                  >
                    {item.title}
                  </Button>
                ))}
              </Box>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Box width="100%" height="64px"></Box>
    </>
  );
};

export default Header;
