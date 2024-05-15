import React, { useEffect, useState } from 'react'
import { Navbar } from '../companents/navbar'
import { PageTable } from '../companents/table'
import { v4 as uuidv4 } from 'uuid';
import { data } from '../data/userdata'
import { AddUsers } from '../companents/addUsers'


export const MainPages = () => {
    const [userData,setUserData] = useState(data); //arama işlemlerinin yazılacağı alan
    const [filterData, setFilterData] = useState(data); //filtrelenmiş veriyi tutar
    const [searchData, setSearchData] = useState([]); //arama alanı çalıştığında giden veri
    const [updateData,setUpdateData] = useState({}); //user formu update veya add işlemi için ayarlar
    const [isActiveAdduser, setActiveAdduser] = useState(false); //user formu aktif veya pasif hale getirir
    const [searchValue, setSearchValue] = useState(""); //search alanına yazılan değer
    const [filterType, setFiterType] = useState(0); //filtreleme türü

    const addUser = (data)=>{ //kişi ekleme
        data.ID = uuidv4();
        const temp = [...userData, data];
        setUserData(temp);
    }
    const updateUser = (id,data)=>{ //kişi güncelleme
        const temp = userData.map(user => user.ID === id ? data : user);
        setUserData(temp);
    }
    const deleteUser = (id)=>{ //kişi silme
        const temp = userData.filter(user => !id.includes(user.ID));
        setUserData(temp);
    }
    
    const filterUser = (type)=>{//kişileri rollerine göre filtreleme
        if(type === 0) {
            setFilterData(userData);
        }
        else {
            setFilterData(userData.filter(item=> item.role === type));
        }
    }

    const searchUser = ()=>{//arama alanı ile kişileri filtreliyoruz
        const temp = filterData.filter(item => 
             (item.username.toLowerCase().includes(searchValue.toLowerCase()) ||
             item.email.toLowerCase().includes(searchValue.toLowerCase()))
        )
        setSearchData(temp)
    }

    const openAddUserPage = (id) => { // user formu update veya add işlemi için açıyor
        if(id===-1){
            setUpdateData({ID:-1});
        }
        else{
            let temp = userData.filter(user => user.ID === id);
            setUpdateData(temp);
        }
        setActiveAdduser(true);
    }

    const closeAddUserPage = () => {//user formu kapatıyor
        setActiveAdduser(false);
    }
    
    useEffect(()=>{
        searchUser()
    },[searchValue,filterData])

    useEffect(()=>{
        filterUser(filterType)
        console.log(filterType);
    },[filterType,userData])
    
    return (
        <>
            <Navbar
                openAddUserPage={openAddUserPage}
                setFiterType={setFiterType}
            />
            <PageTable 
                data={searchData}
                openAddUserPage={openAddUserPage}
                deleteUser={deleteUser}
                searchValue={searchValue}
                filterType={filterType}
                setSearchValue={setSearchValue}
            />
            {isActiveAdduser&&
            <AddUsers 
                userData={updateData[0]}
                setActive={closeAddUserPage}
                updateUser={updateUser}
                addUser={addUser}
            />
            }
        </>
    )
}
