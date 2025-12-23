import frontmatter from 'front-matter';

export const getBlogs = () => {
  const modules = import.meta.glob('/src/content/*.md', { 
    eager: true, 
    query: '?raw', 
    import: 'default' 
  });
  
  const blogs = Object.keys(modules).map((path) => {
    const content = modules[path];
    const { attributes, body } = frontmatter(content);
    
    const slug = path.split('/').pop().replace('.md', '');
    
    return {
      slug,
      ...attributes, 
      body,
      size: (body.length / 1024).toFixed(1) + " KB"
    };
  });

  return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getBlogBySlug = (slug) => {
  const blogs = getBlogs();
  return blogs.find((blog) => blog.slug === slug);
};