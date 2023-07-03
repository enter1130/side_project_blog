import { Icon } from '@rsuite/icons';
import EditIcon from '@rsuite/icons/Edit';
import VisibleIcon from '@rsuite/icons/Visible';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import TwitterIcon from '@rsuite/icons/legacy/Twitter';
import React, { useEffect, useState } from 'react';
import { FcLike } from "react-icons/fc";
import { Breadcrumb, Button, ButtonToolbar, Divider, IconButton, Placeholder, Stack, Tag } from 'rsuite';
import Cookies from 'universal-cookie';
import Comment from './Comment';
function Loading({image}){
    if(image) return(<><Placeholder.Graph active /><Placeholder.Paragraph rows={15} /></>)
    return(<Placeholder.Paragraph rows={1} />)
}

function Item({item,result}){
    const [tags, setTags] = useState([]);
    useEffect(()=>{
        setTags(item.tag)
    },[item])

    return(
        <>
            <div style={{minHeight:'50vh'}}><div dangerouslySetInnerHTML={{__html: item.content}} /></div>
            <Stack wrap spacing={6}>
                {tags.map((element)=>(
                    <Tag style={{color:element.color,border:'1px solid',borderColor:element.color,backgroundColor:'#fff'}} key={element.id}>{element.name}</Tag>
                ))}
            </Stack>
        </>
    )
}

function Blog() {
    const cookie=new Cookies()
    const [data,setData]=useState(null)
    const [permission,setPermission]=useState(false)
    function getData(){
        let url=window.location.pathname
        fetch(`/api/blog.get/${url.split("/")[2]}`,{
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
                setData(res.blog)
                setPermission(res.permission)
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
                <div className='d-flex justify-content-between pb-3 align-items-end'>
                    <h1>{data?(data.title):<Loading image={false} />}</h1>
                    {permission?(<ButtonToolbar>
                        <Button size="lg" onClick={()=>window.location.href=`/blog.update/${data.id}`} startIcon={<EditIcon />}>修改</Button>
                    </ButtonToolbar>):null}
                </div>
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