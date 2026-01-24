import { lazy } from 'react'
import Layout from '../Layout/Layout.jsx'
import { createBrowserRouter } from 'react-router-dom'
import ContextWrapper from './ContextWrapper.jsx'
import ProtectRoute from '../Layout/ProtectRoute.jsx'

const About = lazy(() => import('../Pages/About.jsx'))
const Contact = lazy(() => import('../Pages/Contact.jsx'))
const Explore = lazy(() => import('../Pages/Explore.jsx'))
const Skills = lazy(() => import('../Pages/Skills.jsx'))
const Projects = lazy(() => import('../Pages/Projects.jsx'))
const Auth = lazy(() => import('../Pages/Auth.jsx'))
const Verify = lazy(() => import('../Pages/Verify.jsx'))

export const router = createBrowserRouter([
    {
        element: <ContextWrapper />,
        children: [
            {
                path: '/',
                element: <Layout></Layout>,
                children: [
                    {
                        index: true,
                        element: <Explore />
                    },
                    {
                        path: '/explore',
                        element: <Explore />
                    },
                    {
                        path: '/projects',
                        element: <Projects />
                    },
                    {
                        path: '/skills',
                        element: <Skills />
                    },
                    {
                        path: '/about',
                        element: <About />
                    },
                    {
                        path: '/contact',
                        element: <Contact />
                    },
                ]
            },
            {
                element: <ProtectRoute />,
                children: [
                    {
                        path: "/auth",
                        element: <Auth />
                    },
                    {
                        path: "/verify",
                        element: <Verify />
                    }
                ]
            }
        ]
    }
])