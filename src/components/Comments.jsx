import React, { useEffect, useState, useRef } from 'react';
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    where,
    onSnapshot,
    arrayUnion,
    arrayRemove,
    serverTimestamp,
} from "firebase/firestore";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { FaHeart, FaTrashAlt, FaGoogle, FaGithub, FaReply, FaTimes } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { db, auth, googleProvider, githubProvider } from "../firebase";

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [user, setUser] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const textareaRef = useRef(null);

    const OWNER_ID = "Jfjd1pKZkRT5TCdA8bBzWCgTh2R2";
    const isOwner = user?.uid ===  OWNER_ID;

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
                    username: currentUser.displayName || "Anonymous",
                    avatarUrl: currentUser.photoURL || "https://freesvg.org/users-profile-icon"
                });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        const q = query(collection(db, "comments"), where("postId", "==", postId), orderBy("createdAt", "desc"));
        const unsubscribeComments = onSnapshot(q, (snapshot) => {
            const commentsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(commentsData);
        });
        return () => unsubscribeComments();
    }, []);

    const handleLogin = async (provider) => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Authentication failed: ", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Sign-out failed: ", error);
        }
    };

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim() || !user) return;

        try {
            await addDoc(collection(db, "comments"), {
                userId: user.uid,
                postId: postId,
                username: user.username,
                avatarUrl: user.avatarUrl,
                commentText: commentText.trim(),
                createdAt: serverTimestamp(),
                likes: [],
                replyToId: replyingTo ? replyingTo.id : null,
                replyToUser: replyingTo ? replyingTo.username : null,
                replyToSnippet: replyingTo ? replyingTo.textSnippet : null
            });
            setReplyingTo(null);
            setCommentText("");
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteDoc(doc(db, "comments", commentId));
        } catch (error) {
            console.error("Error deleting comment: ", error);
        }
    };

    const handleToggleLike = async (commentId, likesArray) => {
        if (!user) {
            alert("Please log in to like comments!");
            return;
        }
        const commentRef = doc(db, "comments", commentId);
        const hasLiked = likesArray?.includes(user.uid);

        try {
            await updateDoc(commentRef, {
                likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
            });
        } catch (error) {
            console.error("Error updating likes: ", error);
        }
    };

    const handleReply = (comment) => {
        if (!user) {
            alert("Please log in to reply comments!");
            return;
        }

        setReplyingTo({
            id: comment.id,
            username: comment.username,
            textSnippet: comment.commentText.substring(0, 50) + (comment.commentText.length > 50 ? "..." : "")
        })

        if (textareaRef.current) {
            textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                textareaRef.current.focus();
            }, 300);
        }
    };

    const getDayLabel = (timestamp) => {
        if (!timestamp) return "Just now";
        const date = new Date(timestamp.seconds * 1000);
        const now = new Date();
        if (date.toDateString() === now.toDateString()) return "Today";
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
        return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className='max-w-7xl mx-auto mt-16 md:px-4'>
            <div className="mb-4">
                <h2 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
                    <span className="text-cyan-500">/</span>Comments
                </h2>
                <div className="h-1 w-full bg-linear-to-r from-cyan-500 to-transparent to-60%"></div>
            </div>

            <div className='w-full bg-[#1f1f1f] p-4 rounded-[5px]'>

                {!user ? (
                    <div className="flex flex-col items-center justify-center p-6 bg-gray-700/30 rounded mb-6 border border-gray-700">
                        <span className="text-white font-mono mb-3 md:text-base text-xs">Sign in to join the discussion</span>
                        <span className="text-gray-300 font-mono mb-3 bg-gray-600 px-4 py-0.5 rounded text-xs md:text-base">$ select <span className='text-cyan-400'>auth_provider</span>:</span>
                        <div className="flex md:gap-15 gap-10">
                            <div className='flex flex-col'>
                                <button
                                    onClick={() => handleLogin(googleProvider)}
                                    className="group py-2 md:py-3 bg-black border-2 border-cyan-500 text-cyan-350 transition-all duration-400 md:hover:bg-cyan-500 md:hover:text-black md:hover:shadow-[0_0_20px_#06b6d4] active:bg-cyan-500 active:text-black active:shadow-[0_0_25px_#06b6d4] flex justify-center items-center rounded-2xl"
                                >
                                    <FaGoogle className='text-lg'/>
                                </button>
                                <span className='text-xs md:text-base'>Google</span>
                            </div>

                            <div className='flex flex-col'>
                                <button
                                    onClick={() => handleLogin(githubProvider)}
                                    className="group py-2 md:py-3 bg-black border-2 border-cyan-500 text-cyan-350 transition-all duration-400 md:hover:bg-cyan-500 md:hover:text-black md:hover:shadow-[0_0_20px_#06b6d4] active:bg-cyan-500 active:text-black active:shadow-[0_0_25px_#06b6d4] rounded-2xl flex justify-center items-center active:scale-95"
                                >
                                    <FaGithub className='text-lg'/>
                                </button>
                                <span className='text-xs md:text-base'>GitHub</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handlePostComment} className='justify-center flex flex-col mb-6 items-center gap-2'>
                        <div className="flex justify-between w-full items-center px-1">
                            <div className="flex items-center gap-2">
                                <img src={user.avatarUrl} alt="Your profile" className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                                <span className='text-gray-300 font-medium md:text-base text-xs'>Logged in as <span className={isOwner ? "text-red-400": "text-cyan-400"}>{user.username}</span></span>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="group px-2 md:py-1 py-0 bg-black border border-neutral-600 text-neutral-300 rounded transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:border-red-500 hover:text-red-400 cursor-pointer active:border-red-500 active:text-red-400 active:scale-95"
                            >
                                <span className='text-neutral-500 group-hover:text-white group-active:text-white transition-all duration-300 text-xs md:text-base'> $ </span><span className='md:text-base text-xs'>LOG OUT</span>                               
                            </button>
                        </div>

                        <div className={`w-fit self-start overflow-hidden transition-all duration-300 ease-in-out ${replyingTo ? 'max-h-[50px] opacity-100 mb-1' : 'max-h-0 opacity-0 mb-0'}`}>
                            <div className="flex items-center justify-between bg-[#2a2a2a] px-1 py-0.5 md:p-2 rounded-t text-[10px] md:text-xs text-gray-400 gap-3 border border-gray-500">
                                <span>Replying to <span className="text-cyan-400 font-bold">@{replyingTo?.username}</span></span>
                                <button onClick={() => setReplyingTo(null)} className="hover:text-gray-300"><FaTimes /></button>
                            </div>
                        </div>
                        
                        <textarea
                            className='bg-[#343434] text-white rounded w-full h-[70px] p-3 focus:outline-hidden focus:ring-1 focus:ring-cyan-500 transition-all md:text-sm text-xs resize-none'
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder='Enter your comment'
                            ref={textareaRef}
                            maxLength={1000}
                        />
                        <div className="text-right mr-5 text-[10px] md:text-xs text-gray-400 w-full">
                            {commentText.length}/1000
                        </div>

                        <button
                            type="submit"
                            className='self-end border-2 border-[#3b3b3b] text-white py-1.5 md:px-4 px-2 rounded font-medium md:text-sm text-xs active:text-cyan-200 active:border-cyan-400 hover:text-cyan-200 hover:border-cyan-400 transition-colors cursor-pointer duration-300 bg-neutral-900'
                        >
                            ./submit.sh
                        </button>
                    </form>
                )}

                <div className='flex flex-col gap-4'>
                    {comments.map((comment, index) => {
                        const currLabel = getDayLabel(comment.createdAt);
                        const prevLabel = index > 0 ? getDayLabel(comments[index - 1].createdAt) : null;
                        const showDateHeader = currLabel !== prevLabel;

                        const isLikedByMe = comment.likes?.includes(user?.uid);
                        const totalLikes = comment.likes?.length || 0;
                        const isMyComment = comment.userId === user?.uid;

                        return (
                            <React.Fragment key={comment.id}>
                                <div id={`comment-${comment.id}`} className={`flex bg-[#343434] md:p-4 px-4 py-2.5 rounded gap-3 group relative transition-all duration-500 ${comment.replyToUser === user?.username ? 'border-l-2 border-cyan-700' : ''}`}>
                                    <div className='shrink-0'>
                                        <img
                                            src={comment.avatarUrl || "https://freesvg.org/img/abstract-user-flat-4.png"}
                                            alt="avatar"
                                            className='w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full object-cover bg-gray-600'
                                        />
                                    </div>
                                    <div className='flex-1 min-w-0'>

                                        {comment.replyToId && (
                                            <div 
                                                onClick={() => document.getElementById(`comment-${comment.replyToId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                                className="mb-2 pl-2 border-l-2 border-gray-500 cursor-pointer hover:border-cyan-400 transition-colors group/reply"
                                            >
                                                <div className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1 group-hover/reply:text-gray-300">
                                                    <FaReply className="scale-x-[-1] shrink-0" />
                                                    <span className="font-bold text-gray-300">@{comment.replyToUser}</span>
                                                    <span className="truncate max-w-[150px] md:max-w-[300px] inline-block align-bottom">
                                                        "{comment.replyToSnippet}"
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <div className='flex items-center gap-3 mb-1 justify-between md:pr-5'>
                                            {comment.userId === OWNER_ID ? 
                                            <span className='text-white font-semibold md:text-sm text-xs [text-shadow:0_0_8px_#ff5757]'>[
                                                <span className='lowercase text-red-400'>{comment.username}</span>
                                                <span className='text-neutral-400'>@
                                                <span className='text-white font-bold'>root</span>
                                                #
                                                </span>
                                            ]</span>
                                            : 
                                            <span className='text-white font-semibold md:text-sm text-xs [text-shadow:0_0_8px_#3cdbff]'>[
                                                <span className='lowercase text-cyan-400'>{comment.username}</span>
                                                <span className='text-neutral-400'>@
                                                <span className='text-white font-bold'>guest</span>
                                                $
                                                </span>
                                            ]</span>}
                                            
                                            <span className='text-gray-400 md:text-xs text-[12px]'>{currLabel}</span>
                                        </div>

                                        <p className='text-gray-200 md:text-sm text-xs wrap-break-word whitespace-pre-wrap'>{comment.commentText}</p>

                                        <div className='flex items-center gap-4 md:mt-3 mt-1 md:text-xs text-gray-300 text-[12px]'>
                                            <button
                                                onClick={() => handleToggleLike(comment.id, comment.likes)}
                                                className={`flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer ${isLikedByMe ? 'text-cyan-400 font-bold' : ''}`}
                                            >
                                                {isLikedByMe ? <FaHeart /> : <CiHeart className='text-[15px]' />} {totalLikes}
                                            </button>

                                            {(isMyComment || isOwner) && (
                                                <button
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className='hover:text-cyan-400 text-gray-400 transition-colors cursor-pointer'
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleReply(comment)}
                                                className='hover:text-cyan-400 text-gray-400 transition-colors cursor-pointer'
                                            >
                                                <FaReply/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}

                    {comments.length === 0 && (
                        <div className="text-center py-8 text-gray-500 font-mono text-sm">
                            No comments yet. Be the first!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comments;