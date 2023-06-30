<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class BlogController extends Controller
{
    public function index(){
        $user=User::find(1);
        $blog=Blog::orderBy('date','desc')->get();
        foreach($blog as $item){
            $tag=$item->tag();
            $item['tag']=$tag;
        }
        
        if($user && $blog){
            return response()->json(['result'=>true,'user'=>$user,'blog'=>$blog]);
        }
        return response()->json(['result'=>false]);
    }

    public function user(Request $request){
        $user=Auth::user();
        if($user){
            $blog=Blog::orderBy('date','desc')->where('UserID',$user->id)->get();
            foreach($blog as $item){
                $tag=$item->tag();
                $item['tag']=$tag;
            }
            
            if($blog){
                return response()->json(['result'=>true,'blog'=>$blog]);
            }
        }
        
        return response()->json(['result'=>false]);
    }

    public function store(Request $request){
        $user=Auth::user();
        if($user){
            $blog=new Blog();
            $blog->title=$request->title;
            $blog->cover=$request->cover;
            $blog->show=(int)$request->show;
            $blog->show=(int)$request->show;
            $blog->content=(int)$request->content;

            dd((int)$request->show);
        }
        
        return response()->json(['result'=>false]);
    }
    public function show($id){
        $blog=Blog::find($id);
        if($blog){            
            $blog->look=$blog->look+1;
            $blog->save();
            $tag=$blog->tag();
            $blog->toArray();
            $blog['tag']=$tag;
            return response()->json(['result'=>true,'blog' => $blog]);
        }
        return response()->json(['result'=>false]);
    }

    public function like(Request $request){
        $blog=Blog::find($request->BlogID);
        $blog->like=$blog->like+1;
        $query=$blog->save();
        $tag=$blog->tag();
        $blog->toArray();
        $blog['tag']=$tag;
        if($query){
            return response()->json(['result'=>true,'blog' => $blog]);
        }
        return response()->json(['result'=>false]);
    }

    public function addTag(Request $request){
        $user=Auth::user();
        $blog=Blog::with('comment')->find($request->BlogID);
        if($blog && $user){
            $blog->tag=$blog->addTag($request->tag);
            $query=$blog->save();
            if($query){
                return response()->json(['result'=>true,'blog' => $blog]);
            }
        }
        return response()->json(['result'=>false]);
    }

    public function deleteTag(Request $request){
        $user=Auth::user();
        $blog=Blog::with('comment')->find($request->BlogID);
        if($blog && $user){
            $blog->tag=$blog->deleteTag($request->tag);
            $query=$blog->save();
            if($query){
                return response()->json(['result'=>true,'blog' => $blog]);
            }
        }
        return response()->json(['result'=>false]);
    }
}
