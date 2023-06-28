<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function show($id){
        $blog=Blog::with('comment')->find($id);
        if($blog){
            $blog->look=$blog->look+1;
            $blog->save();
            return response()->json(['result'=>true,'blog' => $blog]);
        }
        return response()->json(['result'=>false]);
    }

    public function like(Request $request){
        $blog=Blog::with('comment')->find($request->BlogID);
        $blog->like=$blog->like+1;
        $query=$blog->save();
        if($query){
            return response()->json(['result'=>true,'blog' => $blog]);
        }
        return response()->json(['result'=>false]);
    }
}
