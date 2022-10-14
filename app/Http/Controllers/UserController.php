<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UploadFileRequest;
use App\Http\Requests\UserUpdateInfoRequest;
use App\Http\Requests\UserUpdatePasswordRequest;
use App\Models\User;
use App\Models\Contact;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use DB;
use Exception;
use Auth;
use Log;

class UserController extends Controller
{
    /**
     * Get list users
     *
     * @param  \Illuminate\Http\Request $request
    */
    public function index(Request $request)
    {
        try {
            $auth = Auth::user();
            $users = User::limit($request->limit)
                        ->offset($request->offset)
                        ->where('id', '!=', $auth->id);

            if (strlen($request->search)) {
                $users->where(function ($query) use ($request) {
                    $query->where('name', 'like', '%'.$request->search.'%')
                        ->orWhere('email', 'like', '%'.$request->search.'%');
                });
            }

            $users = $users->get();

            foreach ($users as $user) {
                $pending =  Contact::select('confirmed')
                                    ->where('user_id', $auth->id)
                                    ->where('target_id', $user->id)
                                    ->first();
                $confirm =  Contact::select('confirmed')
                                    ->where('target_id', $auth->id)
                                    ->where('user_id', $user->id)
                                    ->first();
                $isFriend = CONTACT_CODES['notRelation'];
                if ((!empty($pending) && $pending->confirmed) || (!empty($confirm) && $confirm->confirmed)) {
                    $isFriend = CONTACT_CODES['isFriend'];
                } elseif ((!empty($pending) && $pending->confirmed === 0)) {
                    $isFriend = CONTACT_CODES['pending'];
                } elseif ((!empty($confirm) && $confirm->confirmed === 0)) {
                    $isFriend = CONTACT_CODES['confirm'];
                }

                $user['isFriend'] = $isFriend;
            }

            return [
                'users' => $users,
                'contactCodes' => CONTACT_CODES
            ];
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', ['message' => trans('messages.update.fail')]);
        }
    }

    /**
     * Handle update avatar
     *
     * @param  \App\Http\Requests\Auth\UploadFileRequest $request
    */
    public function avatar(UploadFileRequest $request)
    {
        try {
            $request->validated();
            $user = Auth::user();
            $date = new \DateTime();
            $fileName = $date->getTimestamp() . '-' . $request->avatar->getClientOriginalName();
            $path = $request->avatar->storeAs('public', $fileName);

            Storage::delete('public/'.explode("/", $user->avatar)[1]);

            $user->avatar = 'storage/'.$fileName;
            $user->save();

            return redirect()->back()->with('success', ['message' => trans('messages.update.success')]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', ['message' => trans('messages.update.fail')]);
        }
    }

    /**
     * Handle update info
     *
     * @param  \App\Http\Requests\Auth\UserUpdateInfoRequest $request
    */
    public function info(UserUpdateInfoRequest $request)
    {
        try {
            $request->validated();
            $user = Auth::user();

            $user->name = $request->name;
            $user->save();

            return redirect()->back()->with('success', ['message' => trans('messages.update.success')]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', ['message' => trans('messages.update.fail')]);
        }
    }

    /**
     * Handle update password
     *
     * @param  \App\Http\Requests\Auth\UserUpdatePasswordRequest $request
    */
    public function password(UserUpdatePasswordRequest $request)
    {
        try {
            $request->validated();
            $user = Auth::user();

            if (!Hash::check($request->oldPassword, $user->password)) {
                return redirect()->back()->with('error', ['message' => trans('messages.update.fail')]);
            }

            $user->password = Hash::make($request->password);
            $user->save();

            return redirect()->back()->with('success', ['message' => trans('messages.update.success')]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', ['message' => trans('messages.update.fail')]);
        }
    }
}
