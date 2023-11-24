import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CommitIcon from "@mui/icons-material/Commit";

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
  padding: 10px;
`;

const CommentContents = styled.div`
  display: flex;
  width: 100%;
  padding: 3px;
`;

const SecondComment = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 3px;
  margin-left: 10px;
`;

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <CommentsContainer>
      {comments.map((comment) =>
        comment.isParent ? (
          <CommentContents>
            <Typography>
              {comment.nickname} : {comment.content}
            </Typography>
          </CommentContents>
        ) : (
          <>
            <SecondComment>
              <CommitIcon />
              <Typography sx={{ ml: 1 }}>
                {comment.nickname} : {comment.content}
              </Typography>
            </SecondComment>
          </>
        )
      )}
    </CommentsContainer>
  );
};

export default Comments;
