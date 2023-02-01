import React from 'react'
import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Footer from '@/layouts/Footer'
import { LayoutPageType } from '@/models/enums'

const useBlogPageStyle = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(9),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(20),
      paddingRight: theme.spacing(20),
    },
  },
}))

const useAdminPageStyle = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
  },
}))

interface IContent {
  children: React.ReactNode
  layoutPageType: LayoutPageType
  title?: string
}

export default function Content({ children, layoutPageType, title }: IContent) {
  const blogPageClasses = useBlogPageStyle()
  const adminPageClasses = useAdminPageStyle()

  return (
    <Container
      component="main"
      maxWidth="lg"
      fixed
      className={
        layoutPageType === LayoutPageType.BlogPage
          ? blogPageClasses.content
          : adminPageClasses.content
      }
    >
      {title && (
        <Typography variant="h5" fontWeight={500} mb={3}>
          {title}
        </Typography>
      )}
      {children}
      <Footer />
    </Container>
  )
}
