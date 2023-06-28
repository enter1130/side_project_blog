import { Icon } from '@rsuite/icons';
import MessageIcon from '@rsuite/icons/Message';
import VisibleIcon from '@rsuite/icons/Visible';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import TwitterIcon from '@rsuite/icons/legacy/Twitter';
import React, { useEffect, useState } from 'react';
import { FcLike } from "react-icons/fc";
import { Button, ButtonToolbar, Divider, FlexboxGrid, Form, IconButton, Placeholder, Stack, TagInput } from 'rsuite';
import FormControlLabel from 'rsuite/esm/FormControlLabel';
import Comment from './Comment';

function Loading({image}){
    if(image) return(<><Placeholder.Graph active /><Placeholder.Paragraph rows={15} /></>)
    return(<Placeholder.Paragraph rows={1} />)
}

function Item({item,result}){
    function sendTag(data){
        fetch(`/api/blog.tag`,{
            method:'POST',
            body:data,
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                result(res.result)
            }
        })
    }
    const onTag = () => {
        let data=new FormData();
        data.append('BlogID',item.id);
        data.append('tag',document.getElementById('tag').value);
        sendTag(data)
    }
    return(
        <FlexboxGrid justify='space-around'>
            <FlexboxGrid.Item colspan={20}>
                <div>{item.content}</div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
                <Stack wrap spacing={6}>
                {item.tag?(JSON.parse(item.tag).map((element,i)=>(
                    <Button size='xs'>{item.name}</Button>
                ))):null}
                <Form>
                    <FormControlLabel size="xs">標籤</FormControlLabel>
                    <TagInput size="xs" style={{ width: '100%'}} />
                </Form>
                </Stack>
            </FlexboxGrid.Item>
        </FlexboxGrid>
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
                setTimeout(() => {
                    setData(res.blog)                    
                }, 1500);
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

    useEffect(()=>{
        getData()
    },[])
    
    return (
        <div>
            <div className='container py-3'>
                <h1>{data?(data.title):<Loading image={false} />}</h1>
                <div className='d-flex justify-content-between mt-3'>
                    <div className='d-flex align-items-center'>
                    {data?(<ButtonToolbar>
                        <IconButton size="xs" icon={<FacebookOfficialIcon />} color="blue" appearance="primary" circle />
                        <IconButton size="xs" icon={<TwitterIcon />} color="cyan" appearance="primary" circle />
                        <IconButton size="xs" icon={<Icon as={FcLike} />} className='border' onClick={()=>onLike(data.id)}>{data.like}</IconButton>
                        <IconButton size="xs" icon={<VisibleIcon />} className='border'>{data.look}</IconButton>
                        <IconButton size="xs" icon={<MessageIcon />} className='border'>{data.comment.length}</IconButton>
                    </ButtonToolbar>):null}
                    </div>
                <h5 className='text-end'>{data?(<>發布至{data.date}</>):<Loading image={false} />}</h5>
                </div>
                <Divider />
            </div>
            <div className='container px-3 rounded' style={{minHeight:'50vh'}}>
                {data?(<Item item={data} />):<Loading image={true} />}
            </div>
            <div className='container p-3 rounded'>
                {data?(<Comment id={data.id} />):null}
            </div>
        </div>
    );
}

export default Blog;