import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import "./header.css";
import { useNavigate } from 'react-router-dom';

const pages = [];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar(props) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const [done, setDone] = React.useState(0);
  const [notDone, setNotDone] = React.useState(0);
  const [fechaHoraActual]= React.useState(new Date().toLocaleString());

  React.useEffect(() => {
    setDone(props.tasks.filter(task => task.isCompleted === 1).length);
    setNotDone(props.tasks.filter(task => task.isCompleted === 0).length);
  }, [props.tasks]);

  function logout() {
    window.location.reload();
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  return (
    <div className="god">
      <div>
        <img src="/assets/logoEDIT.png" className="adbIcon" onClick={() => {
          navigate('/home')
        }}></img>
      </div>
      <div className="dateNow">
        <h1 className="title">Fecha:</h1>
        <h1>{fechaHoraActual}</h1>
      </div>
      <div className="counter">
        <p className="title">Por realizar: {notDone}</p>
        <p className="title">Realizadas: {done}</p>
      </div>
      <div className='settingsUser'>
        <h1>{props.user.name}</h1>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem onClick={() =>{
                handleCloseUserMenu();
              
                  navigate('/profile')
              }}>
                <Typography textAlign="center">{"Perfil"}</Typography>
              </MenuItem>
              <MenuItem onClick={()=>{
                handleCloseUserMenu();
                document.cookie = "hash=; Max-Age=-99999999;";
                logout();
              }}>
                <Typography textAlign="center">{"Cerrar Sesión"}</Typography>
              </MenuItem>
            </Menu>
          </Box>
      </div>
    </div>
  );
}
export default ResponsiveAppBar;