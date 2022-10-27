<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Events\StartVideoChat;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Message;
use App\Events\ChatMessagePusherEvent;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        try {
            $user = Auth::user();
            $targetUser = User::where('id', $request->targetId);
            if (!$targetUser->exists()) {
                return redirect()->back()->with('success', ['message' => trans('messages.send.success')]);
            }

            Message::insert([
                'user_id' => $user->id,
                'target_id' => $request->targetId,
                'content' => $request->message
            ]);

            event(new ChatMessagePusherEvent($user, $request->targetId, $request->message));

            return redirect()->back()->with('success', ['message' => $request->message]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', ['message' => trans('messages.send.fail')]);
        }
    }

    public function callUser(Request $request)
    {
        $data['userToCall'] = $request->user_to_call;
        $data['signalData'] = $request->signal_data;
        $data['from'] = Auth::id();
        $data['type'] = 'incomingCall';

        broadcast(new StartVideoChat($data))->toOthers();
    }

    public function acceptCall(Request $request)
    {
        $data['signal'] = $request->signal;
        $data['to'] = $request->to;
        $data['type'] = 'callAccepted';
        broadcast(new StartVideoChat($data))->toOthers();
    }
}
