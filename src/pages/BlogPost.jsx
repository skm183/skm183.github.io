import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft, FaTerminal } from 'react-icons/fa';
import { getBlogBySlug } from '../utils/blogLoader';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/vs2015.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const data = getBlogBySlug(slug);
    setPost(data);
  }, [slug]);

  if (!post) return <div className="text-white p-10 font-mono">Loading /dev/null...</div>;

  const markdownComponents = {
    a: ({ node, ...props }) => (
      <a 
        {...props} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:underline hover:text-cyan-300 transition-colors"
      />
    )
  };

  return (
    <article className="min-h-screen bg-neutral-950 py-20 px-6 font-mono text-neutral-300 selection:bg-cyan-500/30 selection:text-cyan-100">
      <div className="max-w-5xl mx-auto">
        
        <Link to="/blog" className="inline-flex items-center gap-2 text-cyan-400 md:text-neutral-500 hover:text-cyan-400 mb-8 transition-colors group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            cd ..
        </Link>

        <header className="mb-12 border-b border-neutral-800 pb-8">
            <div className="flex gap-4 text-xs text-neutral-400 mb-4 uppercase tracking-wider">
                <span className="text-cyan-500">{post.category}</span>
                <span>//</span>
                <span>{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-neutral-400 bg-neutral-900/50 p-2 rounded border border-neutral-800 w-fit">
                <FaTerminal className="text-cyan-500"/>
                <span>{post.readTime} read</span>
                <span className="text-neutral-600 mx-2">|</span>
                <span>{post.size}</span>
            </div>
        </header>

        <div className="
          prose prose-invert prose-sm md:prose-lg max-w-none
          prose-h1:text-2xl md:prose-h1:text-4xl
          
          prose-headings:font-mono prose-headings:text-cyan-50
          
          prose-a:text-cyan-400 prose-a:no-underline

          prose-blockquote:not-italic 
          prose-blockquote:font-normal 
          prose-blockquote:text-neutral-300 
          prose-blockquote:border-l-cyan-500
          [&_blockquote_p]:before:content-none 
          [&_blockquote_p]:after:content-none

          prose-pre:bg-[#1e1e1e] 
          prose-pre:rounded-lg 
          prose-pre:border prose-pre:border-neutral-800


          prose-code:text-cyan-300 
          prose-code:bg-neutral-700 
          prose-code:px-1.5 
          prose-code:py-0.5 
          prose-code:rounded-md
          prose-code:font-mono
          prose-code:before:content-none 
          prose-code:after:content-none


          [&_pre_code]:bg-transparent 
          [&_pre_code]:p-0 
          [&_pre_code]:text-inherit 
          [&_pre_code]:font-inherit
        ">
            <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{post.body}</ReactMarkdown>
        </div>

      </div>
    </article>
  );
};

export default BlogPost;