import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CustomProvider } from 'rsuite';
import Blog from './Blog/Blog';
import Home from './Home/Home';
import Menu from './Menu';
import CreateBlog from './User/Blog/CreateBlog';
import UpdateBlog from './User/Blog/UpdateBlog';
import UserBlog from './User/Blog/UserBlog';
import User from './User/User';

function Index() {
    return (
        <CustomProvider>
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route index path='/' element={<Home />} />
                {/* <Route path='/about' element={<About />} /> */}
                <Route path='/user' element={<User />} />
                <Route path='/blog/:id' element={<Blog />} />
                {/* <Route path='/admin' element={<Admin />} /> */}
                <Route path='/blog' element={<UserBlog />} />
                <Route path='/blog.create' element={<CreateBlog />} />
                <Route path='/blog.update/:id' element={<UpdateBlog />} />
            </Routes>
        </BrowserRouter>
        </CustomProvider>
    );
}

// export default Example;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
