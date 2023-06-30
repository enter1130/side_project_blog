<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function avatar(Request $request){
        return $request->file('file')->path();
    }

    public function update(Request $request){
        $user=Auth::user();
        if($user){
            $user=User::find($user->id);
            $user->username=$request->username;
            $user->email=$request->email;
            $user->avatar=$this->upload($request,$user);
            $query=$user->save();
            if($query){
                return response()->json(['result'=>true]);
            }
        }
        return response()->json(['result'=>false]);
    }

    public function upload(Request $request,$user){
        if($request->file('avatar')){
            $path=$request->file('avatar')->storeAs('avatar',$request->file('avatar')->getClientOriginalName(),'public');
            if($path){
                Storage::disk('local')->delete(str_replace('/storage/','/public/',$user->avatar));
                return '/storage/'.$path;
            }
        }

        return $user->avatar;
    }
}
