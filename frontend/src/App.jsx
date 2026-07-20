import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import SubmissionGuidelines from './pages/SubmissionGuidelines'
import PublishedPapers from './pages/PublishedPapers'
import PaperDetail from './pages/PaperDetail'
import Layout from './components/Layout'

import AuthorLayout from './pages/author/AuthorLayout'
import AuthorDashboard from './pages/author/Dashboard'
import NewSubmission from './pages/author/NewSubmission'
import Profile from './pages/author/Profile'
import SubmissionDetail from './pages/author/SubmissionDetail'

import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminUsers from './pages/admin/Users'
import AdminSubmissions from './pages/admin/Submissions'
import AdminPublication from './pages/admin/Publication'
import AdminProfile from './pages/admin/Profile'
import AdminSubmissionDetail from './pages/admin/SubmissionDetail'
import AdminFinalizePublication from './pages/admin/FinalizePublication'
import AdminUserForm from './pages/admin/UserForm'

import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import EditorialProfile from './pages/EditorialProfile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="guidelines" element={<SubmissionGuidelines />} />
        <Route path="papers" element={<PublishedPapers />} />
        <Route path="papers/:id" element={<PaperDetail />} />
        <Route path="editorial-board" element={<EditorialProfile />} />
        
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="/author" element={<AuthorLayout />}>
        <Route path="dashboard" element={<AuthorDashboard />} />
        <Route path="new-submission" element={<NewSubmission />} />
        <Route path="profile" element={<Profile />} />
        <Route path="submission/:id" element={<SubmissionDetail />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/new" element={<AdminUserForm />} />
        <Route path="users/:id" element={<AdminUserForm />} />
        <Route path="submissions" element={<AdminSubmissions />} />
        <Route path="submissions/:id" element={<AdminSubmissionDetail />} />
        <Route path="publication" element={<AdminPublication />} />
        <Route path="publication/:id" element={<AdminFinalizePublication />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  )
}

export default App
