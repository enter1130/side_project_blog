<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TagController extends Controller
{
    protected $user;
    public function __construct(Request $request)
    {
        $this->user=Auth::user();
    }

    public function index(){
        if($this->user){
            $tag=Tag::tag();
            if($tag){
                return response()->json(['result'=>true,'tag'=>$tag]);
            }
        }
        return response()->json(['result'=>false]);
    }
}
