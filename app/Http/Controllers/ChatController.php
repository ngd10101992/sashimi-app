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
    public function getMessages(Request $request)
    {
        try {
            $auth = Auth::user();
            $messages = Message::where(function ($query) use ($auth, $request) {
                $query->where('user_id', '=', $auth->id)->where('target_id', '=', $request->targetId);
            })
            ->orWhere(function ($query) use ($auth, $request) {
                $query->where('target_id', '=', $auth->id)->where('user_id', '=', $request->targetId);
            })
            ->join('users', 'users.id', '=', 'messages.user_id')
            ->select('users.*', 'messages.content', 'messages.created_at as content_created_at')
            ->orderBy('messages.created_at', 'desc')
            ->get();

            return $messages;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', ['message' => trans('messages.get.fail')]);
        }
    }

    public function sendMessage(Request $request)
    {
        try {
            $user = Auth::user();
            $targetUser = User::where('id', $request->targetId);
            if (!$targetUser->exists()) {
                return redirect()->back()->with('success', ['message' => trans('messages.send.success')]);
            }

            Message::create([
                'user_id' => $user->id,
                'target_id' => $request->targetId,
                'content' => $request->message,
                // 'created_at' => date('Y-m-d H:s:i'),
                // 'updated_at' => date('Y-m-d H:s:i')
            ]);

            $user['content'] = $request->message;

            event(new ChatMessagePusherEvent($user, $request->targetId, $request->message));

            return redirect()->back()->with('success', ['userSend' => $user]);
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
