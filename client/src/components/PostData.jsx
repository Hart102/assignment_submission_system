import Axios from 'axios'

const PostData = (url, data) => {
  return (
    Axios.post(url, data)
  )
}

export default PostData
