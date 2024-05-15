import {React, useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ShowAvatar } from './showAvatar';


const role = ['Contributor','Author','Administrator','Subscriber'];
const avatar = ['../img/avatar1.png','../img/avatar2.png','../img/avatar3.png','../img/avatar4.png','../img/avatar5.png','../img/avatar6.png',];
const StyleTableCellHead = styled((props) => <TableCell {...props}/>)(
    ({theme}) => ({
        textAlign:theme.textAlign,
        fontSize: 12,
        fontWeight: 600,
        color: '#3A3C40',
        padding: theme.padding ||'0 1rem',
        width: theme.width,
    })
)
const StyleTableCellBody = styled((props) => <TableCell {...props}/>)(
    ({theme}) => ({
        textAlign: theme.textAlign,
        fontSize: 12,
        color: '#3A3C40',
        padding: theme.padding,
        width: theme.width,
    })
)
const StylePagination = styled((props) => 
    <Pagination
        {...props} 
    />)(
    ({theme}) => ({
        '& .MuiSvgIcon-root':{
            color:'#82868C',
        },
        '& .MuiPaginationItem-root':{
            color: '#C3C6CB',
        },
        '& .MuiPaginationItem-root.Mui-selected':{
            background: '#2940D3',
            color: '#fff',
        },
        '& .MuiPaginationItem-root.Mui-selected:hover':{
            background: '#4059E9',
        },
    })
)
export const PageTable = ({data, openAddUserPage, deleteUser, searchValue, setSearchValue, filterType}) => {
    const [page,setPage] = useState(1);
    const [listData,setListData] = useState(data.slice(0, 10));
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(Array(listData.length).fill(''));


    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(()=>{
        if(page>Math.ceil(data.length/10)){
            setPage(Math.ceil(data.length/10))
        }
        if(data.length===0){
            setPage(1);
        }
        let first = (page-1)*10;
        let end = page*10;
        let newList = data.slice(first,end);
        setListData(newList);
        setCheckedItems(Array(newList.length).fill(''))
        setAllChecked(false);
    },[page,data]);

    useEffect(()=>{
        setPage(1);
    },[filterType]);


    const handleAllCheckboxChange = (event) => {
        const { checked } = event.target;
        setAllChecked(checked);
        if(checked){
            let idData = [];
            listData.map(item=>{
                idData.push(item.ID)
            })
            setCheckedItems(idData);
        }else setCheckedItems(Array(listData.length).fill(''));
    };
    
    const handleSingleCheckboxChange = (index,id) => (event) => {
        const { checked } = event.target;
        const newCheckedItems = [...checkedItems];
        if(checked) newCheckedItems[index] = id;
        else newCheckedItems[index] = '';
        setCheckedItems(newCheckedItems);
        setAllChecked(newCheckedItems.every(item => item));
    };



    return (
        <>
        <Box sx={{width:'100%', padding:'2rem 1rem'}}>
            <Box sx={{width:'100%', display:'flex' ,justifyContent:'space-between', color:'#82868C'}}>

                <Box sx={{display:'flex', alignItems:'center'}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5358 20.3631L16.8863 15.7131C18.3953 13.9015 19.1478 11.5779 18.9874 9.22556C18.8269 6.87322 17.7658 4.67331 16.0248 3.08349C14.2839 1.49367 11.997 0.636339 9.6401 0.689864C7.28316 0.743388 5.0376 1.70364 3.37057 3.37086C1.70353 5.03808 0.743382 7.28389 0.689863 9.64108C0.636344 11.9983 1.49358 14.2854 3.08323 16.0265C4.67287 17.7677 6.87254 18.8289 9.22462 18.9894C11.5767 19.1498 13.9001 18.3972 15.7114 16.8881L20.361 21.5381C20.5168 21.6938 20.7281 21.7812 20.9484 21.7812C21.1687 21.7812 21.38 21.6938 21.5358 21.5381C21.6136 21.4613 21.6753 21.3698 21.7174 21.269C21.7596 21.1681 21.7812 21.0599 21.7812 20.9506C21.7812 20.8413 21.7596 20.7331 21.7174 20.6323C21.6753 20.5314 21.6136 20.4399 21.5358 20.3631ZM2.38346 9.86586C2.37964 8.63457 2.67973 7.42136 3.25709 6.33385C3.83446 5.24634 4.67125 4.31813 5.69327 3.63157C6.71528 2.94501 7.89091 2.52131 9.11589 2.39805C10.3409 2.27479 11.5773 2.45578 12.7156 2.92498C13.8539 3.39417 14.8588 4.13705 15.6412 5.08774C16.4236 6.03843 16.9593 7.16754 17.2008 8.37492C17.4424 9.58229 17.3822 10.8306 17.0257 12.0092C16.6692 13.1877 16.0274 14.2601 15.1572 15.1311C14.1136 16.1795 12.7825 16.8947 11.3324 17.1862C9.88221 17.4776 8.37818 17.3323 7.01061 16.7686C5.64305 16.2049 4.47342 15.2482 3.64975 14.0194C2.82609 12.7907 2.3854 11.3452 2.38346 9.86586Z" fill="#82868C"/>
                    </svg>
                    <input type="text" placeholder='Search' id="searchField" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} style={{outline:'none', border:'none', paddingLeft:'1rem', fontSize:13, fontWeight:500}} />
                </Box>

                <Box sx={{'& :hover':{color:'#CA4040'}}} onClick={()=>deleteUser(checkedItems)}>
                    <Box sx={{display:'flex', alignItems:'center', cursor:'pointer', }}>
                        <DeleteIcon/>
                        <span style={{fontWeight:500, fontSize:14, padding:'0 0.7rem'}}>Delete</span>
                    </Box>
                </Box>

            </Box>
        </Box>

        <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <colgroup>
                    <col style={{width:'5%'}}/>
                    <col style={{width:'5%'}}/>
                    <col style={{width:'23%'}}/>
                    <col style={{width:'23%'}}/>
                    <col style={{width:'23%'}}/>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'5%', minWidth:80}}/>
                </colgroup>

                <TableHead sx={{background: '#F5F5F7'}}>
                    <TableRow>
                        <StyleTableCellHead theme={{textAlign:'start'}} padding="checkbox" >
                            <Checkbox  
                                checked={allChecked}
                                onChange={handleAllCheckboxChange}    
                            />
                        </StyleTableCellHead>
                        <StyleTableCellHead padding="checkbox">Avatar</StyleTableCellHead>
                        <StyleTableCellHead>Name</StyleTableCellHead>
                        <StyleTableCellHead>Username</StyleTableCellHead>
                        <StyleTableCellHead>Email</StyleTableCellHead>
                        <StyleTableCellHead>Role</StyleTableCellHead>
                        <StyleTableCellHead theme={{ width:80, padding:"0 1rem 0 0"}} scope="false">Edit</StyleTableCellHead>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {listData.map((row,index) => (
                        <TableRow
                            key={row.ID}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyleTableCellBody>
                                <Checkbox 
                                    value={row.ID} 
                                    checked={checkedItems[index] !== ''}
                                    onChange={handleSingleCheckboxChange(index,row.ID)}
                                />
                            </StyleTableCellBody>
                            <StyleTableCellBody><ShowAvatar id={row.avatar}/></StyleTableCellBody>
                            <StyleTableCellBody sx={{fontWeight:600}}>{row.fullname}</StyleTableCellBody>
                            <StyleTableCellBody>{row.username}</StyleTableCellBody>
                            <StyleTableCellBody>{row.email}</StyleTableCellBody>
                            <StyleTableCellBody>{role[row.role-1]}</StyleTableCellBody>
                            <StyleTableCellBody sx={{color:'#82868C'}} theme={{textAlign:'start', width:80, padding:"0 1rem 0 0"}}>
                                <div className='d-flex'>
                                    <Box onClick={()=>openAddUserPage(row.ID)} sx={{marginRight:'0.6rem', cursor:'pointer', '& :hover':{color:'#2940D3'}}}>
                                        <CreateIcon/>
                                    </Box>
                                    <Box onClick={()=>deleteUser([row.ID])} sx={{marginRight:'0.6rem', cursor:'pointer', '& :hover':{color:'#CA4040'}}}>
                                        <DeleteIcon/>
                                    </Box>
                                </div>
                            </StyleTableCellBody>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        
        <Box  sx={{width:'100%', display:'flex', justifyContent:'center', padding:'1rem 0 0 0', margin: '0 0 2rem 0'}}>
            <Stack spacing={10}>
                <StylePagination page={page} count={Math.ceil(data.length/10)} shape="rounded" onChange={handleChange}/>
            </Stack>
        </Box>
        </> 
    )
}
