import React, { useEffect, useState } from 'react';
import { Col, Panel, Placeholder, Row, Tag, TagGroup } from 'rsuite';
import About from '../AboutMe/About';

function Loading(){
    return(
        <div>
            <Panel className='m-3' header={<h4>標題</h4>} bordered>
                <Placeholder.Paragraph rows={5} graph='image' />
            </Panel>
            <Panel className='m-3' header={<h4>標題</h4>} bordered>
                <Placeholder.Paragraph rows={5} graph='image' />
            </Panel>
            <Panel className='m-3' header={<h4>標題</h4>} bordered>
                <Placeholder.Paragraph rows={5} graph='image' />
            </Panel>
        </div>
    )
}

function Item({item}){
    return(
        <Panel className='m-2' header={<div className='d-flex justify-content-between align-items-end flex-row'><h3>{item.title}</h3><h6 className='text-muted'>{item.date}</h6></div>} bordered style={{cursor:'pointer'}} onClick={()=>window.location.href=`/blog/${item.id}`}>
            <Row>
                <Col md={16}>
                    <div style={{minHeight:'150px'}}>{item.content}</div>
                    <div className='d-flex align-items-end flex-column'>
                        <div className='d-flex align-items-center'>
                        {item?(<TagGroup className='mb-3'>
                            {item.tag.map((element,i)=>(
                                i<=2?(<Tag style={{color:element.color,border:'1px solid',borderColor:element.color,backgroundColor:'#fff'}} key={element.id}>{element.name}</Tag>):null
                            ))}
                            {item.tag.lenght>3?(<Tag style={{color:'red',border:'1px solid',borderColor:'red',backgroundColor:'#fff'}} >{'更多⋯⋯'}</Tag>):null}
                        </TagGroup>):null}
                        </div>
                    </div>
                </Col>
                <Col md={8}>
                    <div className='text-center ms-2'>
                        <img src={item.cover} className='img-fluid rounded' />
                    </div>
                </Col>
            </Row>
        </Panel>
    )
}

function Main({blog}){
    const [blogs,setBlogs]=useState(null)
    useEffect(()=>{setTimeout(() => {setBlogs(blog)}, 1500);},[])
    return(blogs!=null?(blogs.map((item)=>(<Item key={item.id} item={item} />))):<Loading />)
}

function Home({user,blog}) {
    return (
        <div className='container'>
            <Row className='px-3'>
                <Col md={18} className='p-3'><Main blog={blog} /></Col>
                <Col md={6} className='p-3'><About user={user} /></Col>
            </Row>
        </div>
    );
}

export default Home;