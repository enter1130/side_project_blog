<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index(Request $request){
        $comment=Comment::where('BlogID',$request->id)->with('blog','user')->get();
        foreach($comment as $item){
            $item['permission']=Auth::user() && Auth::user()->id==$item->UserID ?true:false;
        }
        $permission=Auth::user() && Auth::user()->id==Blog::find($request->id)->UserID ?true:false;
        return response()->json(['result'=>true,'comment' => $comment,'permission'=>$permission]);
    }

    public function store(Request $request){
        $comment=new Comment();
        $comment->comment=$request->comment;
        $comment->BlogID=$request->BlogID;
        if($request->CommentID!=='null'){
            $comment->CommentID=$request->CommentID;
        }
        if(Auth::user()){
            $comment->UserID=Auth::user()->id;
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
        if($comment){
            $comment->like=$comment->like+1;
            $query=$comment->save();
            if($query){
                return response()->json(['result'=>true]);
            }
        }
        return response()->json(['result'=>false]);
    }

    public function delete(Request $request){
        $user=Auth::user();
        $comment=Comment::with('blog')->find($request->CommentID);
        $permission=Auth::user() && Auth::user()->id==$comment->blog->UserID ?true:false;
        if($comment && $user && $permission){
            $query=$comment->delete();
            if($query){
                return response()->json(['result'=>true]);
            }
        }
        return response()->json(['result'=>false]);
    }
}
