"use client";
import { use, useEffect, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import AlarmToast from "./AlarmToast";

const SSESubscriber = () => {
  const [showToast, setShowToast] = useState(false);
  const [receivedData, setReceivedData] = useState("");
  //const [atkToken, setAtkToken] = useState(null);

  const EventSource = EventSourcePolyfill || NativeEventSource;

  /*
  useEffect(() => {
    const checkAndFetchSSE = () => {
      if (token) {
        fetchSSE();
      } else {
        checkAndFetchSSE();
      }
    };
  }, [token]);
*/
  useEffect(() => {
    const fetchSSE = (token) => {
      // SSE 연결되었을 때
      const openConnection = (event) => {
        console.log("SSE connection opened:", event);
      };

      // 댓글 알림
      const handleComment = (event) => {
        console.log("COMMENT");
        setShowToast(true);
        const data = JSON.parse(event.data);
        setReceivedData(data);
        console.log(data);

        // 5초 후에 showToast 상태를 false로 변경
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      };

      // 대댓글 알림
      const handleReplyComment = (event) => {
        console.log("REPLY_COMMENT");
        setReceivedData("");
        setShowToast(true);
        const data = JSON.parse(event.data);
        setReceivedData(data);
        console.log(data);

        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      };

      // 투표 마감 알림
      const handleVoteFinish = (event) => {
        console.log("VOTE_FINISH");
        setReceivedData("");
        setShowToast(true);
        const data = JSON.parse(event.data);
        setReceivedData(data);
        console.log(data);

        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      };

      // SSE 연결 에러
      const handleError = (event) => {
        if (eventSource !== undefined) {
          eventSource.close();
        }
      };

      const eventSource = new EventSource(
        "https://dev.gomin-chingu.site/sse/subscribe",
        {
          headers: {
            atk: typeof window !== "undefined" ? localStorage.getItem("token") : null,
            Connection: "keep-alive",
          },
          heartbeatTimeout: 86400000, //sse 연결 시간 (토큰 유지 24시간)
          withCredentials: true,
        }
      );

      eventSource.onopen = openConnection;
      eventSource.addEventListener("sse", openConnection);
      eventSource.addEventListener("COMMENT", handleComment);
      eventSource.addEventListener("REPLY_COMMENT", handleReplyComment);
      eventSource.addEventListener("VOTE_FINISH", handleVoteFinish);
      eventSource.onerror = handleError;

      return () => {
        if (!token && eventSource !== undefined) {
          setReceivedData("");
          console.log("이벤트 종료");
          eventSource.close();
        }
      };
    };

    const checkAndFetchSSE = () => {
      const token = localStorage.getItem("token");

      if (token) {
        fetchSSE(token);
      } else {
        // Set interval to check for token every 5 seconds
        const intervalId = setInterval(() => {
          const updatedToken = localStorage.getItem("token");
          if (updatedToken) {
            clearInterval(intervalId); // Clear interval if token is found
            fetchSSE(updatedToken);
          }
        }, 5000);

        // Clear interval if component unmounts
        return () => clearInterval(intervalId);
      }
    };
    checkAndFetchSSE();
  }, []);
  return <AlarmToast show={showToast} content={receivedData} />;
};

export default SSESubscriber;
