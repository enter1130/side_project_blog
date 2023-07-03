<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class BlogController extends Controller
{
    public function index(){
        $user=User::find(1);
        $blog=Blog::orderBy('date','desc')->where('show',1)->get();
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

    public function blog($id){
        $user=Auth::user();
        if($user){
            $blog=Blog::find($id);
            $tag=$blog->tag();
            $blog['tag']=$tag;
            $permission=Auth::user() && Auth::user()->id==$blog->UserID ?true:false;
            if($blog && $permission){
                return response()->json(['result'=>true,'blog'=>$blog]);
            }
        }
        
        return response()->json(['result'=>false]);
    }

    public function show($id){
        $blog=Blog::where('id',$id)->where('show',1)->first();
        if($blog){
            if(Auth::user() && Auth::user()->id!==$blog->UserID){
                $blog->look=$blog->look+1;
                $blog->save();
            }
            $tag=$blog->tag();
            $blog->toArray();
            $blog['tag']=$tag;
            $permission=Auth::user() && Auth::user()->id==$blog->UserID ?true:false;
            return response()->json(['result'=>true,'blog' => $blog,'permission'=>$permission]);
        }
        return response()->json(['result'=>false]);
    }

    public function store(Request $request){
        $user=Auth::user();
        if($user){
            $blog=new Blog();
            $blog->title=$request->title;
            $blog->date=$request->date;
            $blog->content=$request->content;
            $blog->UserID=Auth::user()->id;
            $blog->cover=$blog->addCover($request);
            $blog->tag=$blog->addTag($request->tag);
            $blog->show=(int)filter_var($request->show, FILTER_VALIDATE_BOOLEAN);
            $query=$blog->save();
            if($query){
                return response()->json(['result'=>true,'blog'=>$blog]);
            }
        }
        
        return response()->json(['result'=>false]);
    }

    public function update(Request $request){
        $user=Auth::user();
        $blog=Blog::find($request->id);
        $permission=Auth::user() && Auth::user()->id==$blog->UserID ?true:false;
        if($user && $blog && $permission){
            $blog->title=$request->title;
            $blog->date=$request->date;
            $blog->content=$request->content;
            $blog->cover=$blog->addCover($request);
            $blog->tag=$blog->updateTag($request->tag);
            $blog->show=(int)filter_var($request->show, FILTER_VALIDATE_BOOLEAN);
            $query=$blog->save();
            if($query){
                return response()->json(['result'=>true,'blog'=>$blog]);
            }
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

    //暫時移除，這個功能是在瀏覽文章的頁面可以直接新增標籤的功能，因為需要在新增文章的功能已經有類似的功能，故此先暫時移除
    // public function addTag(Request $request){
    //     $user=Auth::user();
    //     $blog=Blog::with('comment')->find($request->BlogID);
    //     if($blog && $user){
    //         $blog->tag=$blog->addTag($request->tag);
    //         $query=$blog->save();
    //         if($query){
    //             return response()->json(['result'=>true,'blog' => $blog]);
    //         }
    //     }
    //     return response()->json(['result'=>false]);
    // }
    //暫時移除，這個功能是在瀏覽文章的頁面可以直接刪除標籤的功能
    // public function deleteTag(Request $request){
    //     $user=Auth::user();
    //     $blog=Blog::with('comment')->find($request->BlogID);
    //     if($blog && $user){
    //         $blog->tag=$blog->deleteTag($request->tag);
    //         $query=$blog->save();
    //         if($query){
    //             return response()->json(['result'=>true,'blog' => $blog]);
    //         }
    //     }
    //     return response()->json(['result'=>false]);
    // }
}
