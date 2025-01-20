import React from 'react'
import { MdLocalMovies, MdOutlineDashboard } from 'react-icons/md'

export const LINKS = [
  { name: 'Movies', href: '/movies', icon: <MdLocalMovies /> },
  {
    name: 'Dashboard',
    href: '/movies/dashboard',
    icon: <MdOutlineDashboard />,
  },
]
