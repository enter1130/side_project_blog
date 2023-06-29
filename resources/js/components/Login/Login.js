import AdminIcon from '@rsuite/icons/Admin';
import ExitIcon from '@rsuite/icons/Exit';
import GearIcon from '@rsuite/icons/Gear';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Button, Form, Modal, Nav } from 'rsuite';
import Cookies from 'universal-cookie';
function Login() {
    const [open,setOpen]=useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const cookie=new Cookies()
    const [user,setUser]=useState(null)
    function getAuth(){
        fetch('/api/auth',{
            method:'GET',
            headers: {
            'Authorization': cookie.get('token'),
            'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
            'Content-Type': 'application/json'
          }
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                setUser(res.user)
            }
        })
    }

    useEffect(()=>{
        getAuth();
    },[])

    const {handleSubmit}=useForm();
    const onSubmit = () => {
        let data=new FormData();
        data.append('email',document.getElementById('email').value);
        data.append('password',document.getElementById('password').value);
        getLogin(data)
    }
    function getLogin(data){
        fetch('/api/login',{
            method:'POST',
            body:data,
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                cookie.set('token',res.authorisation.type+' '+res.authorisation.token, {maxAge: 60*60,path:'/'})
                window.location.reload()
            }
        })
    }

    const getLogout=()=>{
        fetch('/api/logout',{
            method:'GET',
            headers: {
            'Authorization': cookie.get('token'),
            'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
            'Content-Type': 'application/json'
          }
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                setUser(null)
                window.location.reload()
            }
        })
    }

    if(user) return(
        <Nav.Menu title={<Avatar circle src={user.avatar} />}>
            <Nav.Item icon={<AdminIcon />}>{user.username}</Nav.Item>
            <Nav.Item icon={<GearIcon />} as={'a'} href='/admin'>後台</Nav.Item>
            <Nav.Item icon={<AdminIcon />} as={'a'} href='/user'>個人資料</Nav.Item>
            <Nav.Item icon={<ExitIcon />} as={'a'} onClick={getLogout}>登出</Nav.Item>
        </Nav.Menu>
    )
    return (
        <>
        <Nav.Item icon={<AdminIcon />} onClick={handleOpen}>Login</Nav.Item>
        <Modal open={open} onClose={handleClose}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="email">
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Form.Control name="email" type='email' />
                        <Form.HelpText tooltip>Required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.ControlLabel>Password</Form.ControlLabel>
                        <Form.Control name="password" type='password' />
                        <Form.HelpText tooltip>Required</Form.HelpText>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type={'submit'} appearance="primary">Login</Button>
                    <Button onClick={handleClose} appearance="subtle">Cancel</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
}

export default Login;