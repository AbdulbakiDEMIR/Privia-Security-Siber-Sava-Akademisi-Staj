import React, { useEffect, useState } from 'react';
import { styled ,Box, Card, CardContent, Button, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const StyleButton = styled(Button)({
    backgroundColor: '#2940D3',
    fontSize: 14,
    textTransform: 'none',
})

export const  AddUsers = ({ setActive ,addUser, updateUser, userData={} }) => {
    const [fullName, setFullName] = useState(userData.fullname||"");
    const [username, setUsername] = useState(userData.username||"");
    const [email, setEmail] = useState(userData.email||"");
    const [role, setRole] = useState(userData.role||"");
    const [avatar, setAvatar] = useState(userData.avatar||"");
    const [error, setError] = useState(false);

    
    const fullNameHandler = (event)=>{
        setFullName(event.target.value);
    }
    const usernameHandler = (event)=>{
        setUsername(event.target.value);
    }
    const emailHandler = (event)=>{
        setEmail(event.target.value);
    }

    const roleHandler = (event) => {
      setRole(event.target.value);
    };

    const setGender = (event) => {
        setAvatar(event.target.value);
    }

    const isValueTrue = (value) =>{
        if(value !== undefined && value !== "") return true;
        else return false;
    }

    const userHandler = () => { // butona basıldığında verileri kontrol edip ekleme-güncelleme işlemleri yapılıyor
        if(isValueTrue(fullName) && isValueTrue(username) && isValueTrue(email) && isValueTrue(role) && isValueTrue(avatar)){
            let user = {
                ID:userData.ID,
                fullname:fullName,
                username: username,
                email:email,
                role:role,
                avatar:avatar,
            }
            if(user.ID === undefined){
                addUser(user);
            }
            else{
                updateUser(userData.ID, user);
            }
            setActive(false);
        }
        else{
            setError(true);
        }
    }
    return (
        <>
        <Box sx={{width:'100vw', height:'100vh', background:'#ccc8', position:'fixed', zIndex:13, top:'0', display:'flex', justifyContent:'center', paddingTop:'10vh'}}>
            <Card sx={{paddingTop:'1.5rem' ,width: 350, height:556, boxShadow:'0px 7px 20px 0px #28293D14', position:'relative' }}>
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {width: '100%', my:1},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            label="Full Name"
                            value={fullName}
                            onChange={fullNameHandler}
                        /> 
                        <TextField
                            label="Username"
                            value={username}
                            onChange={usernameHandler}
                        /> 
                        <TextField
                            label="Email Address"
                            value={email}
                            onChange={emailHandler}
                        /> 
                        <FormControl sx={{width:'100%', mt:2}}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                id="demo-simple-select"
                                value={role}
                                label="Role"
                                onChange={roleHandler}
                            >
                                <MenuItem value={1}>Contributor</MenuItem>
                                <MenuItem value={2}>Subscriber</MenuItem>
                                <MenuItem value={3}>Author</MenuItem>
                                <MenuItem value={4}>Administrator</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{width:'100%', marginTop:'2rem'}}>
                            <label className='text-muted'>Select avatar</label>
                            <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', marginTop:"0.5rem"}} onChange={setGender}>
                                <label className={'avatar-items '+((parseInt(avatar)===1)&&'selected')} style={{background:'#BA8A6C'}}>
                                    <img className='w-100 h-100' alt='avatar' src={require("../img/avatar1.png")}/>
                                    <input type='radio' name='avatar' value={1}/>
                                </label>
                                <label className={'avatar-items '+((parseInt(avatar)===2)&&'selected')} style={{background:'#F4B8AB'}}>
                                    <img className='w-100 h-100' alt='avatar' src={require("../img/avatar2.png")}/>
                                    <input type='radio' name='avatar' value={2}/>
                                </label>
                                <label className={'avatar-items '+((parseInt(avatar)===3)&&'selected')}>
                                    <img className='w-100 h-100' alt='avatar' src={require("../img/avatar3.png")}/>
                                    <input type='radio' name='avatar' value={3}/>
                                </label>
                                <label className={'avatar-items '+((parseInt(avatar)===4)&&'selected')}>
                                    <img className='w-100 h-100' alt='avatar' src={require("../img/avatar4.png")}/>
                                    <input type='radio' name='avatar' value={4}/>
                                </label>
                                <label className={'avatar-items '+((parseInt(avatar)===5)&&'selected')} style={{background:'#3361FF1A'}}>
                                    <img className='w-100 h-100' alt='avatar' src={require("../img/avatar5.png")}/>
                                    <input type='radio' name='avatar' value={5}/>
                                </label>
                                <label className={'avatar-items '+((parseInt(avatar)===6)&&'selected')} style={{background:'#3361FF1A'}}>
                                    <img className='w-100 h-100' alt='avatar' src={require("../img/avatar6.png")}/>
                                    <input type='radio' name='avatar' value={6}/>
                                </label>
                            </Box>
                        </Box>

                        <Box>
                            {(error)&&
                                <p className='text-danger mt-2 fw-semibold fs-6'>*Yuarıdaki input alanlarını boş bırakmayın</p>
                            }
                        </Box>

                        <Box className="w-100 d-flex justify-content-center mt-3">
                            <StyleButton  variant="contained" onClick={userHandler}>Contained</StyleButton>
                        </Box>

                    </Box>
                </CardContent>

                <CloseIcon sx={{position: 'absolute', right:'10px', top:'10px', cursor:'pointer'}} onClick={()=>setActive(false)}/>
                
            </Card>
        </Box>
        </>
    )
}
