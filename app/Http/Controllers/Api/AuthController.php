<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function login(Request $request){
        $token=Auth::attempt($request->only('email', 'password'));
        if($token){
            return response()->json(['result'=>true,'authorisation' => ['token' => $token,'type' => 'bearer']]);
        }
        return response()->json(['result'=>false]);
    }

    public function logout(Request $request){
        $user=Auth::user();
        if($user){
            return response()->json(['result'=>true,'user' => $user])->withCookie(Cookie::forget('token'));
        }
        return response()->json(['result'=>false]);
    }

    public function auth(Request $request){
        $user=Auth::user();
        if($user){
            return response()->json(['result'=>true,'user' => $user]);
        }
        return response()->json(['result'=>false]);
    }
}
