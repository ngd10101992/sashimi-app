<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\User;
use Auth;
use DB;
use Log;
use App\Events\AddFriendPusherEvent;
use App\Events\DemoEvent;

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
            event(new AddFriendPusherEvent($user, $targetUser->id));

            return redirect()->back()->with('success', [
                'message' => trans('messages.add.success'),
                'user' => $targetUser
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', ['message' => trans('messages.add.fail')]);
        }
    }

    /**
     * Handle refuse friend
     *
     * @param  \Illuminate\Http\Request $request
    */
    public function refuse(Request $request)
    {
        try {
            $user = Auth::user();
            $contact = Contact::where('id', $request->contact_id)->where('target_id', $user->id);
            if (!$contact->exists()) {
                return redirect()->back()->with('error', ['message' => trans('messages.remove.fail')]);
            }

            Contact::where('id', $request->contact_id)->delete();

            // $addList = Contact::select('user_id')
            //             ->where('target_id', $user->id)
            //             ->where('confirmed', 0)
            //             ->join('users', 'users.id', '=', 'contacts.user_id')
            //             ->select('users.*', 'contacts.id as contact_id')
            //             ->get();

            return redirect()->back()->with('success', [
                'message' => trans('messages.remove.success'),
                // 'addList' => $addList
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', ['message' => trans('messages.remove.fail')]);
        }
    }

    /**
     * Handle confirm friend
     *
     * @param  \Illuminate\Http\Request $request
    */
    public function confirm(Request $request)
    {
        try {
            $user = Auth::user();
            $contact = Contact::where('id', $request->contact_id)->where('target_id', $user->id);
            if (!$contact->exists()) {
                return redirect()->back()->with('error', ['message' => trans('messages.remove.fail')]);
            }

            Contact::where('id', $request->contact_id)->update(['confirmed' => 1]);

            return redirect()->back()->with('success', [
                'message' => trans('messages.confirm.success')
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', ['message' => trans('messages.confirm.fail')]);
        }
    }
}
