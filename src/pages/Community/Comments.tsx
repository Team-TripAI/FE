import React, { useState } from "react";
import styled from "styled-components";
import { Typography, TextField, Button, Divider } from "@mui/material";
import axiosInstance from "../../apis/axiosInstance";
import { Box } from "@mui/material";

interface Comment {
  commentId: number;
  content: string | null;
  isParent: boolean;
  nickname: string;
  createDate: string;
  modifyDate: string;
}

interface CommentsProps {
  articleId: number;
  comments: Comment[];
}

interface CommentSubmitForm {
  articleId: number;
  commentId?: number;
  content: string;
}

const CommentsContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50vw;
`;

const SecondComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50vw;
  margin-left: 10px;
`;

const ReplyContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 5px;
`;

const Comments: React.FC<CommentsProps> = ({ articleId, comments }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [newSecondComment, setNewSecondComment] = useState<string>("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [openComment, setOpenComment] = useState<number | null>(null);
  const [editSecondCommentId, setEditSecondCommentId] = useState<number | null>(
    null
  );

  const postComment = async (commentForm: CommentSubmitForm) => {
    if (commentForm.content.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      const response = await axiosInstance.post("/comments", {
        ...commentForm,
      });
      alert("댓글 작성 완료!");
      // 댓글 작성 후에는 새로고침을 통해 최신 댓글 목록을 불러올 수 있습니다.
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const postSecondComment = async (commentForm: CommentSubmitForm) => {
    try {
      const response = await axiosInstance.post("/comments", {
        ...commentForm,
      });
      alert("대댓글 작성 완료!");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const response = await axiosInstance.delete(`/comments/${commentId}`);
      alert("댓글 삭제 완료!");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentSubmit = async () => {
    const commentForm: CommentSubmitForm = {
      articleId: articleId,
      content: newComment,
    };
    postComment(commentForm);
  };

  const handleSecondCommentSubmit = async () => {
    const secondCommentForm: CommentSubmitForm = {
      articleId: articleId,
      commentId: replyTo,
      content: newSecondComment,
    };
    postSecondComment(secondCommentForm);
  };

  const handleReply = (commentId: number) => {
    setOpenComment((prev) => (prev === commentId ? null : commentId));
    setReplyTo(commentId);
  };

  return (
    <CommentsContainer>
      <Box sx={{ my: 2 }}>
        <TextField
          label="댓글 작성하기"
          variant="outlined"
          multiline
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mr: 1, width: "50vw" }}
        />
        <Button
          variant="outlined"
          sx={{ p: 1.9 }}
          onClick={handleCommentSubmit}
        >
          작성
        </Button>
      </Box>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.commentId}>
            {comment.isParent ? (
              <CommentContents>
                {comment.content !== null ? (
                  <Typography>
                    {comment.nickname} : {comment.content}
                  </Typography>
                ) : (
                  <Typography> | 삭제된 댓글입니다 | </Typography>
                )}
                {comment.content !== null && (
                  <>
                    <Button onClick={() => handleReply(comment.commentId)}>
                      {openComment === comment.commentId ? "닫기" : "답글"}
                    </Button>
                    <Button onClick={() => deleteComment(comment.commentId)}>
                      삭제
                    </Button>
                  </>
                )}
              </CommentContents>
            ) : (
              <SecondComment>
                ㄴ
                <Typography sx={{ ml: 1 }}>
                  {comment.nickname} :{" "}
                  {comment.content !== null
                    ? comment.content
                    : "삭제된 댓글입니다."}
                </Typography>
                {comment.content !== null && (
                  <>
                    <Button onClick={() => deleteComment(comment.commentId)}>
                      삭제
                    </Button>
                  </>
                )}
              </SecondComment>
            )}

            {replyTo === comment.commentId &&
              openComment === comment.commentId && (
                <ReplyContainer>
                  <TextField
                    label="답글 작성하기"
                    variant="outlined"
                    required
                    size="small"
                    value={newSecondComment}
                    onChange={(e) => setNewSecondComment(e.target.value)}
                    sx={{ mr: 1, width: "50vw" }}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleSecondCommentSubmit}
                  >
                    작성
                  </Button>
                </ReplyContainer>
              )}
          </div>
        ))
      ) : (
        <Typography>댓글이 없습니다. 먼저 작성해보세요!</Typography>
      )}
    </CommentsContainer>
  );
};

export default Comments;
