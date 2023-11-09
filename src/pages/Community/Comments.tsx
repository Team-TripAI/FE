import { Divider, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface Comment {
  commentId: number;
  content: string;
  isParent: boolean;
  nickname: string;
  // Date로 바뀔 예정
  createDate: string;
  modifyDate: string;
}

interface CommentsProps {
  comments: Comment[];
}

const CommentsContainer = styled.div`
  width: 100%;
  background-color: #ede7e5;
  margin-top: 10px;
  padding: 20px;
`;
const CommentsContents = styled.div`
  display: flex;
  width: 100%;
`;

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <CommentsContainer>
      {comments.map((comment) => (
        <CommentsContents>
          <Typography>
            {comment.nickname} | {comment.content}
          </Typography>
        </CommentsContents>
      ))}
    </CommentsContainer>
  );
};

export default Comments;
