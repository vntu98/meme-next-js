import api from './api'

const postService = {
  getPostPaging: async ({ pagesize = 3, currPage = 1 } = {}) => {
    const url = `/post/getListPagination.php?pagesize=${pagesize}&currPage=${currPage}`

    return api.callJson(url)
  },
  getPostByUserId: async ({ userId, token }) => {
    const url = `/post/getListPostUserID.php?userid=${userId}`

    if (!userId || !token) {
      return {
        status: 200,
        posts: []
      }
    }

    return api.callJson(url, {
      token
    })
  }
}

export default postService