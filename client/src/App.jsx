import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import MainLayoutpage from "./pages/MainLayoutpages";
import AuthLayout from "./pages/Auth pages/AuthLayout";
import Login from "./pages/Auth pages/Login";
import Signup from "./pages/Auth pages/Signup";
import VerifyCode from "./pages/Auth pages/VerifyCode";
import ForgotPassword from "./pages/Auth pages/ForgotPassword";
import ForgotPasswordCode from "./pages/Auth pages/ForgotPasswordCode";
import ResetPassword from "./pages/Auth pages/ResetPassword";
import HomePage from "./pages/userPages/HomePage/HomePage";
import ContactPage from "./pages/userPages/Contact/ContactPage";
import AboutPage from "./pages/userPages/AboutPage/AboutPage";
import AdminLayout from "./pages/Admin pages/adiminPanel/AdminLayout";
import ReseacherLayout from "./pages/Admin pages/ResearcherPanel/ReseacherLayout";
import ReviewerLayout from "./pages/Admin pages/ReviewerPanel/ReviewerLayout";
import SubEditorLayout from "./pages/Admin pages/SubEditorPanel/SubEditorLayout";
import EditorLayout from "./pages/Admin pages/EditorPanel/EditorLayout";
import JournalsPage from "./pages/userPages/JournalsPage/JournalsPage";
import ArchivesPage from "./pages/userPages/Archives/ArchivesPage";
import Profile from "./components/Common/Profile";
import Journal_hero_section from "./pages/userPages/JournalsPage/Journal_hero_section";
import Journal_details from "./pages/userPages/JournalsPage/Journal_details";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutpage/>,
    children: [
      { 
        path: "auth", element:<AuthLayout/> ,  
        children : [
            { path: "login", element: <Login /> }, 
            { path: "signup", element: <Signup /> },
            { path: "verify-code", element:<VerifyCode/>},
            { path: "forgot-password", element:<ForgotPassword/>},
            { path: "verify-forgot-verify-code", element:<ForgotPasswordCode/>},
            { path: "reset-password/:token", element:<ResetPassword/>}
        ]
      },

      { path : "", element :<HomePage/>},
      { path : "/about" , element : <AboutPage/>},
      { path : "/journal" , element : <JournalsPage/>,
        children : [
          { path : "" , element : <Journal_hero_section/>},
          { path : "details" , element : <Journal_details/>},
        ]
      },
      { path : "/archive" , element : <ArchivesPage/>},
      { path : "/contact" , element : <ContactPage/>},
      { path : "/profile" , element : <Profile/>},



      { path : "/reviewer", element : <ReviewerLayout/>},
      { path : "/admin", element : <AdminLayout/>},
      { path : "/editor", element : <EditorLayout/>},
      { path : "/researcher", element : <ReseacherLayout/>},
      { path : "/sub-editor", element : <SubEditorLayout/>}
    ]
  }
]);

function App() {
  return (
    <main >
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
