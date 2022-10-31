import { useEffect, useRef, useState } from 'react'
import { UserType } from '../common/type'
import { getPermissionsVideo, pusher } from '../common/helpers'

let channelChatVideo = pusher.subscribe('presence-chat-video.1000')
let caller: any = new window.RTCPeerConnection()
let room: any = null
let localUserMedia: any = null

export default function VideoCall({user, targetUser, videoCall, setVideoCall}: {user: UserType, targetUser: UserType | null, videoCall: boolean, setVideoCall: React.Dispatch<React.SetStateAction<boolean>>}) {
  const myVideoRef = useRef<HTMLVideoElement | null>(null)
  const callerVideoRef = useRef<HTMLVideoElement | null>(null)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [showClose, setShowClose] = useState<boolean>(false)
  const [triggerCaller, setTriggerCaller] = useState<boolean>(false)
  const [msg, setMsg] = useState<any>(null)
  const [videoAnser, setVideoAnser] = useState<boolean>(false)

  useEffect(() => {
    channelChatVideo.bind('ChatVideoPusherEvent', function(data: any) {
      // console.log(data)
    }).bind("pusher:subscription_succeeded", (member: any) => {
      // console.log(member)
    }).bind("pusher:member_added", (member: any) => {
      // console.log(member)
    }).bind("pusher:member_removed", (member: any) => {
      // console.log(member)
    }).bind("client-sdp", function(msg: any) {
      if(msg.room == user.id) {
        setMsg(msg)
        setShowConfirm(true)
      }
    }).bind("client-candidate", function(data: any) {
      if(data.room==room) caller.addIceCandidate(new RTCIceCandidate(data.candidate))
    }).bind("client-answer", function(answer: any) {
      if(answer.room == room) caller.setRemoteDescription(new RTCSessionDescription(answer.sdp))
    }).bind("client-endcall", function(answer: any) {
      setVideoCall(false)
      setVideoAnser(false)
      setShowConfirm(false)
      setShowClose(true)
      if(answer.room==room) {
        endCall()
      }
    }).bind("client-reject", function(answer: any) {
      if (answer.room == room) {
        endCall()
        setShowClose(true)
        setVideoCall(false)
      }
    })

    caller.onicecandidate = function(evt: any) {
      if (evt.candidate) {
        channelChatVideo.trigger("client-candidate", {
          candidate: evt.candidate,
          room: room
        })
      }
    }
    caller.onaddstream = function(evt: any) {
      callerVideoRef.current!.srcObject = evt.stream
    }
  }, [triggerCaller])

  useEffect(() => {
    if (videoCall && targetUser) {
      getPermissionsVideo()
      .then(function(stream: any) {
        myVideoRef.current!.srcObject = stream
        localUserMedia = stream
        caller.addStream(stream)
        caller.createOffer().then(function(desc:any) {
          caller.setLocalDescription(new RTCSessionDescription(desc))
          channelChatVideo.trigger("client-sdp", {
            sdp: desc,
            room: targetUser.id,
            from: user.id
          })
          room = targetUser.id
        })
      })
      .catch(err => {
        throw new Error(`Unable to fetch stream ${err}`)
      })
    }
  }, [videoCall, targetUser])

  function endCall() {
    for (let track of localUserMedia.getTracks()) { track.stop() }
    setMsg(null)
    setTriggerCaller(prev => !prev)
    caller.close()
    room = null
    localUserMedia = null
    channelChatVideo = pusher.subscribe('presence-chat-video.1000')
    caller = new window.RTCPeerConnection()
  }

  function stopVideoCall() {
    channelChatVideo.trigger("client-endcall", {
      "room": room
    })
    endCall()
    setVideoCall(false)
    setVideoAnser(false)
  }

  function handleAcceptVideoCall() {
    if (msg) {
      room = msg.room
      setVideoAnser(true)
      setShowConfirm(false)
      getPermissionsVideo()
      .then((stream: any) => {
        localUserMedia = stream
        myVideoRef.current!.style.backgroundColor = 'red'
        myVideoRef.current!.srcObject = stream
        caller.addStream(stream)
        var sessionDesc = new RTCSessionDescription(msg.sdp)
        caller.setRemoteDescription(sessionDesc)
        caller.createAnswer().then(function(sdp: any) {
          caller.setLocalDescription(new RTCSessionDescription(sdp))
          channelChatVideo.trigger("client-answer", {
            "sdp": sdp,
            "room": room
          })
        })
      })
      .catch((error: any) => {
          console.log('an error occured', error)
      })
    }
  }

  function handleDeclineVideoCall() {
    channelChatVideo.trigger("client-reject", { room: msg.room, rejected: user.id })
    room = null
    setShowConfirm(false)
  }

  function handleClose() {
    setShowClose(false)
  }

  return (
    <>
      {(videoCall || videoAnser) &&
        <div className="fixed z-50 top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/4 h-3/4 rounded-lg overflow-hidden group">
          <video className="rounded absolute bottom-2 left-2" width={200} height={200} ref={myVideoRef} autoPlay={true}></video>
          <video className="w-full h-full bg-black" ref={callerVideoRef} autoPlay={true}></video>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-700 ease-in-out">
            <button onClick={stopVideoCall} className="w-16 h-16 p-4 bg-red-600 rounded-full text-white cursor-pointer">Stop</button>
          </div>
        </div>
      }
      {showConfirm &&
        <div className="w-96 fixed z-50 top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/4 rounded-lg overflow-hidden bg-black p-5 text-center">
          <button onClick={handleAcceptVideoCall} className="w-16 h-16 bg-green-600 rounded-full text-white cursor-pointer text-xs m-5">Accept</button>
          <button onClick={handleDeclineVideoCall} className="w-16 h-16 bg-red-600 rounded-full text-white cursor-pointer text-xs m-5">Decline</button>
        </div>
      }
      {showClose &&
        <div className="w-96 fixed z-50 top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/4 rounded-lg overflow-hidden bg-black p-5 text-center">
          <button onClick={handleClose} className="w-16 h-16 bg-red-600 rounded-full text-white cursor-pointer text-xs m-5">Close</button>
        </div>
      }
    </>
  )
}
