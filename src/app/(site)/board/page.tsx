'use client'
import React, { useEffect, useState } from 'react'
import { useBoardStore } from '@/app/store/boardStore'
import { auth } from '@/app/lib/firebaseClient'
import styles from './page.module.scss'

const page = () => {
  const user = auth.currentUser;   // 현재 로그인 된 사람
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // posts: 글목록 전체, fetchPost: 목록 가져오기 함수, createPost: 글쓰기 함수
  const { posts, fetchPost, createPost, updatePost, deletePost } = useBoardStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const selectedPosts = editingId ? posts.filter(item=> item.id === editingId) : posts;

  useEffect(() => {
    fetchPost();

  },[fetchPost]);
  // fetchPost가 실시간 조회로 변환이 일어날때마다 실행


  const onWrite = async () => {
    if (!user) return;

    try {
      await createPost({
        title: title,
        content: content,
        authorUid: user.uid,
        authorEmail: user.email || '익명',
      })

      setTitle('')
      setContent('')

    }catch (e) {
      console.error("Error", e)
    }
  }

  // 수정버튼(준비상태)
  const startEdit = (item: any) => {
    setEditingId(item.id) // 수정이 시작됨을 알림
    setEditTitle(item.title)
    setEditContent(item.content)
  }

  // 내용수정 후 저장버튼
  const saveEdit = async () => {
    if (!editingId) return
    try {
      await updatePost({
        id: editingId,
        title: editTitle,
        content: editContent,
      })
      
      setEditTitle('')
      setEditContent('')
      setEditingId(null)

    }catch (e) {
      console.error("Error", e)
    }
  }

  // 수정 화면에서 취소버튼 (나오면서 원래값 초기세팅)
  const cancleEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditContent('')
  }

  // 삭제버튼
  const remove = async (id: string) => {
    await deletePost(id)
  }

  return (
    <main className={styles.boardWrap}>
      <h1>게시판</h1>
      { // 로그인 되어 있고, 수정 상태(화면)가 아닌 경우
        user && !editingId && (
          <div className={styles.inputBox}>
            <input placeholder='제목' 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
            <textarea placeholder='내용'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={onWrite}>글쓰기</button>
          </div>
        )
      }

      <ul>
        {
          selectedPosts.map((item) => (
            <li key={item.id}>
              {/* 수정이면 ? 취소, 저장 버튼 : 수정, 삭제 버튼 나타나도록 */}
              {
                editingId === item.id ? 
                (
                  <>
                    <input
                      value={editTitle} 
                      onChange={(e) => setEditTitle(e.target.value)} 
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button onClick={cancleEdit}>취소</button>
                    <button onClick={saveEdit}>저장</button>
                  </>
                ) 
                : 
                (
                  <>
                  <strong>제목 : {item.title}</strong>
                  <p>내용 : {item.content}</p>
                  <small>작성자 :{item.authorEmail}</small>
                  <p><small>날짜 :{new Date(item.createAtms).toLocaleString()}</small></p>
                  {
                    user?.uid === item.authorUid && (
                      <div>
                        <button onClick={() => startEdit(item)}>수정</button>
                        <button onClick={() => remove(item.id)}>삭제</button>
                      </div>
                    )
                  }
                  
                </>
                )
              }
            </li>
          ))
        }
      </ul>
    </main>
  )
}

export default page