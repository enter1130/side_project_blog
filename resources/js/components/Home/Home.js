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
                <Col xs={24} sm={24} md={8}>
                    <div className='text-center'>
                        <img src={item.cover} className='img-fluid rounded' />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={16} className='home my-1'>
                    <div className=' over-line' style={{minHeight:'150px'}}><div dangerouslySetInnerHTML={{__html: item.content}} /></div>
                </Col>
                <Col xs={24} sm={24} md={24}>
                    <div className='d-flex align-items-end flex-column'>
                        <div className='d-flex align-items-center'>
                        {item?(<TagGroup>
                            {item.tag.map((element,i)=>(
                                i<=2?(<Tag style={{color:element.color,border:'1px solid',borderColor:element.color,backgroundColor:'#fff'}} key={element.id}>{element.name}</Tag>):null
                            ))}
                            {item.tag.lenght>3?(<Tag style={{color:'red',border:'1px solid',borderColor:'red',backgroundColor:'#fff'}} >{'更多⋯⋯'}</Tag>):null}
                        </TagGroup>):null}
                        </div>
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

function Home() {
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
        <div className='container'>
            <Row className='px-3'>
                <Col lg={18} className='p-3'><Main blog={data.blog} /></Col>
                <Col xsHidden smHidden mdHidden lg={6} className='p-3'><About user={data.user} /></Col>
            </Row>
        </div>
    );
}

export default Home;