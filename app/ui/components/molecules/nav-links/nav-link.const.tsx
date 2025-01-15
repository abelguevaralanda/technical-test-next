import React from 'react'
import { MdLocalMovies, MdOutlineDashboard } from 'react-icons/md'

export const LINKS = [
  { name: 'Home', href: '/movies', icon: <MdLocalMovies /> },
  {
    name: 'Dashboard',
    href: '/movies/dashboard',
    icon: <MdOutlineDashboard />,
  },
]
