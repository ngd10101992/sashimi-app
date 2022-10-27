export const getPermissionsVideo = () => {
  return new Promise<void>((resolve, reject) => {
    try {
      console.log(navigator.mediaDevices);

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