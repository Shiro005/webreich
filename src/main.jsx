import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import News from './Pages/News/News.jsx'
import Community from './Pages/Community/Community.jsx'
import AllTopics from './Pages/Alltopics/Alltopics.jsx'
import TopicContent from './Pages/TopicContent/TopicContent.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='/news' element={<News />} />
      <Route path="/code" element={<AllTopics />} />
      <Route path="/topic/:topicId" element={<TopicContent />} />
      <Route path='/community' element={<Community />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)