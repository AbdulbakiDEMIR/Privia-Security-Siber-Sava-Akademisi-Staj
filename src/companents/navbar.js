import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import img from '../img/image.png'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


const StyledTabs = styled((props) => ( 
    <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan"/> }}
/>
))({
    
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'relative',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        height:3,
        top: 80,
        position: 'fixed',
        zIndex:10,
        width: '100%',
        backgroundColor: '#2940D3',
    },
});

const StyledTab = styled((props) => <Tab disableRipple {...props}/>)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        color: '#82868C',
        marginBottom: 15,
        marginTop: 15,
        fontSize:13,
        fontWeight:600,
        '& .Mui-selected': {
            color: '#2940D3',
            marginBottom: 15,
        },
    })
);



export const  Navbar = ({openAddUserPage, setFiterType}) => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const AddButton = styled(Button)({
        backgroundColor: '#2940D3',
        fontSize: 14,
        textTransform: 'none',
    })



    return (
        <>   
            <div>
            <Box sx={{position:'fixed', width:'100%', top:0, bgcolor:'white' ,zIndex:12}}>
                <Box sx={{ borderBottom: 3  ,borderColor: 'divider', px:2, display: 'flex', justifyContent: 'space-between', position:'relative' }}>

                    <Box className='d-flex align-items-center'>
                        <img src={img} style={{width:'40px',height:'40px'}}/>
                        <span className='ms-2 fw-semibold'>Users</span>
                    </Box>

                    <Box >
                        <Box sx={{ bgcolor: '#fff' }}>
                            <StyledTabs
                            value={value}
                            onChange={handleChange}
                            aria-label="styled tabs example"
                            >
                                <StyledTab label="All Users" onClick={()=>setFiterType(0)} />
                                <StyledTab label="Contributor" onClick={()=>setFiterType(1)} />
                                <StyledTab label="Author" onClick={()=>setFiterType(2)} />
                                <StyledTab label="Adminstrator" onClick={()=>setFiterType(3)} />
                                <StyledTab label="Subscriber" onClick={()=>setFiterType(4)} />
                            </StyledTabs>
                        </Box>
                    </Box>

                    <div className='d-flex align-items-center'>
                        <AddButton variant="contained" disableRipple onClick={()=>openAddUserPage(-1)}>
                            <AddCircleIcon sx={{ fontSize: 15, marginRight:'9px' }}/>
                            <span> Add New User </span>
                        </AddButton>
                    </div>
                    
                </Box>
            </Box>
            <div style={{marginBottom:'80px'}}></div>
            </div>
        </>
    )
}
