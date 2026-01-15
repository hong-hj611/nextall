// fireStore의 게시판 데이터 호출을 담당하는 파일
import { db } from "./firebaseClient";
import { addDoc, getDocs, collection, orderBy, query, serverTimestamp } from "firebase/firestore";
/* 
  addDoc() : 문서추가
  getDocs() : 목록 가져오기
  collection() : 폴더 지정
  orderBy() : 정렬
  query() : 조건
  serverTimestamp() : firebase 서버 시간
*/
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
/* updateDoc() : 수정 
   deleteDoc() : 삭제 */

// 아이디, 글제목, 글내용, 작성자id, 작성자email, 날짜(실시간 자동)
// 게시글 조회를 위한 타입
export type Post = {
  id: string
  title: string
  content: string
  authorUid: string
  authorEmail: string
  createAtms: number
  // 계산 쉽게하기 위해 ms로
}

// 게시글 추가를 위한 타입
export type CreatePostApi = {
  title: string
  content: string
  authorUid: string
  authorEmail: string
}

// 수정을 위한 타입
export type UpdatePostApi = {
  id: string,
  title: string,
  content: string,
}

// 글 목록 가져오기 (최신순)
export const fetchPostApi = async (): Promise<Post[]> => {
  const collectionRef = collection(db, 'posts')  
  // 1. db 연결해서 firebase에서 'posts'컬렉션(폴더)을 가리킨다

  const queryData = query(collectionRef, orderBy('createAt', 'desc'))
  // 2. posts 컬렉션(폴더)에서 createAtms 기준으로 최신순 정렬하도록 조건 만들어 queryData에 넣음

  const board = await getDocs(queryData)
  // 3. 2번에서 정렬되어 만들어 놓은 것을 getDocs로 가져와 board에 넣음 (await 반드시)

  // map을 사용하는 이유 : 받아진 값을 정리해서 필요한 부분과 리턴하기 위해
  return board.docs.map( (item) => {
    const data = item.data()

    return {
      id: item.id,
      title: data.title ?? "", // 값이 없을 수 있으므로 
      content: data.content ?? "",
      authorUid: data.authorUid ?? "",
      authorEmail: data.authorEmail ?? "",
      createAtms: data.createAt?.toMillis() ?? 0, // 현재값을 초단위로 변경해서 넣음
    }
  })
}

// 글 작성하기 (input 상자에서 받은 값을 매개변수 input으로 받는다. input의 타입 지정 필요함)
export const createPostApi = async (input: CreatePostApi): Promise<void> => {
  const collectionRef = collection(db, 'posts')

  await addDoc(collectionRef, {
    title : input.title,
    content: input.content,
    authorUid: input.authorUid,
    authorEmail: input.authorEmail,
    createAt: serverTimestamp(),
  })
}

// 수정하기
export const updatePostApi = async (input: UpdatePostApi): Promise<void> => {
  const ref = doc(db, 'posts', input.id) // db의 posts 컬렉션에서 id를 참조해 firebase의 doc를 이용해 ref에 담다

  await updateDoc(ref, {
    title: input.title,
    content: input.content,
  })
}

// 삭제하기
export const deletePostApi = async (id: string):Promise<void> => {
  const ref = doc(db, 'posts', id)
  await deleteDoc(ref)
}