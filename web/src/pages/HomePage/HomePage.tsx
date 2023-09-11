import { Link, routes } from "@redwoodjs/router";
import { MetaTags, useMutation } from "@redwoodjs/web";
import { useAuth } from "src/auth";
import JournalPromptsCell from "src/components/JournalPromptsCell/JournalPromptsCell";
import { useState } from "react";

const CREATE = gql`
    mutation createJournalThought($input: CreateJournalThoughtInput!) {
    createJournalThought(input: $input) {
      id
      value
      promptID
      userID
    }
  }
`

const HomePage = () => {
    const { isAuthenticated, logOut } = useAuth();
    const [value, setValue] = useState('');
    const [createJournalThought, { loading, error }] = useMutation(CREATE);

    const onChangeValue = (event: any) => {
        setValue(event.target.value);
    }

    const onSubmit = () => {
        // TODO: make call to db
        console.log('VALUe', value);
        createJournalThought(
            {
                variables: {
                    value,
                    promptID: 1,
                    userID: 1
                }
            }
        )
    }

    return (
        <>
            <MetaTags title="Home" description="Home page" />

            <header>
                <div className="flex-between">
                    <h1>
                        <Link to={ routes.home() }>Redwood Blog</Link>
                    </h1>
                    { isAuthenticated ? (
                        <div>
                            <button type="button" onClick={ logOut }>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to={ routes.login() }>Login</Link>
                    ) }
                </div>
            </header>
            <>
                <JournalPromptsCell />
                <input type = "text" value = { value } onChange={ onChangeValue } />
                <button type="button" onClick={ onSubmit }>
                    Submit
                </button>
            </>
        </>
    );
};
export default HomePage;
