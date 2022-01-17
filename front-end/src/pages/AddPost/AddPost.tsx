import React from "react";
import Card from "../../components/Card";
import "./AddPost.css";

const AddPost = () => {
  return (
    <Card>
      <div className="section-add-post header">
        <h2>글 추가하기</h2>
      </div>
      <div className="section-add-post">
        <form>
          <div>
            <label>글제목</label>
            <br />
            <input
              className="title-input"
              type="text"
              placeholder="제목을 입력해주세요!"
            />
          </div>
          <div>
            <label>내용</label>
            <br />
            <textarea
              className="content-input"
              placeholder="내용을 입력해주세요!"
            />
          </div>
          <button className="bttn add-post-bttn" type="submit">
            만들기
          </button>
        </form>
      </div>
      <div className="section-add-post footer">
        <button>목록으로</button>
      </div>
    </Card>
  );
};

export default AddPost;
