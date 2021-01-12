import api from './api'

type ObjImage = {
  file: File | null,
  base64: string
}

type TypePostCreate = {
  post_content: string,
  category: string[],
  url_image: string,
  obj_image: ObjImage
}

const postService = {
  createNewPost: async({ post_content, url_image, category, obj_image }: TypePostCreate, token: string) => {
    const url = '/post/addNew.php'
    const data = new FormData()
    data.append('post_content', post_content)
    data.append('category', category.toString())
    data.append('url_image', url_image)
    if (obj_image.file) {
      data.append('obj_image', obj_image.file)
    }

    return api.callFormData(url, {data, token})
  },
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