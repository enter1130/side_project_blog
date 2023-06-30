import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CustomProvider } from 'rsuite';
import About from './AboutMe/About';
import Admin from './Admin/Admin';
import CreateBlog from './Admin/Blog/CreateBlog';
import Blog from './Blog/Blog';
import Home from './Home/Home';
import Menu from './Menu';
import User from './User/User';

function Index() {

    const [data,setData]=useState(null)
    function getData(){
        fetch('/api/blog.get',{
            method:'GET'
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                setData(res)
            }
        })
    }

    useEffect(()=>{
        getData()
    },[])

    if(!data) return(<></>)
    return (
        <CustomProvider>
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route index path='/' element={<Home user={data.user} blog={data.blog} />} />
                <Route path='/about' element={<About user={data.user} />} />
                <Route path='/user' element={<User />} />
                <Route path='/blog/:id' element={<Blog />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/blog.create' element={<CreateBlog />} />
            </Routes>
        </BrowserRouter>
        </CustomProvider>
    );
}

// export default Example;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
