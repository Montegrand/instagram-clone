import { Route, Routes } from 'react-router-dom'
import RootLayout from '@app/layouts/RootLayout.jsx'
import FeedPage from '@pages/feed/FeedPage.jsx'
import LoginPage from '@pages/auth/LoginPage.jsx'
import SignupPage from '@pages/auth/SignupPage.jsx'
import ExplorePage from '@pages/explore/ExplorePage.jsx'
import ReelsPage from '@pages/reels/ReelsPage.jsx'
import NotificationsPage from '@pages/notifications/NotificationsPage.jsx'
import InboxPage from '@pages/direct/InboxPage.jsx'
import AccountLayout from '@pages/account/AccountLayout.jsx'
import ProfilePage from '@pages/account/ProfilePage.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/reels" element={<ReelsPage />} />
        <Route path="/direct/inbox" element={<InboxPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/account" element={<AccountLayout />}>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}

export default AppRoutes
