// ** react
import { Fragment } from 'react'

// ** next
import { default as NextLink } from 'next/link'

// ** third party
import { NextSeo } from 'next-seo'

// ** mui
import { default as MaterialLink } from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// ** layouts
import LayoutFullPage from '@/layouts/LayoutFullPage'

// ** components
import SearchInput from '@/components/SearchInput'

// ** models
import NextPageType from '@/models/NextPageType'

const Title = styled(Typography)(({ theme }) => ({
  letterSpacing: theme.spacing(5),
}))
const SubTitle = styled(Typography)(({}) => ({}))

const NotFoundPage: NextPageType = () => {
  return (
    <Fragment>
      <NextSeo title="404 Sayfa Bulunamadı" nofollow noindex />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
        spacing={3}
      >
        <Grid item>
          <Title align="center" variant="h1">
            404
          </Title>
        </Grid>

        <Grid item>
          <SubTitle align="center" variant="h4">
            Sayfa Bulunamadı 😔
          </SubTitle>
        </Grid>

        <Grid item>
          <Typography align="center" variant="body2" component="span">
            <MaterialLink component={NextLink} href="/" color="secondary">
              Buraya
            </MaterialLink>{' '}
            tıklayarak ana sayfaya dönebilir veya aşağıdan arama yapabilirsiniz.
          </Typography>
        </Grid>

        <Grid item>
          <SearchInput fullWidth />
        </Grid>
      </Grid>
    </Fragment>
  )
}

NotFoundPage.layout = LayoutFullPage
export default NotFoundPage
