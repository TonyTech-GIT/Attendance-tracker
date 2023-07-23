import { Link } from "react-router-dom"
const Welcome = () => {
    return (
        <div>
            <h1>Hello World</h1>
            <div className="welcome">
                <h1>Welcome to the App. Let's get started</h1>

                <Link to='/auth'>
                    <button className='welcome-btn'>Get Started</button>
                </Link>

            </div>
        </div>
    )
}

export default Welcome
