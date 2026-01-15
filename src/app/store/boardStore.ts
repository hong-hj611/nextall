// 게시판 전역 상태 공통 저장소(실시간 관리)
import { create } from "zustand";
import { createPostApi, fetchPostApi, updatePostApi, deletePostApi, type Post, type CreatePostApi, type UpdatePostApi } from "../lib/postsApi";

// 게시판 공유 설정 : 게시판 내용들(Post), loading(상태), CreatePostApi - fetchPostApi - UpdatePostApi 훅 공유, 
type BoardState = {
  posts: Post[]
  loading: boolean
  error : string | null
  fetchPost: () => Promise<void>
  createPost: (input: CreatePostApi) => Promise<void>
  updatePost: (input: UpdatePostApi) => Promise<void>
  deletePost: (id: string) => Promise<void>
  clearError: () => void
}

// set: 상태 변경시 사용, get: 현재 상태 조회 사용
export const useBoardStore = create<BoardState>( (set, get) => ({
  posts: [],
  loading: false,
  error: null,
  fetchPost: async () => {
    set({loading: true, error: null})
    try {
      const posts = await fetchPostApi() // 불러오기
      set({posts: posts})
    }catch (e) {
      set({error : '게시글 불러오기 실패'})
    }finally {
      set({loading: false})
    }
  },
  createPost: async (input) => {
    set({loading: true, error: null})
    try {
      await createPostApi(input)
      const posts = await fetchPostApi() // 작성 후 갱신
      set({posts: posts})
    }catch (e) {
      set({error: '게시글 작성 실패'})
    }finally {
      set({loading: false})
    }
  },
  updatePost: async (input) => {
    set({loading: true, error: null})
    try {
      await updatePostApi(input)
      const posts = await fetchPostApi() // 수정 후 갱신
      set({posts: posts})
    }catch (e) {
      set({error: '게시글 수정 실패'})
    }finally {
      set({loading: false})
    }
  },
   deletePost: async (id) => {
    try {
      await deletePostApi(id)
      const posts = await fetchPostApi() // 삭제 후 갱신
      set({posts: posts})
    }catch (e) {
      set({error: '게시글 삭제 실패'})
    }finally {
      set({loading: false})
    }
  },
  clearError: () => {set({error: null})},
}))
  
