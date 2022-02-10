import React from 'react'
import { NextPage } from 'next/types'
import { useQueryClient, useMutation } from 'react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import { QUERY_NAMES } from '@/core/Constants'
import { ISettingItem } from '@/models/ISettings'
import IPageProps from '@/models/IPageProps'
import { ValueType } from '@/models/enums'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import getServerSideProps from '@/utils/AdminServerSideProps'
import useSettingQuery from '@/hooks/queries/useSettingQuery'
import Loading from '@/components/Loading'
import NoFoundData from '@/components/NoFoundData'
import SettingService from '@/services/SettingService'

type AdminComponent = NextPage<IPageProps> & {
  layout: typeof LayoutAdminPage
}

const AdminSettings: AdminComponent = ({}: IPageProps) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { settingsQuery } = useSettingQuery()
  const { data, isError, isLoading, isFetching } = settingsQuery()

  // form validate
  const validationSchema = Yup.array().of(
    Yup.object().shape({
      value: Yup.mixed().required('Lütfen bu alanı doldurunuz.'),
    }),
  )

  const { errors, touched, isSubmitting, handleSubmit, setValues, values } =
    useFormik<ISettingItem[]>({
      initialValues: !data ? [] : data,
      enableReinitialize: true,
      validationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        settingsUpdate.mutate(values)
        setSubmitting(false)
      },
    })

  const settingsUpdate = useMutation(SettingService.postItems, {
    onSuccess: () => {
      enqueueSnackbar('Ayarlar başarıyla değiştirildi.', {
        variant: 'success',
      })
    },
    onError: () => {
      enqueueSnackbar('Ayarlar değiştirilirken bir sorun oluştu.', {
        variant: 'error',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries(QUERY_NAMES.SETTINGS)
    },
  })

  if (isLoading || isFetching) return <Loading />
  if (!data || isError) return <NoFoundData />

  return (
    <Box component="div">
      <form method="post" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {data.map(({ id, name, title, value, type }, i) => (
            <TextField
              key={i}
              type={type === ValueType.Multiline ? ValueType.Text : type}
              id={id}
              label={title}
              variant="outlined"
              fullWidth
              multiline={type === ValueType.Multiline}
              InputProps={
                type === ValueType.Number
                  ? {
                      inputProps: {
                        min: 0,
                      },
                    }
                  : {}
              }
              disabled={isSubmitting}
              value={!values[i] ? '' : values[i].value}
              onChange={(e) => {
                const { value } = e.target
                let _values = values
                _values[i].value = value
                setValues([..._values])
              }}
              name={name}
              helperText={
                errors[i]
                  ? typeof errors[i]?.value === 'string'
                    ? errors[i]?.value
                    : null
                  : touched[i]
                  ? typeof touched[i]?.value === 'string'
                    ? touched[i]?.value
                    : null
                  : null
              }
              error={
                errors[i]
                  ? typeof errors[i]?.value === 'string'
                    ? true
                    : false
                  : touched[i]
                  ? typeof touched[i]?.value === 'string'
                    ? true
                    : false
                  : false
              }
            />
          ))}

          <Box component="div" display="flex" justifyContent="flex-end">
            <LoadingButton
              type="submit"
              loading={false}
              variant="outlined"
              size="large"
            >
              Kaydet
            </LoadingButton>
          </Box>
        </Stack>
      </form>
    </Box>
  )
}

AdminSettings.layout = LayoutAdminPage
export default AdminSettings

export { getServerSideProps }