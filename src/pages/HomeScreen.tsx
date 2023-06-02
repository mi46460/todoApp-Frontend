import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Todo } from '../domain/model/todo';


function HomeScreen() {
    const [id, setId] = useState<Number>()
    const [title, setTitle] = useState('')
    const [data, setData] = useState<Todo[]>([])
    const localhost = 'http://localhost:3000'
    const [dialogVisibility, setDialogVisibility] = useState(false)
    const [buttonDialogClicked, setButtonDialogClicked] = useState(false)
    const [buttonName, setButtonName] = useState('Create')
    const configHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json',
    }

    useEffect(() => {
        axios.get(`${localhost}/todos/`)
        .then(function (response) {
            setData(response.data)
          })
          .catch(function (error) {
            console.log(error);
          })
    }, [buttonDialogClicked])

    const handleCreateData = () => {
        axios.post(`${localhost}/todos/create`,
        {
            data: {
                title: title
            },
            headers: configHeaders
        }
        ).then(function (response) {
            console.log(response.status)
            if(response.status === 200) {
                setDialogVisibility(false)
                setId(0)
                setTitle('')
                setButtonDialogClicked(!buttonDialogClicked)
            }
          }).catch(function (error) {
            console.log(error);
          })
    }

    const handleUpdateData = () => {
        axios.put(`${localhost}/todos/update`,
        {
            data:{
                id: id,
                title: title
            }
        }
        ).then(function (response) {
            console.log(response.status)
            if(response.status === 200) {
                setDialogVisibility(false)
                setId(0)
                setTitle('')
                setButtonDialogClicked(!buttonDialogClicked)
            }
          }).catch(function (error) {
            console.log(error);
          })
    }

    const handleDeleteData = (todo: Todo) => {
        axios.delete(
            `${localhost}/todos/delete`,
            {
                data: {
                    id: todo.id
                },
                headers: configHeaders,
            }
        ).then(function (response) {
            console.log(response.status)
            if(response.status == 200) {
                setButtonDialogClicked(!buttonDialogClicked)
            }
          }).catch(function (error) {
            console.log(error);
          })
    }

    const handleButtonDialog = () => {
        if(buttonName === "Create") {
            handleCreateData()
        } else {
            handleUpdateData()
        }
    }

    const handleButtonCreate = () => {
        setButtonName("Create")
        setDialogVisibility(true)
    }

    const handleButtonEdit = (item: Todo) => {
        setTitle(item.title)
        setId(item.id)
        setButtonName("Update")
        setDialogVisibility(true)
    }
 
    return(
        <div className={`h-screen ${dialogVisibility == true ? 'flex justify-center items-center' : ''}`}>
            <div className={`${dialogVisibility == true ? 'hidden' : 'flex'} flex-col items-center`}>
                <div className='bg-green-400 mt-2 mb-2 w-1/2 h-16 flex items-center rounded pl-4'>
                    Data Todo List
                </div>
                <div className='w-1/2 flex flex-col border border-gray-300'>
                    <div className='border-b-2 border-gray-300 py-3 w-full pl-3 flex justify-between'>
                        Todo List
                        <div 
                        className="pr-3 hover:cursor-pointer"
                        onClick={() => handleButtonCreate()}
                        >Create Todo</div>
                    </div>
                    <div className='py-3 px-3 bg-slate-50'>
                        <div className='flex flex-col items-center pb-3'>
                            {
                                data.map((item , index) => 
                                <div className='flex justify-between w-full'>
                                    <div className='font-sas'>
                                        {item.title}
                                    </div>
                                    <div className='flex'>
                                        <div className='mr-4 font-sas hover:cursor-pointer' onClick={() => handleButtonEdit(item)}>edit</div>
                                        <div className='font-sas hover:cursor-pointer' onClick={() => handleDeleteData(item)}>delete</div>
                                    </div>
                                </div>
                                )
                            }     
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${dialogVisibility == true ? 'flex' : "hidden"} w-1/3 flex-col border rounded border-gray-300`}>
                <div className='flex justify-end pr-2 pt-2 hover:cursor-pointer' 
                onClick={() => {
                    setDialogVisibility(false)
                    setTitle('')
                    setId(0)
                }}
                >
                    X
                </div>
                <div className='flex-col p-3'>
                    <span className="block text-sm font-medium text-slate-700">Todo Title</span>
                    <input 
                    className="border-slate-200 border-2 rounded placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 w-full"
                    value={title}
                    onChange={e => setTitle(e.target.value)} 
                    />
                    <div className='flex justify-center'>
                    <button type="button" 
                    className="bg-indigo-500 w-1/4 text-white mt-2 radius" 
                    onClickCapture={() => handleButtonDialog()}
                    >
                        {buttonName}
                    </button>
                    </div>
                    
                </div>   
            </div>  
        </div>
    );
}

export default HomeScreen;