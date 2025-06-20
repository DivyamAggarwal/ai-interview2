// const GenerateFeedback = async () => {
  //   try {
  //     if (!conversation) {
  //       toast.error("No conversation data to analyze.");
  //       return;
  //     }
  //     const result = await axios.post("/api/ai-feedback", {
  //       conversation,
  //     });
  //     const Content = result.data.content || "";
  //     const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");
  //     console.log("AI Feedback:", FINAL_CONTENT);
  //   } catch (err) {
  //     console.error("Feedback generation failed:", err);
  //     toast.error("Failed to generate feedback.");
  //   }
  // };

  // 
 
  //   useEffect(() => {
  //   if (!vapiRef.current) {
  //     vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

  //     vapiRef.current.on("call-start", () => {
  //       console.log("Call has started");
  //       toast("Call Connected...");
  //       setStartTimer(true);
  //     });

  //     vapiRef.current.on("speech-start", () => {
  //       console.log("Assistant speech has started");
  //       setIsRecruiterSpeaking(true);
  //       setIsUserSpeaking(false);
  //     });

  //     vapiRef.current.on("speech-end", () => {
  //       console.log("Assistant speech has ended");
  //       setIsRecruiterSpeaking(false);
  //       setIsUserSpeaking(true);
  //     });

  //     vapiRef.current.on("call-end", () => {
  //       console.log("Call has ended");
  //       setIsRecruiterSpeaking(false);
  //       setIsUserSpeaking(false);
  //       toast("Call Disconnected...");
  //       setStartTimer(false);
  //       GenerateFeedback();
  //     });

  //     vapiRef.current.on("message", (message) => {
  //       console.log(message?.conversation);
  //       setConversation(message?.conversation);
  //     });
  //   }
  //    if (interviewInfo) {
  //     startCall();
  //   }

  //   return () => {
  //     try {
  //       vapiRef.current?.stop();
  //     } catch (e) {
  //       console.warn("Vapi already stopped or meeting ended.");
  //     }
  //   };
  // }, [interviewInfo]);



   // const stopInterview = () => {
  //   console.log("Stopping interview...");
  //   try {
  //     vapiRef.current?.stop(); // 🛑 safely stop call
  //   } catch (e) {
  //     console.warn("Meeting already ended:", e?.message);
  //   }
  //   setIsRecruiterSpeaking(false);
  //   setIsUserSpeaking(false);
  //   setStartTimer(false);
  // };
 



  //   const startCall = () => {
//     let questionList = "";
//     interviewInfo?.interviewData?.questionList?.forEach((item) => {
//       questionList = item?.question + "," + questionList;
//     });
//     const assistantOptions = {
//       name: "AI Recruiter",
//       firstMessage:
//         "Hi " +
//         interviewInfo?.userName +
//         ", how are you? Ready for your interview on " +
//         interviewInfo?.interviewData?.jobPosition +
//         "?",
//       transcriber: {
//         provider: "deepgram",
//         model: "nova-2",
//         language: "en-US",
//       },
//       voice: {
//         provider: "playht",
//         voiceId: "jennifer",
//       },
//       model: {
//         provider: "openai",
//         model: "gpt-4",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are an AI voice assistant conducting interviews.
// Your job is to ask candidates provided interview questions, assess their responses.
// Start with: "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let’s get started!"
// Ask one question at a time:
// Questions: ${questionList}
// After 5-7 questions, wrap up with feedback and encouragement.
// `.trim(),
//           },
//         ],
//       },
//     };
//     vapi.start(assistantOptions)
//   };
 