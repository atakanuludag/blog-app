// ** models
import NextPageType from '@/models/NextPageType'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utils
import getServerSideProps from '@/utils/AdminServerSideProps'

// ** components
import NewEditArticle from '@/components/admin/articles/NewEditArticle'

const AdminArticleNew: NextPageType = () => {
  return <NewEditArticle />
}

AdminArticleNew.layout = LayoutAdminPage
AdminArticleNew.title = 'Yeni Makale'
export default AdminArticleNew

export { getServerSideProps }
