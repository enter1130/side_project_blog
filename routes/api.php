<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class,'login']);
Route::get('/logout', [AuthController::class,'logout']);
Route::get('/auth', [AuthController::class,'auth']);
Route::get('/data.get', [DataController::class,'index']);
Route::get('/blog.get/{id}', [BlogController::class,'show']);
Route::post('/blog.like', [BlogController::class,'like']);

Route::get('/comment.get', [CommentController::class,'index']);
Route::post('/comment.send', [CommentController::class,'store']);
Route::post('/comment.like', [CommentController::class,'like']);
Route::post('/comment.delete', [CommentController::class,'delete']);