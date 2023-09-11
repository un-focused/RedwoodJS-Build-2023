import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type AuthLayoutProps = {
    children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    const { isAuthenticated, currentUser, logOut } = useAuth()

    return (
        <>
            <header>
                <div className="flex-between">
                    <h1>
                        <Link to={routes.home()}>Redwood Blog</Link>
                    </h1>
                    {isAuthenticated ? (
                        <div>
                            <span>Logged in as {currentUser.email}</span>{' '}
                            <button type="button" onClick={logOut}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to={routes.login()}>Login</Link>
                    )}
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={routes.home()}>[NAME HERE]</Link>
                        </li>
                        <li>
                            <Link to={routes.home()}>Home</Link>
                        </li>
                        <li>
                            <Link to={routes.newJournalPrompt()}>Prompt</Link>
                        </li>
                        <li>
                            <Link to={routes.newJournalThought()}>Thought</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
        </>
    )
}

export default AuthLayout;
