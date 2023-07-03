import { Icon } from '@rsuite/icons';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import TextImageIcon from '@rsuite/icons/TextImage';
import VisibleIcon from '@rsuite/icons/Visible';
import React, { useEffect, useState } from 'react';
import { FcLike } from "react-icons/fc";
import { Button, ButtonToolbar, Col, List, Row, Stack, Tag } from 'rsuite';
import Cookies from 'universal-cookie';

function Item({item}){
    return(
        <Row>
            <Col xs={12} sm={12} md={3} className='py-1'>
                <img src={item.cover} className='rounded img-fluid mx-1' style={{maxHeight:'80px'}} />
            </Col>
            <Col xs={12} sm={12} md={6} className='py-1'>
                <h5 className='text-dark'>{item.title}</h5>
                <div className='text-muted'>發布日期：{item.date}</div>
                <div>
                    <div className='d-flex align-items-center'><Icon as={FcLike} className='me-1' />{item.like.toLocaleString()}</div>
                    <div className='d-flex align-items-center'><VisibleIcon className='me-1' />{item.look.toLocaleString()}</div>
                </div>
            </Col>
            <Col xs={24} sm={24} md={12} className='p-1'>
                <div className='text-muted over-line' title="content"><div dangerouslySetInnerHTML={{__html: item.content}} /></div>
                <Stack className='mt-1' wrap spacing={6}>
                    {item.tag.map((element,i)=>(
                        i<=3?(<Tag style={{color:element.color,border:'1px solid',borderColor:element.color,backgroundColor:'#fff'}} key={element.id}>{element.name}</Tag>):null
                    ))}
                    {item.tag.lenght>4?(<Tag style={{color:'red',border:'1px solid',borderColor:'red',backgroundColor:'#fff'}} >{'更多⋯⋯'}</Tag>):null}
                </Stack>
            </Col>
            <Col xs={24} sm={24} md={3} className='py-1 d-flex align-items-stretch justify-content-end'>
                <div>
                    <a href={`/blog/${item.id}`}>檢視</a><span className='px-2'>|</span><a href={`/blog.update/${item.id}`}>修改</a>
                </div>
            </Col>
        </Row>
    )
}

function UserBlog() {
    const cookie=new Cookies()
    const [blog,setBlog]=useState([])
    function getBlog(){
        fetch('/api/blog.user.get',{
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
                setBlog(res.blog)
            }
        })
    }

    useEffect(()=>{
        getBlog()
    },[])

    return (
        <div className='py-3 container'>
            <div className='d-flex justify-content-between pb-3 align-items-end'>
                <h1 className='d-flex align-items-center'><TextImageIcon className='me-1' />我的文章</h1>
                <ButtonToolbar>
                    <Button size="lg" onClick={()=>window.location.href='/blog.create'} startIcon={<AddOutlineIcon/>}>新增</Button>
                </ButtonToolbar>
            </div>
            <div>
                <List autoScroll hover bordered style={{height:'650px'}}>
                {blog.length!=0?(blog.map((item,i)=>(
                    <List.Item key={item.id} index={i+1}>
                        <Item item={item} />
                    </List.Item>
                ))):<div style={{height:'650px'}} className='d-flex justify-content-center align-items-center'>請點擊 <Button size="xs" onClick={()=>window.location.href='/blog.create'} startIcon={<AddOutlineIcon/>}>新增</Button> 以新增更多文章</div>}
                </List>
            </div>
        </div>
    );
}

export default UserBlog;