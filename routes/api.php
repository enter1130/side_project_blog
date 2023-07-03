<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DataController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\UserController;
use App\Models\Blog;
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

Route::post('/user.avatar.preview', [UserController::class,'avatar']);
Route::post('/user.update', [UserController::class,'update']);

Route::get('/tag.get', [TagController::class,'index']);

Route::get('/blog.get', [BlogController::class,'index']);
Route::post('/blog.create', [BlogController::class,'store']);
Route::post('/blog.update', [BlogController::class,'update']);
Route::get('/blog.user.get', [BlogController::class,'user']);
Route::get('/blog.user.get/{id}', [BlogController::class,'blog']);


Route::get('/blog.get/{id}', [BlogController::class,'show']);
Route::post('/blog.like', [BlogController::class,'like']);

//暫時移除，這個功能是在瀏覽文章的頁面可以直接新增/刪除標籤的功能，因為需要在新增文章的功能已經有類似的功能，故此先暫時移除
// Route::post('/blog.tag.add', [BlogController::class,'addTag']);
// Route::post('/blog.tag.delete', [BlogController::class,'deleteTag']);

Route::get('/comment.get', [CommentController::class,'index']);
Route::post('/comment.send', [CommentController::class,'store']);
Route::post('/comment.like', [CommentController::class,'like']);
Route::post('/comment.delete', [CommentController::class,'delete']);
