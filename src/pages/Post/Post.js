import { useState, forwardRef } from 'react'
import { useHistory } from 'react-router-dom'
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  increment,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import LinearProgress from '@mui/material/LinearProgress'

import Layout from 'components/shared/Layout'
import MediaPreview from 'components/MediaPreview'

import { db, auth, storage } from 'firebaseConfig'

import { MediaStep, CaptionStep } from './styled'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Post = () => {
  const history = useHistory()
  const [isMediaPreviewed, setIsMediaPreviewed] = useState(false)
  const [file, setFile] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)

  const handleFileChange = ({ target: { files } }) => {
    const file = files[0]
    setFile(file)
    setFileUrl(URL.createObjectURL(file))
    setIsMediaPreviewed(true)
  }

  const handleCaptionChange = ({ target: { value } }) => setCaption(value)

  const handleSubmit = (e) => {
    e.preventDefault()

    setShowProgress(true)
    const mediaRef = ref(storage, `media/${file.name}`)
    const uploadTask = uploadBytesResumable(mediaRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      (error) => {
        console.log('error: ', error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            const { displayName: username } = auth.currentUser

            const newPost = {
              timestamp: serverTimestamp(),
              caption,
              fileUrl: downloadURL,
              username,
              likeCount: 0,
              commentCount: 0,
              likes: [],
              // comments: [],
            }

            addDoc(collection(db, 'posts'), newPost).then(({ id }) => {
              const userRef = doc(db, 'users', auth.currentUser.displayName)

              updateDoc(userRef, {
                posts: arrayUnion(id),
                postCount: increment(1),
              })
            })
          })
          .catch((error) => {
            console.log('error: ', error)
          })
          .finally(() => {
            history.push('/')
          })
      }
    )
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <MediaStep>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            onClose={() => setOpenSnackbar(false)}
            autoHideDuration={6000}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity="error">
              This is an error message!
            </Alert>
          </Snackbar>

          {fileUrl && <MediaPreview fileUrl={fileUrl} fileName={file.name} />}
        </MediaStep>

        <CaptionStep style={{ opacity: isMediaPreviewed ? '1' : '0' }}>
          <textarea
            rows="10"
            cols="60"
            placeholder="Add a caption..."
            wrap="hard"
            onChange={handleCaptionChange}
          />

          <Button type="submit">Submit</Button>
        </CaptionStep>

        {showProgress && <LinearProgress variant="determinate" value={progress} />}
      </form>
    </Layout>
  )
}

export default Post
