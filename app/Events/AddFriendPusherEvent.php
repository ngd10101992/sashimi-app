<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AddFriendPusherEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userAdd;
    public $targetId;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($userAdd, $targetId)
    {
        $this->userAdd = $userAdd;
        $this->targetId = $targetId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        // return new Channel('channel-add-friend');
        return new PrivateChannel('user.'.$this->targetId);
    }

    /**
     * Set channel name.
     *
     * @return App\Events\AddFriendPusherEvent|string
     */
    public function broadcastAs()
    {
        return 'AddFriendPusherEvent';
    }

    public function broadcastWith()
    {
        return [
            'userAdd' => $this->userAdd
        ];
    }

    // public function broadcastWhen()
    // {
    //     return $this->info->id = 1;
    // }
}
