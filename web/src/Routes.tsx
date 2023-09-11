// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
import { Private, Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from "./auth";
import LoginPage from "src/pages/LoginPage/LoginPage";
import SignupPage from "src/pages/SignupPage/SignupPage";
import ForgotPasswordPage from "src/pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "src/pages/ResetPasswordPage/ResetPasswordPage";

const Routes = () => {
    return (
        <Router useAuth={ useAuth }>
            <Route path="/login" page={LoginPage} name="login" />
            <Route path="/signup" page={SignupPage} name="signup" />
            <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
            <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
            <Route path="/" page={HomePage} name="home" />
            <Private unauthenticated="login">
                <Set wrap={ScaffoldLayout} title="JournalThoughts" titleTo="journalThoughts" buttonLabel="New JournalThought" buttonTo="newJournalThought">
                    <Route path="/journal-thoughts/new" page={JournalThoughtNewJournalThoughtPage} name="newJournalThought" />
                    <Route path="/journal-thoughts/{id:Int}/edit" page={JournalThoughtEditJournalThoughtPage} name="editJournalThought" />
                    <Route path="/journal-thoughts/{id:Int}" page={JournalThoughtJournalThoughtPage} name="journalThought" />
                    <Route path="/journal-thoughts" page={JournalThoughtJournalThoughtsPage} name="journalThoughts" />
                </Set>
            </Private>
            <Private unauthenticated="login">
                <Set wrap={ ScaffoldLayout } title="JournalPrompts" titleTo="journalPrompts"
                     buttonLabel="New JournalPrompt" buttonTo="newJournalPrompt">
                    <Route path="/journal-prompts/new" page={ JournalPromptNewJournalPromptPage }
                           name="newJournalPrompt" />
                    <Route path="/journal-prompts/{id:Int}/edit" page={ JournalPromptEditJournalPromptPage }
                           name="editJournalPrompt" />
                    <Route path="/journal-prompts/{id:Int}" page={ JournalPromptJournalPromptPage }
                           name="journalPrompt" />
                    <Route path="/journal-prompts" page={ JournalPromptJournalPromptsPage } name="journalPrompts" />
                </Set>
            </Private>
            <Set wrap={ ScaffoldLayout } title="JournalPrompts" titleTo="journalPrompts" buttonLabel="New JournalPrompt"
                 buttonTo="newJournalPrompt">
            </Set>
            <Route notfound page={ NotFoundPage } />
        </Router>
    );
};
export default Routes;
