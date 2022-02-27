import React from 'react'
import moment from 'moment'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import IArticle from '@/models/IArticle'
import ArticleLikeButton from '@/components/ArticleLikeButton'

interface IArticleDetailProps {
  data: IArticle
  currentIpAdressIsLiked: boolean
}

const Article = styled('article')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const Image = styled('img')(({ theme }) => ({
  maxWidth: '100%',
}))

const Title = styled('h2')(() => ({
  margin: 0,
  fontWeight: 'bold',
  fontSize: '2rem',
}))

const Content = styled('div')(({ theme }) => ({}))

const StackItem = styled('p')(({ theme }) => ({
  padding: 0,
  margin: 0,
  color: theme.palette.secondary.contrastText,
  fontSize: '0.770rem',
}))

function ArticleDetail({ data, currentIpAdressIsLiked }: IArticleDetailProps) {
  const coverImage = `./blog-post-banner.jpeg`
  //item.coverImage

  return (
    <Article>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid container item xs={12}>
          <Grid item xs={10}>
            <Title>{data.title}</Title>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <ArticleLikeButton
              itemId={data.id}
              likedCount={data.likedCount}
              currentIpAdressIsLiked={currentIpAdressIsLiked}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
          >
            <StackItem>{moment(data.publishingDate).fromNow()}</StackItem>
            <StackItem>
              {data.readingTimeMin <= 0
                ? '1 dakikadan az'
                : `${data.readingTimeMin} dakikalık okuma`}
            </StackItem>
            <StackItem>{`${data.viewCount} okunma`}</StackItem>
            <StackItem>{`${data.likedCount} beğeni`}</StackItem>
          </Stack>
        </Grid>

        <Grid item>
          <Image src={coverImage} alt={data.title} />
        </Grid>

        <Grid item>
          <Content dangerouslySetInnerHTML={{ __html: data.content }}></Content>
        </Grid>
      </Grid>
    </Article>
  )
}

export default ArticleDetail
