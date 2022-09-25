<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadFileRequest;
use Illuminate\Support\Facades\Storage;
use Exception;
use Auth;
use Log;

class UserController extends Controller
{
     /**
     * Handle update avatar
     *
     * @param  \App\Http\Requests\Auth\UploadFileRequest  $request
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
}
