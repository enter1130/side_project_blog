import AddOutlineIcon from '@rsuite/icons/AddOutline';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';
import TextImageIcon from '@rsuite/icons/TextImage';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, ButtonToolbar, Form, Input, Loader, Message, TagPicker, Toggle, Uploader, useToaster } from 'rsuite';
import Cookies from 'universal-cookie';

function CreateBlog() {
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const cookie=new Cookies()
    const{handleSubmit}=useForm()
    const onSubmit=()=>{
        let data=new FormData();
        data.append('content',value);
        data.append('cover',cover);
        data.append('show',show);
        data.append('tag',gettag);
        data.append('date',new Date().toLocaleDateString());
        data.append('title',document.getElementById('title').value);
        createBlog(data)
    }
    function createBlog(data){
        fetch('/api/blog.create',{
            method:'POST',
            body:data,
            headers: {
            'Authorization': cookie.get('token'),
            'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
          }
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                window.location.href=`/blog`
            }
        })
    }

    const toaster = useToaster();
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);
    const [cover, setCover] = useState(null);
    function previewFile(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
          callback(reader.result);
        };
        reader.readAsDataURL(file);
        setCover(file);
    }

    var modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }
    
    var  formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const [tag, setTag] = useState([]);
    const [gettag, setGetTag] = useState([]);
    function getTag(){
        fetch('/api/tag.get',{
            method:'GET',
            headers: {
            'Authorization': cookie.get('token'),
            'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
          }
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                setTag(res.tag)
            }
        })
    }

    useEffect(()=>{
        getTag()
    },[])

    return (
        <div className='py-3 container'>
            <div className='d-flex justify-content-between pb-3 align-items-end'>
                <h1 className='d-flex align-items-center'><TextImageIcon className='me-1' />新增文章</h1>
                <h5>發布日期 {new Date().toLocaleDateString()}</h5>
            </div>
            <Form.Group className='pb-3'>
                <Form.ControlLabel as={'h3'}>封面</Form.ControlLabel>
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <Uploader
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
                        <button style={{ width: 1920/3, height: 1080/3 }}>
                            {uploading && <Loader backdrop center />}
                            {fileInfo ? (<img src={fileInfo} width="100%" height="100%" />) : (<CameraRetroIcon style={{ fontSize: 80 }} />)}
                        </button>
                    </Uploader>
                    <Form.HelpText>封面請以16:9或1:1的格式上傳，例如1920x1080，255x255等分辯率</Form.HelpText>
                </div>
            </Form.Group>
            <Form className='pt-3' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.ControlLabel as={'h3'}>標題</Form.ControlLabel>
                    <Input id='title' type='text' defaultValue={''} size='lg' required />
                    <Form.HelpText>暫限20字以內</Form.HelpText>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel as={'h3'}>標籤</Form.ControlLabel>
                    <TagPicker creatable size="lg" placeholder="Large" data={tag} onChange={(value)=>setGetTag(value)} block />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel as={'h3'}>內容</Form.ControlLabel>
                    <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
                    <Form.HelpText>暫無提供圖片上傳功能</Form.HelpText>
                </Form.Group>
                <ButtonToolbar className='d-flex flex-row justify-content-end mt-3'>
                    <Toggle checked={show} onChange={()=>setShow(!show)} size="lg" checkedChildren="發布" unCheckedChildren="不發布" />
                    <Button size="lg" type='submit' startIcon={<AddOutlineIcon/>}>新增</Button>
                    <Button size="lg" onClick={()=>window.location.href='/admin'} startIcon={<CloseOutlineIcon />} >取消</Button>
                </ButtonToolbar>
            </Form>
        </div>
    );
}

export default CreateBlog;