import React from "react";
import { useMemo, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/config";

const Editor = () => {
    const quillRef = useRef();
    const [content, setContent] = useState("");
    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.addEventListener("change", async () => {
            const editor = quillRef.current.getEditor();
            const file = input.files[0];
            const range = editor.getSelection(true);
            try {
                // 파일명을 "image/Date.now()"로 저장
                const storageRef = ref(storage, `image/${Date.now()}`);
                // Firebase Method : uploadBytes, getDownloadURL
                await uploadBytes(storageRef, file).then(snapshot => {
                    getDownloadURL(snapshot.ref).then(url => {
                        // 이미지 URL 에디터에 삽입
                        editor.insertEmbed(range.index, "image", url);
                        // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
                        editor.setSelection(range.index + 1);
                    });
                });
            } catch (error) {
                console.log(error);
            }
        });
    };

    // quill에서 사용할 모듈
    // useMemo를 사용하여 modules가 렌더링 시 에디터가 사라지는 버그를 방지
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }, "link", "image"],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        };
    }, []);
    return (
        <div style={{ margin: "50px" }}>
            <button onClick={() => console.log(content)}>Value</button>
            <ReactQuill
                style={{ width: "600px", height: "600px" }}
                placeholder="Quill Content"
                theme="snow"
                ref={quillRef}
                value={content}
                onChange={setContent}
                modules={modules}
            />
        </div>
    );
};

export default Editor;
