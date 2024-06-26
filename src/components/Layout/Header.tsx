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
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../../constants/isLoggedIn";

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
    dest: "/myArticle",
  },
  {
    name: "로그아웃",
    dest: "/login",
  },
];
const settingsWithoutLogin: Setting[] = [
  {
    name: "로그인",
    dest: "/login",
  },
];

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

  const isLoggedInState = useRecoilValue(isLoggedIn);

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
    _event: React.MouseEvent<HTMLElement>,
    setting: Setting
  ) => {
    setAnchorElUser(null);
    navigate(setting.dest);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* 화면 클때 메뉴바 펼침 */}
          <Box sx={{ display: "flex", width: "29vw" }}>
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
          <Box
            sx={{
              width: "33vw",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <BootstrapButton disableRipple onClick={() => navigate("/main")}>
              TripAI
            </BootstrapButton>
          </Box>
          {/* 맨 오른쪽 아이콘 */}
          <Box>
            <Tooltip title="정보 보기">
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
              {isLoggedInState.loginStatus
                ? settingsWithLogin.map((setting) => (
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
                  ))
                : settingsWithoutLogin.map((setting) => (
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
