import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../Redux/Store'
import AdminLaout from "../components/admin/AdminLayout"
import { useRouter } from 'next/router'
import { CookiesProvider } from "react-cookie"
import { ProSidebarProvider } from 'react-pro-sidebar';
// import { ProSidebarProvider } from 'react-pro-sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const path = router.pathname
  return (
    <Provider store={store}>
      <CookiesProvider>
        {
          path.includes("/admin") ?
            <ProSidebarProvider>
              <AdminLaout>
                <Component {...pageProps} />
              </AdminLaout>
            </ProSidebarProvider>
            :
            <Component {...pageProps} />
        }
      </CookiesProvider>
    </Provider>
  )
}

export default MyApp
