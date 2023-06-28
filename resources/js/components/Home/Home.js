import React, { useEffect, useState } from 'react';
import { FlexboxGrid, Panel, Placeholder } from 'rsuite';
import About from '../AboutMe/About';

function Loading(){
    return(
        <div>
            <Panel className='m-3' header="Panel title" bordered>
                <Placeholder.Paragraph rows={5} graph='image' />
            </Panel>
            <Panel className='m-3' header="Panel title" bordered>
                <Placeholder.Paragraph rows={5} graph='image' />
            </Panel>
            <Panel className='m-3' header="Panel title" bordered>
                <Placeholder.Paragraph rows={5} graph='image' />
            </Panel>
        </div>
    )
}

function Item({item}){
    return(
        <Panel className='m-3' header={item.title} bordered style={{cursor:'pointer'}} onClick={()=>window.location.href=`/blog/${item.id}`}>
            <FlexboxGrid justify='space-around'>
                <FlexboxGrid.Item colspan={5}>
                    <div><img src={item.cover} className='img-fluid rounded' /></div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={19}>{item.content}</FlexboxGrid.Item>
            </FlexboxGrid>
            <div className='text-end'>{item.date}</div>
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
            <FlexboxGrid className='px-3' justify='space-around'>
                <FlexboxGrid.Item colspan={18} className='p-3'><Main blog={blog} /></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6} className='p-3'><About user={user} /></FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
}

export default Home;