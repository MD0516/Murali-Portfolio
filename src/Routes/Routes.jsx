import About from '../Pages/About.jsx'
import Contact from '../Pages/Contact.jsx'
import Explore from '../Pages/Explore.jsx'
import Skills from '../Pages/Skills.jsx'
import Projects from '../Pages/Projects.jsx'
import Layout from '../Layout/Layout.jsx'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout></Layout>,
        children: [
            {
                index: true,
                element: <Explore />
            },
            {
                path:'/explore',
                element: <Explore />
            },
            {
                path:'/projects',
                element: <Projects />
            },
            {
                path:'/skills',
                element: <Skills />
            },
            {
                path:'/about',
                element: <About />
            },
            {
                path:'/contact',
                element: <Contact />
            }
        ]
    }
])