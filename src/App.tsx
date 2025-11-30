import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './Components/Login-Page/Login'
import GlobalStyle from './GlobalStyles'
import Feed from './Components/Feed-Page/Feed'
import RegisterPage from './Components/Register-Page/Register'
import PostDetails from './Components/Post-Details/Post-Details'
import Profile from './Components/Profile/Profile'
function App() {
  const token = localStorage.getItem('authToken')

  return (
    <>
      <div>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/users/me" element={<Profile />}></Route>
            <Route path="/users/:id" element={<Profile />}></Route>
            <Route
              path="/posts/:postId/comments"
              element={<PostDetails />}
            ></Route>

            <Route
              path="/feed"
              element={token ? <Feed /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
