import React, { useState, useEffect } from 'react';
import FetchComment from './FetchComment';
import styled from 'styled-components';
import elapsedTime from './elapsedTime';
import { useNavigate } from 'react-router-dom';

const Comment = ({ feedList, commentList, setCommentList, isFetchData, setIsFetchData }) => {
  useEffect(() => {
    setIsFetchData(false); // 컴포넌트가 리렌더링될 때마다 데이터를 다시 불러오기 위해 isFetchData 상태를 false로 설정
  }, []);
  console.log(commentList);
  const navigate = useNavigate();

  function goProfile(item) {
    navigate('/myprofile', { state: item });
  }

  return (
    <>
      <FetchComment
        fetchType="get"
        postID={feedList.id}
        setIsFetchData={setIsFetchData}
        setCommentList={setCommentList}
      />
      {isFetchData ? (
        <div>
          {commentList.map(comment => {
            return (
              <SCommentLayout key={comment.id}>
                <SProfileImg src={comment.author.image} alt="프사" onClick={() => goProfile(comment.author)} />
                <SComment>
                  <SUsername>
                    <div>{comment.author.username}</div>
                    <SCreateTime>{elapsedTime(comment.createdAt)}</SCreateTime>
                  </SUsername>
                  <div>{comment.content}</div>
                </SComment>
              </SCommentLayout>
            );
          })}
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </>
  );
};

export default Comment;
const SCommentLayout = styled.div`
  display: flex;
  color: var(--white);
  padding: 20px;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;
const SProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;
const SComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const SUsername = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const SCreateTime = styled.div`
  color: var(--gray);
  font-size: 10px;
  &::before {
    content: '•';
    margin-right: 5px;
  }
`;
