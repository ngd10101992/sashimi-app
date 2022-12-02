declare var Pusher: any

export const getPermissionsVideo = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // create audio and video streams separately
      // const audioStream = await navigator.mediaDevices.getUserMedia({video: false, audio: true})
      // const videoStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
      // const combinedStream: any = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()])
      // resolve(combinedStream)
      navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then(function(stream: any) {
        resolve(stream)
      })
      .catch(err => {
        throw new Error(`Unable to fetch stream ${err}`)
      })
    } catch (error) {
      console.log(error)
    }
  })
};

// export const pusher = new Pusher('2d240a8e1585e1883a5e', {
export const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: 'ap3',
  authEndpoint: '/broadcasting/auth'
})