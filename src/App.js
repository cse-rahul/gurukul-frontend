import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/Instructor";
import AdminDashboard from "./components/core/Dashboard/AdminDashboard";

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblue-600 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />

        {/* open routes */}
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* private routes */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* route for all users */}
          <Route path="dashboard/settings" element={<Settings />} />

          {/* route only for students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/my-profile" element={<MyProfile />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}

          {/* route only for instructors */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/my-profile" element={<MyProfile />} />
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}

          {/* route only for admin */}
          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/my-profile" element={<MyProfile />} />
              <Route path="dashboard/admin" element={<AdminDashboard />} />
            </>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
        <Route path="*" element={<Error />} />
        
      </Routes>
    </div>
  );
}

export default App;
