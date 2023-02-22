// ** react
import React, { useState } from 'react'

// ** next
import { NextPage } from 'next/types'
import { default as NextLink } from 'next/link'

// ** mui
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

// ** third party
import moment from 'moment'

// ** models
import PageProps from '@/models/AppPropsModel'
import ArticleModel, { ArticleListResponseModel } from '@/models/ArticleModel'
import ListQueryModel from '@/models/ListQueryModel'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utilis
import getServerSideProps from '@/utils/AdminServerSideProps'

// ** hooks
import useArticleQuery from '@/hooks/queries/useArticleQuery'

// ** components
import DataGrid from '@/components/datagrid'
import SearchInput from '@/components/admin/SearchInput'

// ** constants
import { QUERY_NAMES } from '@/core/Constants'

type AdminComponent = NextPage<PageProps> & {
  layout: typeof LayoutAdminPage
  title: string
}

const AdminArticleIndex: AdminComponent = ({ settings }: PageProps) => {
  const [params, setParams] = useState<ListQueryModel>({
    page: 1,
    pageSize: settings.pageSize,
  })
  const [customLoading, setCustomLoading] = useState(false)
  const { articleQuery } = useArticleQuery(params)
  const { data, isLoading, isFetching } = articleQuery()
  const items = data as ArticleListResponseModel
  const loading = isLoading || isFetching || customLoading

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Başlık',
      width: 450,
      renderCell: ({ row }: GridRenderCellParams<any, ArticleModel, any>) => (
        <Link component={NextLink} href="/">
          {row.title}
        </Link>
      ),
    },
    {
      field: 'publishingDate',
      headerName: 'Tarih',
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<any, ArticleModel, any>) =>
        moment(new Date(row.publishingDate)).format('DD/MM/YYYY - HH:mm'),
    },
    {
      field: 'categories',
      headerName: 'Kategoriler',
      width: 410,
      renderCell: ({ row }: GridRenderCellParams<any, ArticleModel, any>) =>
        row.categories.map((v) => v.title).join(', '),
    },
  ]

  return (
    <Box>
      <Grid
        container
        spacing={1}
        display="flex"
        justifyContent="space-between"
        pb={3}
      >
        <Grid item md={9} xs={12} display="flex" alignItems="center">
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" fontWeight={500}>
              Makaleler
            </Typography>
            <Button variant="contained" size="small">
              Yeni ekle
            </Button>
          </Stack>
        </Grid>

        <Grid item md={3} xs={12}>
          <SearchInput
            loading={loading}
            params={params}
            setParams={setParams}
          />
        </Grid>
      </Grid>

      <DataGrid
        queryName={QUERY_NAMES.ARTICLE}
        loading={loading}
        setCustomLoading={setCustomLoading}
        columns={columns}
        data={items?.results as any}
        pageSize={params.pageSize as number}
        page={params.page as number}
        totalResults={items?.totalResults as number}
        params={params}
        setParams={setParams}
      />
    </Box>
  )
}

AdminArticleIndex.layout = LayoutAdminPage
AdminArticleIndex.title = 'Makaleler'
export default AdminArticleIndex

export { getServerSideProps }
