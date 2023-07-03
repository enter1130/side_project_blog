import AdminIcon from '@rsuite/icons/Admin';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import EditIcon from '@rsuite/icons/Edit';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useForm } from 'react-hook-form';
import { Button, ButtonToolbar, Col, Divider, Form, Input, Loader, Message, Row, Toggle, Uploader, useToaster } from 'rsuite';
import Cookies from 'universal-cookie';

function ResetPassword(){
    const [edit, setEdit] = useState(false);

    if(!edit) return(
        <Form.Group>
            <Row>
                <Col className='ps-3' xs={24} sm={12} md={8}>
                    <h5>修改密碼</h5>
                    <Form.HelpText></Form.HelpText>
                </Col>
                <Col xs={24} sm={12} md={16}>
                    <Toggle checked={edit} onClick={()=>setEdit(!edit)} />
                </Col>
            </Row>
        </Form.Group>
    )
    return(
        <>
            <Form.Group>
                <Row>
                    <Col className='ps-3' xs={24} sm={12} md={8}>
                        <h5>修改密碼</h5>
                        <Form.HelpText></Form.HelpText>
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <Toggle checked={edit} onClick={()=>setEdit(!edit)} />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col className='ps-3' xs={24} sm={12} md={8}>
                        <h5>新密碼</h5>
                        <Form.HelpText>登入用新密碼，修改後會登出</Form.HelpText>
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <Input id='password_new' size='lg' type={'password'} disabled={!edit} defaultValue={''} required />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col className='ps-3' xs={24} sm={12} md={8}>
                        <h5>確認新密碼</h5>
                        <Form.HelpText>輸入和新密碼一樣的密碼</Form.HelpText>
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <Input id='password_new_2' size='lg' type={'password'} disabled={!edit} defaultValue={''} required />
                    </Col>
                </Row>
            </Form.Group>
        </>
    )
}

function Item({user,result}){
    const cookie=new Cookies()
    const toaster = useToaster();
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(user.avatar?(user.avatar):null);
    const [avatar, setAvatar] = useState(null);
    function previewFile(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
          callback(reader.result);
        };
        reader.readAsDataURL(file);
        setAvatar(file);
    }

    const handleEdit=()=>{
        setFileInfo(user.avatar)
        setAvatar(null)
        setEdit(!edit)
    }

    const [edit,setEdit]=useState(false)
    const {handleSubmit}=useForm();
    const onSubmit = () => {
        let data=new FormData();
        data.append('username',document.getElementById('username').value);
        data.append('email',document.getElementById('email').value);
        data.append('avatar',avatar);
        updateUser(data)
    }
    function updateUser(data){
        fetch('/api/user.update',{
            method:'POST',
            body:data,
            headers: {
            'Authorization': cookie.get('token'),
            },
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                result(res.result)
                setEdit(false)
            }
        })
    }

    return(
        <>
            <div className='d-flex justify-content-between pb-3 align-items-end'>
                <h1 className='d-flex align-items-center'><AdminIcon />個人資料</h1>
                <ButtonToolbar>
                    <Button size="lg" type={'button'} startIcon={!edit?(<EditIcon />):<CloseIcon />} onClick={handleEdit}>{!edit?('修改'):'取消'}</Button>
                </ButtonToolbar>
            </div>
            <div className='my-3'>
                <Form.Group>
                    <Row className='d-flex align-items-center'>
                        <Col className='ps-3' xs={24} sm={12} md={8}>
                            <h5>個人頭像</h5>
                            <Form.HelpText>用戶頭像，圖片不可超過2MB</Form.HelpText>
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <Uploader
                                disabled={!edit}
                                fileListVisible={false}
                                listType="picture"
                                action="/api/user.avatar.preview"
                                onUpload={file => {
                                    setUploading(true);
                                    previewFile(file.blobFile, value => {setFileInfo(value)});
                                }}
                                onSuccess={(response, file) => {
                                    setUploading(false);
                                    toaster.push(<Message type="success">上傳成功</Message>);
                                }}
                                onError={() => {
                                    setFileInfo(null);
                                    setUploading(false);
                                    toaster.push(<Message type="error">上傳失敗</Message>);
                                }}
                                >
                                <button style={{ width: 150, height: 150 }}>
                                    {uploading && <Loader backdrop center />}
                                    {fileInfo ? (<img src={fileInfo} width="100%" height="100%" />) : (<AvatarIcon style={{ fontSize: 80 }} />)}
                                </button>
                            </Uploader>
                        </Col>
                    </Row>
                </Form.Group>
                <Divider />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Row>
                            <Col className='ps-3' xs={24} sm={12} md={8}>
                                <h5>暱稱</h5>
                                <Form.HelpText>用戶暱稱，可輸入中文</Form.HelpText>
                            </Col>
                            <Col xs={24} sm={12} md={16}>
                                <Input id='username' size='lg' type={'text'} disabled={!edit} defaultValue={user.username} required />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col className='ps-3' xs={24} sm={12} md={8}>
                                <h5>電郵</h5>
                                <Form.HelpText>常用聯絡電郵，用於登入，不可重複</Form.HelpText>
                            </Col>
                            <Col xs={24} sm={12} md={16}>
                                <Input id='email' size='lg' type={'email'} disabled={!edit} defaultValue={user.email} required />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col className='ps-3' xs={24} sm={12} md={8}>
                                <h5>個人介紹</h5>
                                <Form.HelpText>個人介紹，字數不可超過500個字</Form.HelpText>
                            </Col>
                            <Col xs={24} sm={12} md={16}>
                                <Input as="textarea" rows={5}  id='description' size='lg' type={'text'} disabled={!edit} defaultValue={user.description} required />
                            </Col>
                        </Row>
                    </Form.Group>
                    {edit?(<Form.Group>
                        <Row>
                            <Col className='ps-3' xs={24} sm={12} md={8}>
                                <h5>密碼</h5>
                                <Form.HelpText>登入用密碼，修改個人資料時需要填寫</Form.HelpText>
                            </Col>
                            <Col xs={24} sm={12} md={16}>
                                <Input id='password' size='lg' type={'password'} disabled={!edit} required />
                            </Col>
                        </Row>
                    </Form.Group>):null}
                    {edit?(<><Divider /><ResetPassword /></>):null}
                    <ButtonToolbar className='d-flex flex-row align-items-end justify-content-end'>
                        {edit?(<Button startIcon={<CheckIcon />} size="lg" className='me-3' type='submit'>保存</Button>):null}
                        <Button size="lg" type={'button'} startIcon={!edit?(<EditIcon />):<CloseIcon />} onClick={handleEdit}>{!edit?('修改'):'取消'}</Button>
                    </ButtonToolbar>
                </Form>
            </div>
        </>
    )
}

function User() {
    const cookie=new Cookies()
    const [user,setUser]=useState(null)
    function getUser(){
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
        getUser();
    },[])

    const returnResult=(result)=>{
        if(result){
            getUser();
        }
    }

    if(!user) return(<></>)
    return (
        <div>
            <div style={{backgroundColor:'#2EC4B6'}}>
                <div className='container'>
                    <div className='d-flex justify-content-between pb-3 align-items-end' style={{paddingTop:'100px'}}>
                        <div className='d-flex align-items-end justify-content-start flex-column'>
                            <h1>{user.username}</h1>
                        </div>
                        <Avatar src={user.avatar} name={user.username} round={true} size="150" className='border bg-light' />
                    </div>
                </div>
            </div>
            <div className='container mt-3'>
                <Item user={user} result={returnResult} />
            </div>
        </div>
    );
}

export default User;