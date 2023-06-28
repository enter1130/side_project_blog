<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CommentController extends Controller
{
    public function index(Request $request){
        $comment=Comment::where('BlogID',$request->id)->get();
        return response()->json(['result'=>true,'comment' => $comment]);
    }

    public function store(Request $request){
        $comment=new Comment();
        $comment->comment=$request->comment;
        $comment->BlogID=$request->BlogID;
        if($request->CommentID!=='null'){
            $comment->CommentID=$request->CommentID;
        }
        $comment->date=Carbon::now();
        $query=$comment->save();
        if($query){
            return response()->json(['result'=>true,'alert'=>'留言成功']);
        }
        return response()->json(['result'=>false,'alert'=>'留言失敗，請聯繫管理員']);
    }

    public function like(Request $request){
        $comment=Comment::find($request->CommentID);
        $comment->like=$comment->like+1;
        $query=$comment->save();
        if($query){
            return response()->json(['result'=>true]);
        }
        return response()->json(['result'=>false]);
    }

    public function delete(Request $request){
        $comment=Comment::find($request->CommentID);
        $query=$comment->delete();
        if($query){
            return response()->json(['result'=>true]);
        }
        return response()->json(['result'=>false]);
    }
}
