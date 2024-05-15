import React from 'react'

export const ShowAvatar = ({id}) => {
  return (
    <>
        {parseInt(id)===1&&
        <label className={'avatar-items'} style={{width:'100%', height:'100%' ,background:'#BA8A6C'}}>
            <img className='w-100 h-100' alt='avatar' src={require("../img/avatar1.png")}/>
            <input type='radio' name='avatar' value='1'/>
        </label>
        }
        {parseInt(id)===2&&
        <label className={'avatar-items'} style={{width:'100%', height:'100%' ,background:'#F4B8AB'}}>
            <img className='w-100 h-100' alt='avatar' src={require("../img/avatar2.png")}/>
            <input type='radio' name='avatar' value='2'/>
        </label>
        }
        {parseInt(id)===3&&
        <label className={'avatar-items'} style={{width:'100%', height:'100%' ,}}>
            <img className='w-100 h-100' alt='avatar' src={require("../img/avatar3.png")}/>
            <input type='radio' name='avatar' value='3'/>
        </label>
        }
        {parseInt(id)===4&&
        <label className={'avatar-items'} style={{width:'100%', height:'100%' ,}}>
            <img className='w-100 h-100' alt='avatar' src={require("../img/avatar4.png")}/>
            <input type='radio' name='avatar' value='4'/>
        </label>
        }
        {parseInt(id)===5&&
        <label className={'avatar-items'} style={{width:'100%', height:'100%' ,background:'#3361FF1A'}}>
            <img className='w-100 h-100' alt='avatar' src={require("../img/avatar5.png")}/>
            <input type='radio' name='avatar' value='5'/>
        </label>
        }
        {parseInt(id)===6&&
        <label className={'avatar-items'} style={{width:'100%', height:'100%' ,background:'#3361FF1A'}}>
            <img className='w-100 h-100' alt='avatar' src={require("../img/avatar6.png")}/>
            <input type='radio' name='avatar' value='6'/>
        </label>
        }
    </>
  )
}
