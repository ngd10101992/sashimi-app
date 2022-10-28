<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessagePusherEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userSend;
    public $targetId;
    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($userSend, $targetId, $message)
    {
        $this->userSend = $userSend;
        $this->targetId = $targetId;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('user.'.$this->targetId);
    }

    /**
     * Set channel name.
     *
     * @return App\Events\ChatMessagePusherEvent|string
     */
    public function broadcastAs()
    {
        return 'ChatMessagePusherEvent';
    }

    public function broadcastWith()
    {
        $data = $this->userSend;
        $data['content'] = $this->message;

        return [
            'userSend' => $data
        ];
    }
}
