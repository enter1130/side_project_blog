<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',[HomeController::class,'view'])->name('home');
Route::get('/about',[HomeController::class,'view'])->name('about');
Route::get('/blog/{id?}',[HomeController::class,'view'])->name('blog');
Route::get('/admin',[HomeController::class,'view'])->name('admin');