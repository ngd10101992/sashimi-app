<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
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


Route::get('/room', function () {
    $user = Auth::user();

    $addList = Contact::select('user_id')
                        ->where('target_id', $user->id)
                        ->where('confirmed', 0)
                        ->join('users', 'users.id', '=', 'contacts.user_id')
                        ->select('users.*', 'contacts.id as contact_id')
                        ->get();

    return Inertia::render('Room', ['addList' => $addList]);
})->middleware(['auth', 'verified'])->name('room');

require __DIR__.'/auth.php';
