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
import EditorPage from "./pages/userPages/EditorPage/EditorPage";
import SubmiteJournal from "./pages/userPages/UserControlPane/SubmiteJournal";
import ThesisDetails from "./pages/userPages/UserControlPane/ThesisDetails";
import Admin_user_management from "./pages/Admin pages/adiminPanel/Admin_user_management";
import ThesisAndArticleManagement from "./pages/Admin pages/adiminPanel/ThesisAndArticleManagement";
import Admin_review_assignment from "./pages/Admin pages/adiminPanel/Admin_review_assignment";
import Admin_suuport from "./pages/Admin pages/adiminPanel/Admin_suuport";
import Admin_dashboard from "./pages/Admin pages/adiminPanel/Admin_dashboard";
import Admin_view_thesis from "./pages/Admin pages/adiminPanel/Admin_view_thesis";
import VideoPlayer from "./components/Common/VideoPlayer";
import Sub_ReviewList from "./pages/Admin pages/SubEditorPanel/Sub_ReviewList";
import Sub_ReviewDetail from "./pages/Admin pages/SubEditorPanel/Sub_ReviewDetail";
import SubmissionHistory from "./pages/Admin pages/SubEditorPanel/SubmissionHistory";
import SubEditorMessages from "./pages/Admin pages/SubEditorPanel/SubEditorMessages";
import SubEditorDashboard from "./pages/Admin pages/SubEditorPanel/SubEditorDashboard";
import ReviewerDashboard from "./pages/Admin pages/ReviewerPanel/ReviewerDashboard";
import ReviewAssignments from "./pages/Admin pages/ReviewerPanel/ReviewAssignments";
import ReviewDetail from "./pages/Admin pages/ReviewerPanel/ReviewDetail";
import ReviewerMessages from "./pages/Admin pages/ReviewerPanel/ReviewerMessages";
import Reviewer_accept from "./pages/Admin pages/ReviewerPanel/Reviewer_accept";
import Reviewer_Rejceted from "./pages/Admin pages/ReviewerPanel/Reviewer_Rejceted";
import ResearcherDashboard from "./pages/Admin pages/ResearcherPanel/ResearcherDashboard";
import Researcher_thesislist from "./pages/Admin pages/ResearcherPanel/Researcher_thesislist";
import Researcher_thesis_details from "./pages/Admin pages/ResearcherPanel/Researcher_thesis_details";
import Reacher_co_author from "./pages/Admin pages/ResearcherPanel/Reacher_co_author";
import Sub_editor_under_review from "./pages/Admin pages/SubEditorPanel/Sub_editor_under_review";
import Sub_editor_under_details from "./pages/Admin pages/SubEditorPanel/Sub_editor_under_details";
import Revieser_accpeted_details from "./pages/Admin pages/ReviewerPanel/Revieser_accpeted_details";
import Revieser_rejected_details from "./pages/Admin pages/ReviewerPanel/Revieser_rejected_details";
import SubEditor_history_details from "./pages/Admin pages/SubEditorPanel/SubEditor_history_details";
import AdminPublished from "./pages/Admin pages/adiminPanel/AdminPublished";
import Admin_accepted from "./pages/Admin pages/adiminPanel/Admin_accepted";
import Admin_rejected from "./pages/Admin pages/adiminPanel/Admin_rejected";
import Admin_user_details from "./pages/Admin pages/adiminPanel/Admin_user_details";
import Admin_published_view from "./pages/Admin pages/adiminPanel/Admin_published_view";
import Admin_rejected_view from "./pages/Admin pages/adiminPanel/Admin_rejected_view";
import Admin_accepted_view from "./pages/Admin pages/adiminPanel/Admin_accepted_view";
import Reacher_published from "./pages/Admin pages/ResearcherPanel/Reacher_published";
import Reacher_rejected from "./pages/Admin pages/ResearcherPanel/Reacher_rejected";
import Reacher_edit_thesis from "./pages/Admin pages/ResearcherPanel/Reacher_edit_thesis";


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
      { path : "/editor", element : <EditorPage/>},
      { path : "/video" , element :<VideoPlayer/>},
      { path : "/submit_research" , element : <SubmiteJournal/>},
      { path : "/thi" , element : <ThesisDetails/>},


      {
        path: "/researcher",
        element: <ReseacherLayout />,
        children: [
          { path: "thesislist", element: <Researcher_thesislist /> },                 
          { path: "thesislist/:thesisId", element: <Researcher_thesis_details /> },  
          { path: "thesislist/:thesisId/edit", element: <Reacher_edit_thesis /> },       
          { path: "published", element: <Reacher_published /> },        
          { path: "rejected", element: <Reacher_rejected /> },        
        ]
      },
      { path : "/admin", element : <AdminLayout/>,
        children : [
          { path : 'dashboard', element : <Admin_dashboard/>},
          { path : 'thesis_article_management', element : <ThesisAndArticleManagement/>},
          { path : "thesis_article_management/:id", element : <Admin_view_thesis/>},
          { path : 'review_assignment', element : <Admin_review_assignment/>},
          { path : 'review_assignment/:id', element : <Admin_view_thesis/>},
          { path : 'rejected', element : <Admin_rejected/>},
          { path : 'rejected/:id', element : <Admin_rejected_view/>},
          { path : 'published', element : <AdminPublished/>},
          { path : 'published/:id', element : <Admin_published_view/>},
          { path : 'accepted', element : <Admin_accepted/>},
          { path : 'accepted/:id', element : <Admin_accepted_view/>},
          { path : 'user_management', element : <Admin_user_management/>},
          { path : 'user_management/:id', element : <Admin_user_details/>},
          { path : 'supports', element : <Admin_suuport/>},
        ]
      },
      {
        path: "/sub-editor",
        element: <SubEditorLayout />,
        children: [
          { path: '', element: <SubEditorDashboard /> }, 
          { path: 'review', element: <Sub_ReviewList /> },
          { path: 'review/:thesisId', element: <Sub_ReviewDetail /> },
          { path: 'under_review', element : <Sub_editor_under_review/>},
          { path: 'under_review/:thesisId', element : <Sub_editor_under_details/>},
          { path: 'messages', element: <SubEditorMessages /> }, 
          { path: 'history', element: <SubmissionHistory /> }, 
          { path: 'history/:thesisId', element : <SubEditor_history_details/>},
        ]
      },
      {
        path: "/reviewer",
        element: <ReviewerLayout />,
        children: [
          { path: "", element: <ReviewerDashboard /> }, 
          { path: "assignments", element: <ReviewAssignments /> }, 
          { path: "assignments/:thesisId", element: <ReviewDetail /> }, 
          { path: "messages", element: <ReviewerMessages /> }, 
          { path: "accepted", element: <Reviewer_accept/>},
          { path: "accepted/:thesisId", element: <Revieser_accpeted_details /> }, 
          { path: "rejected", element : <Reviewer_Rejceted/>},
          { path: "rejected/:thesisId", element: <Revieser_rejected_details /> }, 
        ]
      },
      { path : "/editor", element : <EditorLayout/>, 
        children : [
          { path : 'dashboard', element:<AboutPage/>},
          { path : "Assigned Submissions"},
          { path : "Reviewer Management"},
          { path : "Messaging"},
        ]
      },
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
