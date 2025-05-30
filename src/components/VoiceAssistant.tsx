// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Mic, Loader2, Bot } from "lucide-react";

// function PulseCircle() {
//   return (
//     <motion.div
//       className="w-24 h-24 bg-black rounded-full flex flex-col items-center justify-center relative"
//       animate={{ scale: [1, 1.1, 1] }}
//       transition={{ repeat: Infinity, duration: 1 }}
//     >
//       <Mic className="text-white w-8 h-8 z-10" />
//       <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/80">Listening...</span>
//     </motion.div>
//   );
// }

// function ThoughtBubble() {
//   return (
//     <motion.div
//       className="w-24 h-24 bg-black rounded-full flex items-center justify-center relative"
//       animate={{ scale: [1, 1.05, 1] }}
//       transition={{ repeat: Infinity, duration: 1.2 }}
//     >
//       <Loader2 className="text-white w-8 h-8 animate-spin" />
//       <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/80">Thinking...</span>
//     </motion.div>
//   );
// }

// function ReplyBubble({ text }: { text: string }) {
//   return (
//     <motion.div
//       className="w-64 min-h-[5rem] bg-white text-black rounded-2xl shadow-lg p-4 flex items-center"
//       initial={{ scale: 0.9, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Bot className="mr-2 text-accent w-6 h-6" />
//       <span>{text}</span>
//     </motion.div>
//   );
// }

// // async function recordAndTranscribe(): Promise<string> {
// //   return new Promise((resolve) => {
// //     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
// //     if (!SpeechRecognition) {
// //       alert('Speech Recognition is not supported in this browser.');
// //       resolve("");
// //       return;
// //     }
// //     const recognition = new SpeechRecognition();
// //     recognition.lang = 'en-US';
// //     recognition.start();
// //     recognition.onresult = (event: any) => resolve(event.results[0][0].transcript);
// //     recognition.onerror = () => resolve("");
// //   });
// // }

// async function fetchAIResponse(prompt: string): Promise<string> {
//   const res = await fetch('/api/voice-chat', {
//     method: 'POST',
//     body: JSON.stringify({ prompt }),
//   });
//   const data = await res.json();
//   return data.reply;
// }

// // function speak(text: string) {
// //   const utterance = new window.SpeechSynthesisUtterance(text);
// //   utterance.lang = 'en-US';
// //   window.speechSynthesis.speak(utterance);
// // }

// export default function VoiceAssistant() {
//   const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'replying'>('idle');
//   const [reply, setReply] = useState('');
//   const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
//   const [speaking, setSpeaking] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [httpsWarning, setHttpsWarning] = useState('');
//   const [micSupported, setMicSupported] = useState(true);

//   // Check HTTPS and STT support on mount
//   React.useEffect(() => {
//     if (typeof window !== 'undefined') {
//       if (window.location.protocol !== 'https:') {
//         setHttpsWarning('Voice input only works on HTTPS or localhost. Please use a secure connection.');
//       }
//       const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//       if (!SpeechRecognition) {
//         setMicSupported(false);
//         setErrorMsg('Speech Recognition is not supported in this browser. Try Chrome or Edge on desktop.');
//       }
//     }
//   }, []);

//   // Stop button handler
//   const handleStop = () => {
//     console.log('Stop button pressed.');
//     if (status === 'listening' && recognition) {
//       console.log('Aborting speech recognition.');
//       recognition.abort();
//       setStatus('idle');
//     }
//     if (status === 'replying' && speaking) {
//       console.log('Aborting speech synthesis.');
//       window.speechSynthesis.cancel();
//       setSpeaking(false);
//       setStatus('idle');
//     }
//   };

//   // Main click handler
//   const handleClick = async () => {
//     console.log('Mic button pressed. Going to listening state.');
//     setStatus('listening');
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert('Speech Recognition is not supported in this browser.');
//       setStatus('idle');
//       return;
//     }
//     const recog = new SpeechRecognition();
//     recog.lang = 'en-US';
//     recog.start();
//     setRecognition(recog);
//     console.log('Speech recognition started. Waiting for result...');
//     recog.onresult = async (event: any) => {
//       const text = event.results[0][0].transcript;
//       console.log('Speech recognition result:', text);
//       setStatus('thinking');
//       recog.abort();
//       setRecognition(null);
//       try {
//         console.log('Calling AI API...');
//         const aiReply = await fetchAIResponse(text);
//         console.log('AI API replied:', aiReply);
//         setReply(aiReply);
//         setStatus('replying');
//         console.log('Starting speech synthesis...');
//         setSpeaking(true);
//         const utterance = new window.SpeechSynthesisUtterance(aiReply);
//         utterance.lang = 'en-US';
//         utterance.onend = () => {
//           console.log('Speech synthesis ended.');
//           setSpeaking(false);
//           setStatus('idle');
//         };
//         window.speechSynthesis.speak(utterance);
//       } catch (err) {
//         console.log('AI API error:', err);
//         setStatus('idle');
//       }
//     };
//     recog.onerror = (e: any) => {
//       console.log('Speech recognition error:', e);
//       let msg = '';
//       switch (e.error) {
//         case 'not-allowed':
//           msg = 'Microphone access denied. Please allow mic permissions and refresh.';
//           break;
//         case 'network':
//           msg = 'Network error. Check your internet connection or try HTTPS.';
//           break;
//         case 'no-speech':
//           msg = 'No speech detected. Please try again.';
//           break;
//         case 'aborted':
//           msg = 'Speech recognition aborted.';
//           break;
//         default:
//           msg = 'Speech recognition error: ' + (e.error || 'Unknown error.');
//       }
//       setErrorMsg(msg);
//       setTimeout(() => setErrorMsg(''), 5000);
//       setStatus('idle');
//       setRecognition(null);
//     };
//   };

//   // Layout: mic dot (input) and reply dot (output) are visually separated
//   return (
//     <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
//       {/* Mic input dot */}
//       <div className="flex flex-col items-center gap-2">
//         <button
//           onClick={handleClick}
//           disabled={status !== 'idle' || !micSupported || !!httpsWarning}
//           className={`w-24 h-24 bg-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition ${(status !== 'idle' || !micSupported || !!httpsWarning) ? 'opacity-60 cursor-not-allowed' : ''}`}
//         >
//           <Mic className="text-white w-8 h-8" />
//         </button>
//         <span className="text-xs text-muted-foreground mt-1">Voice Input</span>
//         {(status === 'listening' || status === 'thinking' || status === 'replying') && (
//           <button
//             onClick={handleStop}
//             className="mt-2 px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
//           >
//             Stop
//           </button>
//         )}
//         {httpsWarning && (
//           <div className="mt-2 text-xs text-yellow-600 text-center max-w-[10rem]">{httpsWarning}</div>
//         )}
//         {errorMsg && (
//           <div className="mt-2 text-xs text-red-500 text-center max-w-[10rem]">{errorMsg}</div>
//         )}
//       </div>
//       {/* Output dot/response */}
//       <div className="flex flex-col items-center gap-2">
//         {status === 'listening' && <PulseCircle />}
//         {status === 'thinking' && <ThoughtBubble />}
//         {status === 'replying' && <ReplyBubble text={reply} />}
//         {status === 'idle' && (
//           <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center shadow-lg">
//             <Bot className="text-white w-8 h-8" />
//           </div>
//         )}
//         <span className="text-xs text-muted-foreground mt-1">AI Output</span>
//       </div>
//     </div>
//   );
// }
