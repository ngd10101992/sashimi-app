<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;
use App\Models\User;

use Exception;
use Auth;
use Log;

class RoomController extends Controller
{
    /**
     * Get list friends
     *
     * @param  \Illuminate\Http\Request $request
    */
    public function index(Request $request)
    {
        try {
            $user = Auth::user();

            $addList = Contact::select('user_id')
                                ->where('target_id', $user->id)
                                ->where('confirmed', FLG_OFF)
                                ->join('users', 'users.id', '=', 'contacts.user_id')
                                ->select('users.*', 'contacts.id as contact_id')
                                ->get();
            $friends = Contact::where('confirmed', FLG_ON)
                                ->where(function ($query) use ($user) {
                                    $query->where('user_id', $user->id)->orWhere('target_id', $user->id);
                                })
                                ->join('users', function ($join) use ($user) {
                                    $join->on(function ($on) {
                                        $on->on('users.id', '=', 'contacts.user_id')
                                            ->orOn('users.id', '=', 'contacts.target_id');
                                    })
                                    ->where('users.id', '!=', $user->id);
                                })
                                ->select('users.*')
                                ->get();

            return Inertia::render('Room', [
                'addList' => $addList,
                'friends' => $friends
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
    }
}
