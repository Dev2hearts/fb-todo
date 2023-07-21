import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { useReducer } from "react";
import { appFireStore, timestamp } from "../firebase/config";

// FB 의 Store CRUD HOOK

// state 업데이트 리듀서
const storeReducer = (state, action) => {
    switch (action.type) {
        case "isPending":
            return {
                isPending: true,
                document: null,
                error: null,
                success: false,
            };
        case "addDoc":
            return {
                isPending: false,
                document: action.payload,
                error: null,
                success: true,
            };
        case "deleteDoc":
        case "updateCompleted":
        case "updateTitle":
            return {
                isPending: false,
                document: action.payload,
                error: null,
                success: true,
            };
    }
};

const initState = {
    document: null, //전송할 데이터
    isPending: false, // 네트워크 연걸
    error: null, // 에러 메세지
    success: false, // 작업 완료
};

export const useFireStore = transaction => {
    // dispatch 를 통해서 reducer 실행
    const [response, dispatch] = useReducer(storeReducer, initState);
    // FB store 의 컬렉션을 먼저 참조한다.
    // 컬렉션 (collection) 은 폴더라고 생각.
    // const colRef = collection(appFireStore, 컬렉션이름);
    const colRef = collection(appFireStore, transaction);
    // document 추가 : 컬렉션에 문서 추가
    const addDocument = async doc => {
        // 네트워크를 연결함을 표현
        dispatch({ type: "isPending" });
        try {
            const createTime = timestamp.fromDate(new Date());
            // doc = {title:"내용", complted: flase}
            const docRef = await addDoc(colRef, { ...doc, createTime });
            console.log("문서추가 실행");
            console.log(docRef);
            dispatch({ type: "addDoc", payload: docRef });
        } catch (err) {
            console.log(err.message);
        }
    };
    // document 삭제 : 컬렉션에 문서 삭제
    const deleteDocument = async id => {
        dispatch({ type: "isPending" });
        try {
            const docRef = await deleteDoc(doc(colRef, id));
            dispatch({ type: "deleteDoc", payload: docRef });
        } catch (err) {
            console.log(err.message);
        }
    };
    // completed 업데이트 : 컬렉션에 문서에 completed 수정
    const updateCompletedDocument = async (id, flag) => {
        dispatch({ type: "isPending" });
        try {
            const createTime = timestamp.fromDate(new Date());
            // FB 의 doc 메서드는 한 개의 document 를 선택한다.
            // doc(todo컬렉션(폴더) 참조, 아이디)
            // updateDoc(col,{key:value})
            const docRef = await updateDoc(doc(colRef, id), {
                completed: flag,
                createTime,
            });
            dispatch({ type: "updateCompleted", payload: docRef });
        } catch (err) {
            console.log(err.message);
        }
    };

    // title 업데이트 기능
    const updateTitleDocument = async (id, title) => {
        dispatch({ type: "isPending" });
        try {
            const createTime = timestamp.fromDate(new Date());
            const docRef = await updateDoc(doc(colRef, id), {
                title,
                createTime,
            });
            dispatch({ type: "updateTitle", payload: docRef });
        } catch (err) {
            console.log(err.message);
        }
    };

    return {
        addDocument,
        deleteDocument,
        updateCompletedDocument,
        updateTitleDocument,
        response,
    };
};
