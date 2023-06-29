import { Icon } from '@rsuite/icons';
import PlusIcon from '@rsuite/icons/Plus';
import VisibleIcon from '@rsuite/icons/Visible';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import TwitterIcon from '@rsuite/icons/legacy/Twitter';
import React, { useEffect, useState } from 'react';
import { FcLike } from "react-icons/fc";
import { Breadcrumb, ButtonToolbar, Divider, IconButton, Input, Placeholder, Stack, Tag } from 'rsuite';
import Cookies from 'universal-cookie';
import Comment from './Comment';

function Loading({image}){
    if(image) return(<><Placeholder.Graph active /><Placeholder.Paragraph rows={15} /></>)
    return(<Placeholder.Paragraph rows={1} />)
}

function Item({item,result}){
    const [tags, setTags] = useState([]);
    const [typing, setTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const cookie=new Cookies();
    useEffect(()=>{
        setTags(item.tag)
    },[item])
    function sendTag(data){
        fetch(`/api/blog.tag.add`,{
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
                result(res.result)
                setTyping(false);
            }
        })
    }
    const onTag = () => {
        let data=new FormData();
        data.append('BlogID',item.id);
        data.append('tag',document.getElementById('tag').value);
        sendTag(data)
    }

    function deleteTag(data){
        fetch(`/api/blog.tag.delete`,{
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
                result(res.result)
            }
        })
    }
    const removeTag=(id)=>{
        let data=new FormData();
        data.append('BlogID',item.id);
        data.append('tag',id);
        deleteTag(data)
    }

    return(
        <>
            <div style={{minHeight:'50vh'}}>{item.content}</div>
            <Stack wrap spacing={6}>
                {tags.map((element)=>(
                    <Tag closable={cookie.get('token')?true:false} onClose={() => removeTag(element.id)} style={{color:element.color,border:'1px solid',borderColor:element.color,backgroundColor:'#fff'}} key={element.id}>{element.name}</Tag>
                ))}
                {
                    cookie.get('token')?(!typing?(<IconButton className="tag-add-btn" onClick={()=>setTyping(true)} icon={<PlusIcon />} appearance="ghost" size="xs" />):<Input className="tag-input" size="xs" id='tag' style={{ width: 70 }} value={inputValue} onChange={setInputValue} onBlur={onTag} onPressEnter={onTag} />):null
                }
            </Stack>
        </>
    )
}

function Blog() {
    const [data,setData]=useState(null)
    function getData(){
        let url=window.location.pathname
        fetch(`/api/blog.get/${url.split("/")[2]}`,{
            method:'GET'
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                setData(res.blog)
            }
        })
    }

    function sendLike(data){
        fetch(`/api/blog.like`,{
            method:'POST',
            body:data,
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                setData(res.blog) 
            }
        })
    }
    const onLike = (id) => {
        let data=new FormData();
        data.append('BlogID',id);
        sendLike(data)
    }

    const returnResult=(result)=>{
        if(result){
            getData()
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            getData()
        }, 1500);
    },[])
    
    return (
        <div>
            <div className='container py-3'>
                {data?(<Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>{data.title}</Breadcrumb.Item>
                </Breadcrumb>):<Loading image={false} />}
                <h1>{data?(data.title):<Loading image={false} />}</h1>
                <div className='d-flex justify-content-between mt-3'>
                    <div className='d-flex align-items-center'>
                    {data?(<ButtonToolbar>
                        <IconButton size="xs" icon={<FacebookOfficialIcon />} color="blue" appearance="primary" circle />
                        <IconButton size="xs" icon={<TwitterIcon />} color="cyan" appearance="primary" circle />
                        <IconButton size="xs" icon={<Icon as={FcLike} />} className='border' onClick={()=>onLike(data.id)}>{data.like}</IconButton>
                        <IconButton size="xs" icon={<VisibleIcon />} className='border'>{data.look}</IconButton>
                    </ButtonToolbar>):null}
                    </div>
                    <h5 className='text-end'>{data?(<>發布至{data.date}</>):<Loading image={false} />}</h5>
                </div>
                <Divider />
            </div>
            <div className='container px-3 rounded'>
                {data?(<Item item={data} result={returnResult} />):<Loading image={true} />}
            </div>
            <div className='container p-3 rounded'>
                {data?(<Comment id={data.id} />):null}
            </div>
        </div>
    );
}

export default Blog;