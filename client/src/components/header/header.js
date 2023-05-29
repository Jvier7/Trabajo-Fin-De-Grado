import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import {useState, useEffect} from 'react'
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
  const [fechaHoraActual] = React.useState(new Date().toLocaleString());
  const [time, setTime] = useState('00:00:00 xm');
  const [date, setDate] = useState('day, month, 00, 00000');

  useEffect(() => {
    setInterval(() => {

      const dt = new Date();
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'];


      let hour = dt.getHours();
      let minutes = dt.getMinutes();
      let seconds = dt.getSeconds();

      let xm = (hour >= 12) ? 'PM' : 'AM';
      
      hour = (hour > 12) ? hour - 12 : hour;
      hour = (hour < 10) ? '0' + hour : hour;
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;

      let newTime =`${hour}:${minutes}:${seconds} ${xm}`;

      setTime(newTime);

      let dayIndex = dt.getDay();
      let dayName = dayNames[dayIndex];

      let monthIndex = dt.getMonth();
      let monthName = monthNames[monthIndex];

      let today = dt.getDate();
      let year = dt.getFullYear();

      today = (today < 10) ? '0' + today : today;

      let newDate = `${dayName}, ${monthName} ${today}, ${year}`;
      setDate(newDate);

    }, 1000)


  })

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
      <div className="clock">
            <h1>{time}</h1>
            <p>{date}</p>
      </div>
      <div className="counter">
        <p className="title">Por realizar: {notDone}</p>
        <p className="title">Realizadas: {done}</p>
      </div>
      <div className='settingsUser'>
        <h1 className="userName">{props.user.name}</h1>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Ajustes">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src='/assets/userProfile.png' />
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

            <MenuItem onClick={() => {
              handleCloseUserMenu();
              navigate('/profile')
            }}>
              <Typography textAlign="center">{"Perfil"}</Typography>
            </MenuItem>
            <MenuItem onClick={() => {
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