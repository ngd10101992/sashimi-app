<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\User;
use Auth;
use DB;

class ContactController extends Controller
{
    /**
     * Handle add friend
     *
     * @param  \Illuminate\Http\Request $request
    */
    public function add(Request $request)
    {
        try {
            $user = Auth::user();
            Contact::create([
                'user_id' => $user->id,
                'target_id' => $request->targetId
            ]);

            $targetUser = User::where('id', $request->targetId)->first();
            $targetUser['isFriend'] = CONTACT_CODES['pending'];

            return redirect()->back()->with('success', [
                'message' => trans('messages.add.success'),
                'user' => $targetUser
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', ['message' => trans('messages.add.fail')]);
        }
    }
}
