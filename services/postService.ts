import api from './api'

const postService = {
  getPostPaging: async ({ pagesize = 3, currPage = 1 } = {}) => {
    const url = `/post/getListPagination.php?pagesize=${pagesize}&currPage=${currPage}`

    return api.callJson(url)
  },
  getPostPagingByCategory: async ({ pagesize = 10, currPage = 1, tagIndex = '' } = {}) => {
    if (!tagIndex) return null
    const url = `/post/getListByCategory.php?pagesize=${pagesize}&currPage=${currPage}&tagIndex=${tagIndex}`

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
  },
  getPostsSearch: async ({ query }) => {
    return api.callJson(`/post/search.php?query=${encodeURI(query)}`)
  },
  getCategories: async () => {
    return api.callJson('/categories/index.php')
  }
}

export default postService