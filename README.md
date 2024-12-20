# React RTK Query  
A practical implementation and demonstration of **Redux Toolkit Query (RTK Query)** for efficient data fetching and caching in React applications. This repository showcases how to use RTK Query with real-world examples and best practices for building scalable, performant applications.  

## **Key Features**  
- 🔄 **Simplified API Calls**: Manage data fetching, caching, and synchronization with minimal boilerplate.  
- ⚡ **Automatic Caching**: Out-of-the-box support for cache invalidation and updates.  
- 🛠 **CRUD Operations**: Seamless integration with RESTful APIs for create, read, update, and delete actions.  
- 📡 **Real-time Updates**: Subscribe to changes and keep data in sync with server state.  

## **Getting Started**  

### **Prerequisites**  
Ensure you have the following installed:  
- Node.js (v14 or higher)  
- npm or yarn  

### **Installation**  
Clone the repository and install dependencies:  
```bash
git clone https://github.com/hasunnilupul/react-rtk-query.git
cd react-rtk-query
npm install
```

## **Usage**  

### **Start the Development Server**  
Run the application locally:  
```bash
npm start
```
The app will be available at `http://localhost:3000`.

## **Project Structure**  
```plaintext
react-rtk-query/
├── src/
│   ├── app/           # Redux store configuration
│   ├── features/      # Feature-specific slices and API services
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components
│   ├── services/      # RTK Query API definitions
│   ├── App.js         # Main application component
│   ├── index.js       # Entry point
└── README.md
```

## **RTK Query Overview**  

### **Defining an API Service**  
RTK Query requires defining an API service using `createApi`. Here's an example:  
```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = api;
```

### **Integrating with the Store**  
Add the API service to your Redux store:  
```javascript
import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
```

### **Using in Components**  
Fetch and mutate data directly in components using hooks:  
```javascript
import React from 'react';
import { useGetPostsQuery, useAddPostMutation } from '../services/api';

const Posts = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();

  const handleAddPost = async () => {
    await addPost({ title: 'New Post', content: 'This is a new post.' });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
};

export default Posts;
```

## **Learning Resources**  
- [Redux Toolkit Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)  
- [Redux Toolkit GitHub](https://github.com/reduxjs/redux-toolkit)  

## **Contributing**  
Contributions are welcome! If you'd like to enhance this repository or fix any issues:  
1. Fork the repository.  
2. Create a new feature branch (`git checkout -b feature-name`).  
3. Commit your changes (`git commit -m "Add feature"`).  
4. Push to the branch (`git push origin feature-name`).  
5. Create a pull request.  

## **License**  
This repository is licensed under the [MIT License](LICENSE).

## **Acknowledgments**  
Special thanks to the Redux Toolkit team for their excellent documentation and tools that make state management effortless.  

Feel free to try it out and let us know your feedback! 🚀  
