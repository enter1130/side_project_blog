<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function avatar(Request $request){
        return $request->file('file')->path();
    }

    public function update(Request $request){
        dd($request->file('avatar'));
    }
}
