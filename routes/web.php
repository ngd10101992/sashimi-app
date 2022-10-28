<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ChatController;
use App\Models\Contact;
use App\Models\User;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/users', [UserController::class, 'index'])->name('users');
// User
Route::post('/avatar', [UserController::class, 'avatar'])->name('avatar');
Route::post('/info', [UserController::class, 'info'])->name('info');
Route::post('/password', [UserController::class, 'password'])->name('password');

//Contact
Route::post('/add-friend', [ContactController::class, 'add'])->name('add-friend');
Route::post('/add-friend-refuse', [ContactController::class, 'refuse'])->name('add-friend-refuse');
Route::post('/add-friend-confirm', [ContactController::class, 'confirm'])->name('add-friend-confirm');

Route::get('/room', [RoomController::class, 'index'])->middleware(['auth', 'verified'])->name('room');


Route::post('/get-messages', [ChatController::class, 'getMessages'])->name('get-messages');
Route::post('/send-message', [ChatController::class, 'sendMessage'])->name('send-message');
Route::post('/video/call-user', 'App\Http\Controllers\ChatController@callUser');
Route::post('/video/accept-call', 'App\Http\Controllers\ChatController@acceptCall');

require __DIR__.'/auth.php';
