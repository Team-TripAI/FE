import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material";

interface Setting {
  name: string;
  dest: string;
}

const settingsWithLogin: Setting[] = [
  {
    name: "마이페이지",
    dest: "/mypage",
  },
  {
    name: "내 글 목록",
    dest: "/main",
  },
  {
    name: "로그아웃",
    dest: "/main",
  },
];
const settingsWithoutLogin = ["로그인"];

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

const MenuListButton = styled(Button)({
  color: "black",
  padding: "10px",
  "&:active": {
    background: "none",
  },
});

const Header = () => {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const closeUserMenu = (
    event: React.MouseEvent<HTMLElement>,
    setting: Setting
  ) => {
    setAnchorElUser(null);
    navigate(setting.dest);
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
              {settingsWithLogin.map((setting) => (
                <Typography
                  fontSize="15px"
                  fontFamily="monospace"
                  textAlign="center"
                  key={setting.name}
                >
                  <MenuListButton
                    onClick={(event) => closeUserMenu(event, setting)}
                  >
                    {setting.name}
                  </MenuListButton>
                </Typography>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
