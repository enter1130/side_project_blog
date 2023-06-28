<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function index(){
        $user=User::find(1);
        $blog=Blog::all();
        if($user && $blog){
            return response()->json(['result'=>true,'user'=>$user,'blog'=>$blog]);
        }
        return response()->json(['result'=>false]);
    }
}
