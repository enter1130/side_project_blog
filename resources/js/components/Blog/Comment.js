import CloseIcon from '@rsuite/icons/Close';
import TrashIcon from '@rsuite/icons/Trash';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcLike } from "react-icons/fc";
import { GoReply } from "react-icons/go";
import { Button, ButtonToolbar, Divider, Form, IconButton, Input, Panel } from 'rsuite';
import useSWR from 'swr';
import Cookies from 'universal-cookie';
function Item({comment,result,reply,bg}){
    function sendLike(data){
        fetch(`/api/comment.like`,{
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
    const onLike = () => {
        let data=new FormData();
        data.append('CommentID',comment.id);
        sendLike(data)
    }

    const cookie=new Cookies()
    function sendDelete(data){
        fetch(`/api/comment.delete`,{
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
    const onDelete = () => {
        let data=new FormData();
        data.append('CommentID',comment.id);
        sendDelete(data)
    }

    const onReply = () => {
        reply(comment.id)
    }
    return(
        <Panel bordered header={'留言'+comment.id} className='mt-3' style={{'backgroundColor':bg==comment.id?('rgba(255, 215, 236, 0.8)'):'white'}}>
            {comment.CommentID?(<div className='mb-3'>回覆給<span style={{fontWeight:'bold'}}>留言{comment.CommentID}</span>:</div>):null}
            <div style={{minHeight:'50px'}}>{comment.comment}</div>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                    <ButtonToolbar>
                        <IconButton size="xs" icon={<GoReply />} circle onClick={onReply} />
                        <IconButton size="xs" icon={<FcLike />} circle onClick={onLike} />
                    </ButtonToolbar>
                    <span className='ms-2'>{comment.like}</span>
                </div>
                <div className='d-flex align-items-center'>
                    <div className='text-end'>{comment.date} by 匿名</div>
                    {cookie.get('token')?(<ButtonToolbar>
                        <IconButton size="xs" icon={<TrashIcon />} circle onClick={onDelete} />
                    </ButtonToolbar>):null}
                </div>
            </div>
        </Panel>
    )
}

function Comment({id}) {
    const [data,setData]=useState(null);
    const fetcher = url => fetch(url).then(r => r.json()).then(r=>setData(r.comment));
    const { result, error } = useSWR(
        `/api/comment.get?id=${id}`,
        fetcher
    );

    function getComment(){
        fetch(`/api/comment.get?id=${id}`,{
            method:'GET',
        }).then(response=>{
            return response.json()
        }).then(res=>{
            setData(res.comment)
        })
    }

    function sendComment(data){
        fetch(`/api/comment.send`,{
            method:'POST',
            body:data,
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                document.getElementById('comment').value=''
                setReply(null)
                returnResult(res.result)
            }
        })
    }

    const [reply,setReply]=useState(null)
    const {handleSubmit}=useForm();
    const onSubmit = () => {
        let data=new FormData();
        data.append('comment',document.getElementById('comment').value);
        data.append('CommentID',reply);
        data.append('BlogID',id);
        sendComment(data)
    }

    const returnResult = (result) => {
        if(result){
            getComment()
        }
    }

    const returnReply = (result) => {
        if(reply==result){
            setReply(null)
        }else{
            setReply(result)
        }

    }

    return (
        <>
        <Divider />
        <Panel header="留言板">
            <div>
                {data ?(data.map((item)=>(<Item key={item.id} comment={item} bg={reply} result={returnResult} reply={returnReply} />))):null}
            </div>
            <Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.ControlLabel>{reply?(<>回覆給留言<span style={{fontWeight:'bold'}}>{reply}</span><IconButton className='ms-2' size="xs" icon={<CloseIcon />} circle onClick={()=>setReply(null)} /></>):null}</Form.ControlLabel>
                    <Input as="textarea" rows={3} id='comment' />
                    <Button appearance="primary" className='mt-3' type='submit' block>留言</Button>
                </Form.Group>
            </Form>
        </Panel>
        </>
    );
}

export default Comment;