import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material";

const settings = ["마이페이지", "쓴 글 목록", "로그아웃"];

const MenuButton = styled(Button)({
  color: "black",
  display: "block",
  boxShadow: "none",
  "&:active": {
    background: "inherit",
    boxShadow: "none",
  },
});

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 30,
  lineHeight: 1.5,
  color: "black",
  fontFamily: "mono-space",
  "&:hover": {
    background: "inherit",
  },
});

const Header = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 화면 클때 메뉴바 펼침 */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuButton onClick={() => navigate("/budget")}>
              예산으로 찾기
            </MenuButton>
            <MenuButton onClick={() => navigate("/imageplace")}>
              사진으로 찾기
            </MenuButton>
            <MenuButton onClick={() => navigate("/community")}>
              커뮤니티
            </MenuButton>
          </Box>
          {/* 화면 클때 LOGO */}
          <Box sx={{ flexGrow: 1.55, display: { xs: "none", md: "flex" } }}>
            <BootstrapButton disableRipple onClick={() => navigate("/main")}>
              TripAI
            </BootstrapButton>
          </Box>
          {/* 맨 오른쪽 아이콘 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon
                  fontSize="large"
                  sx={{ color: "black" }}
                ></AccountCircleIcon>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    fontSize="15px"
                    fontFamily="monospace"
                    textAlign="center"
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
